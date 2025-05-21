# Student Resume AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered resume analyzer designed to help students and job seekers improve their resumes. Upload your PDF resume to get instant feedback, an ATS compatibility score, identify strengths & weaknesses, and receive recommendations for relevant skills.

## Features

*   **PDF Resume Upload:** Easily upload your resume in PDF format.
*   **AI-Powered Analysis:** Leverages the Google Gemini API for in-depth resume content analysis.
*   **ATS Compatibility Score:** Get a score (0-100) indicating how well your resume might perform with Applicant Tracking Systems.
*   **Strengths & Weaknesses:** Identifies positive aspects of your resume and areas needing improvement.
*   **Recommended Skills:** Suggests relevant skills to consider adding or highlighting.
*   **Modern UI/UX:** Clean, responsive, and user-friendly interface built with React and Tailwind CSS.
*   **No Login Required:** Quick and easy access without user accounts.
*   **Client-Side Processing:** PDF parsing and AI interaction handled in the browser.

## Tech Stack

*   **Frontend:**
    *   React 19 (via esm.sh, no build step)
    *   Tailwind CSS (via CDN)
    *   TypeScript
*   **PDF Processing:**
    *   `pdfjs-dist` (for extracting text from PDFs client-side)
*   **AI Model:**
    *   Google Gemini API (`@google/genai` library)
*   **Icons:** Custom SVG icons & components.
*   **Font:** Inter (via Google Fonts)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Edge).
*   A code editor (e.g., VS Code).
*   VS Code [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension (or any similar tool to serve static files).
*   A Google Gemini API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd student-resume-ai 
    ```
    (Replace `<your-repository-url>` with the actual URL of your Git repository)

2.  **API Key Configuration (Crucial for AI Features):**
    The application expects the Google Gemini API key to be available as `process.env.API_KEY`.
    *   **For Vercel Deployment (Recommended for full functionality):** The API key is set as an environment variable in the Vercel project settings (see Deployment section).
    *   **For Local Development & Testing:**
        When you run `index.html` directly using a simple live server, `process.env.API_KEY` will be undefined. This means:
        *   A warning "API_KEY for Gemini is not set..." will appear in your browser's console.
        *   The AI analysis features will be disabled, and you'll likely see an error message if you try to analyze a resume.

        To test AI features locally, you have a couple of options:
        *   **Option A (Temporary Code Change - NOT FOR COMMIT):**
            1.  Open `services/geminiService.ts`.
            2.  Temporarily replace the line `const API_KEY = process.env.API_KEY;` with your actual API key:
                ```typescript
                const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 
                ```
            3.  **IMPORTANT:** Remember to revert this change before committing any code to Git, as exposing your API key in your repository is a security risk.
        *   **Option B (Using a more advanced local server):** If you were to integrate a build system like Vite or Next.js in the future, you could use `.env` files. For the current "buildless" setup, this is not directly applicable without significant changes.

### Running Locally

1.  Open the project folder in VS Code (or your preferred editor).
2.  Right-click on the `index.html` file.
3.  Select "Open with Live Server" (or use your equivalent static file server).
4.  This will open the application in your default web browser.

## Environment Variables

The primary environment variable required is:

*   `API_KEY`: Your Google Gemini API Key.
    *   This is essential for the resume analysis features to work.
    *   It is **not** to be committed to the Git repository.
    *   For deployment (e.g., Vercel), this must be set in the deployment platform's environment variable settings.

## Deployment

This application is well-suited for deployment on static hosting platforms like Vercel, Netlify, or GitHub Pages.

### Deploying to Vercel (Recommended)

1.  Push your project to a Git repository (GitHub, GitLab, Bitbucket).
2.  Sign up or log in to [Vercel](https://vercel.com).
3.  Import your Git repository into Vercel.
4.  **Configuration:**
    *   **Framework Preset:** Select "Other".
    *   **Build Command:** Can be left blank or set to `echo "No build required"`.
    *   **Output Directory:** Should be the root (Vercel usually detects `index.html` in the root for the "Other" preset).
    *   **Environment Variables:**
        *   Add a new variable:
            *   **Name:** `API_KEY`
            *   **Value:** Paste your actual Google Gemini API key.
        *   Ensure it's available for all environments (Production, Preview, Development).
5.  Click "Deploy". Vercel will build and deploy your site.

## Usage

1.  Open the application in your web browser.
2.  Drag and drop your PDF resume onto the upload area, or click to browse and select your file.
3.  The application will extract text from the PDF and send it to the Gemini API for analysis.
4.  Wait for the analysis to complete (a loader will be displayed).
5.  View your ATS score, identified strengths, areas for improvement, and recommended skills.
6.  Click "Analyze Another Resume" to start over.
