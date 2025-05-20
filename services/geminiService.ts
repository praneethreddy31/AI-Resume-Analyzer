
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

// Initialize GoogleGenAI client. Handle API_KEY existence.
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY for Gemini is not set in environment variables. AI features will be disabled.");
}

const generatePrompt = (resumeText: string): string => {
  // Escape backticks in resume text to prevent them from breaking the prompt structure if markdown is used.
  const escapedResumeText = resumeText.replace(/`/g, '\\`');

  return `
Analyze the following resume text and provide feedback for a job seeker. Your goal is to help them improve their resume.
Return the analysis STRICTLY as a JSON object. The JSON object must follow this exact structure:
{
  "positives": ["String array of strengths. Example: 'Strong summary of qualifications.'", "Another positive point..."],
  "negatives": ["String array of improvement areas. Example: 'Quantify achievements with numbers.'", "Another suggestion..."],
  "atsScore": 88, // An integer between 0 and 100
  "recommendedSkills": ["String array of skills. Example: 'Python', 'Project Management'", "Another skill..."]
}

IMPORTANT JSON Formatting Rules:
1.  The entire response MUST be a single, valid JSON object. Do not include any text, explanations, or markdown (like \`\`\`json or \`\`\`) before or after the JSON object.
2.  All keys (e.g., "positives") and all string values (including every element within the "positives", "negatives", and "recommendedSkills" arrays) MUST be enclosed in double quotes.
3.  Elements in arrays MUST be separated by commas. For example: "recommendedSkills": ["Skill One", "Skill Two", "Skill Three"].
4.  There should be NO trailing comma after the last element in an array or the last key-value pair in an object.
    Correct array example: ["item1", "item2"]
    Incorrect array example (trailing comma): ["item1", "item2",]
5.  The structure provided (positives, negatives, atsScore, recommendedSkills) must be strictly followed. All fields are mandatory.
6.  Ensure "atsScore" is an integer.
7.  Ensure that any special characters (like double quotes or backslashes) within the string values themselves are properly escaped (e.g., "This is a \\"quoted\\" string.").

Guidelines for your response content:
- "positives": Provide 2-4 concise positive points.
- "negatives": Provide 2-4 constructive criticisms or actionable suggestions.
- "atsScore": An integer between 0 and 100, representing estimated ATS compatibility. Be realistic.
- "recommendedSkills": Suggest 3-5 relevant skills.
- Be encouraging and professional in tone.
- If the resume text is very short, nonsensical, or clearly not a resume, provide generic advice, a low ATS score (e.g., 10-20), and reflect this in positives/negatives.

Resume Text:
---
${escapedResumeText}
---
`;
};

export const analyzeResume = async (resumeText: string): Promise<AnalysisResult> => {
  if (!ai) {
    throw new Error("Gemini AI Service is not configured. API_KEY is missing.");
  }
  if (!resumeText.trim()) {
    return {
      positives: ["No content provided to analyze."],
      negatives: ["Please upload a resume with content.", "Ensure the PDF is text-based and not an image scan."],
      atsScore: 0,
      recommendedSkills: ["Basic resume writing", "Content creation"]
    };
  }

  try {
    const prompt = generatePrompt(resumeText);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json", // This is a strong hint to the model
        temperature: 0.3, // Lowered temperature for more deterministic JSON structure
        topP: 0.95,
        topK: 40,
      },
    });

    let jsonStr = response.text.trim();
    
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    const parsedData = JSON.parse(jsonStr);

    if (
      typeof parsedData.atsScore !== 'number' ||
      !Array.isArray(parsedData.positives) ||
      !Array.isArray(parsedData.negatives) ||
      !Array.isArray(parsedData.recommendedSkills) ||
      !parsedData.positives.every((s: unknown) => typeof s === 'string') ||
      !parsedData.negatives.every((s: unknown) => typeof s === 'string') ||
      !parsedData.recommendedSkills.every((s: unknown) => typeof s === 'string')
    ) {
      console.error("Invalid JSON structure received from Gemini:", parsedData);
      throw new Error("Received malformed analysis data from AI. The structure was not as expected.");
    }
    
    parsedData.atsScore = Math.max(0, Math.min(100, Math.round(parsedData.atsScore)));

    return parsedData as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing resume with Gemini:", error);
    if (error instanceof Error) {
        if (error.message.includes("API Key not valid")) {
             throw new Error("Invalid Gemini API Key. Please check your configuration.");
        }
        // Specifically catch SyntaxError from JSON.parse
        if (error instanceof SyntaxError) {
            // The error.message from SyntaxError is quite descriptive, e.g., "Unexpected token T in JSON at position 0"
            throw new Error(`AI response was not valid JSON and could not be parsed. Please try again. (Details: ${error.message})`);
        }
    }
    // General fallback error
    throw new Error("Failed to analyze resume. The AI service might be temporarily unavailable or the resume content could not be processed. Please try again later.");
  }
};
