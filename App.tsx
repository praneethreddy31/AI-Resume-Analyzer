import React, { useState, useCallback, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import Loader from './components/Loader';
import AnalysisDisplay from './components/AnalysisDisplay';
import { extractTextFromPDF } from './services/pdfService';
import { analyzeResume } from './services/geminiService';
import { AnalysisResult } from './types';
import Navbar from './components/Navbar';
import GitHubIcon from './components/icons/GitHubIcon';
import LinkedInIcon from './components/icons/LinkedInIcon';
import TwitterIcon from './components/icons/TwitterIcon';
import InfoSection from './components/InfoSection'; // Import the new InfoSection

const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcomeTransition, setShowWelcomeTransition] = useState<boolean>(true);

  useEffect(() => {
    // Trigger animation for welcome screen after mount
    if(showWelcomeTransition && !analysisResult && !isLoading && !error) {
      const timer = setTimeout(() => {
        setShowWelcomeTransition(false); 
      }, 100); // Short delay to ensure animation plays
      return () => clearTimeout(timer);
    }
  }, [showWelcomeTransition, analysisResult, isLoading, error]);

  const handleFileSelect = useCallback(async (file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("File is too large. Please upload a PDF under 5MB.");
      setUploadedFile(null);
      return;
    }
    setUploadedFile(file);
    setError(null);
    setAnalysisResult(null);
    setIsLoading(true);
    setShowWelcomeTransition(false); // Ensure welcome transition is off

    try {
      const text = await extractTextFromPDF(file);
      if (!text.trim()) {
        setError("Could not extract text from PDF, or PDF is empty. It might be an image-based PDF. Please try a different file.");
        setUploadedFile(null);
        setIsLoading(false);
        return;
      }
      const result = await analyzeResume(text);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
      setUploadedFile(null); // Clear file on error so user can re-upload
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
    setShowWelcomeTransition(true); // Reset for welcome animation on next view
  }, []);

  const initialScreenSubtitle = (
    <p className="text-center pt-4 mb-6 md:mb-8 text-lg text-gray-600 max-w-2xl mx-auto animate-reveal-pulse" style={{ animationDelay: '0.2s' }}> {/* Updated text-slate-600 to text-gray-600 */}
      Get instant AI-powered feedback on your resume. Upload your PDF to see your ATS score, identify strengths, and discover areas for improvement.
    </p>
  );
  
  const renderMainContent = () => {
    if (!analysisResult && !error && !uploadedFile) { // Initial welcome/upload screen
      return (
        <div className={`flex flex-col justify-center items-center p-4 transition-opacity duration-700 ease-in-out ${showWelcomeTransition ? 'opacity-0 animate-fadeInUpSlight' : 'opacity-100'}`}>
          {initialScreenSubtitle}
          <div className="w-full max-w-2xl bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200/80 animate-reveal-pulse" style={{animationDelay: '0.3s'}}> {/* Updated border-slate-200/80 */}
            <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
          </div>
        </div>
      );
    }
    
    if (error && !analysisResult) { // Error state (either pre-analysis or post-analysis if result cleared)
        return (
         <div className={`flex flex-col justify-center items-center p-4 transition-opacity duration-700 ease-in-out opacity-100 animate-fadeInUpSlight`}>
            {initialScreenSubtitle} {/* Still show subtitle for context */}
            <div className="w-full max-w-2xl bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200/80"> {/* Updated border-slate-200/80 */}
                <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center">
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                </div>
                <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
                 {/* Optionally, show a try again button or rely on new file upload */}
                 <button
                    onClick={handleReset} // Or a more specific error recovery
                    className="mt-6 w-full px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow hover:shadow-md transition-all duration-200 ease-in-out"
                  >
                    Try Uploading Again
                  </button>
            </div>
        </div>
        );
    }

    if (analysisResult) { // Successfully loaded analysis
       return (
         <div className="w-full transition-opacity duration-500 ease-out opacity-100 px-4 animate-fadeInUpSlight">
          <div className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border border-gray-200/80 mb-8"> {/* Updated border-slate-200/80 */}
              <AnalysisDisplay result={analysisResult} fileName={uploadedFile?.name || null} />
              <button
                onClick={handleReset}
                aria-label="Analyze another resume"
                className="mt-8 w-full flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
              >
                Analyze Another Resume
              </button>
          </div>
        </div>
      );
    }
    return null; // Fallback, should ideally not be reached if logic is correct
  };

  // Navbar height is approx 4rem (inner) + 1rem (outer padding) = 5rem on small, up to ~5.5rem on md.
  // pt-28 is 7rem. So content area minHeight calc(100vh - 7rem).
  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-28 w-full flex flex-col" style={{ minHeight: 'calc(100vh - 7rem)' }}>
        {isLoading && <Loader />}
        <main className="flex-grow w-full">
          {!isLoading && renderMainContent()}
        </main>
        
        {!isLoading && (
          <>
            <InfoSection />
            <AppFooter isErrorPage={!!error && !analysisResult} />
          </>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fadeInUpSlight { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        /* revealPulse is already in index.html */
      `}</style>
    </>
  );
};

const AppFooter: React.FC<{isErrorPage?: boolean}> = ({isErrorPage}) => (
 <footer className={`text-center w-full pb-6 bg-gray-100 ${isErrorPage ? 'pt-4' : 'pt-10'}`}> {/* Ensure footer has consistent top margin or bg, updated bg-slate-100 to bg-gray-100 */}
    <div className="flex justify-center space-x-5 mb-4">
      <a href="#your-github-profile" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-500 hover:text-sky-600 transition-colors duration-200"> {/* Updated text-slate-500 */}
        <GitHubIcon className="w-6 h-6" />
      </a>
      <a href="#your-linkedin-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-500 hover:text-sky-600 transition-colors duration-200"> {/* Updated text-slate-500 */}
        <LinkedInIcon className="w-6 h-6" />
      </a>
      <a href="#your-twitter-profile" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="text-gray-500 hover:text-sky-600 transition-colors duration-200"> {/* Updated text-slate-500 */}
        <TwitterIcon className="w-6 h-6" />
      </a>
    </div>
    <p className="text-sm text-gray-500"> {/* Updated text-slate-500 */}
      Powered by Google Gemini AI. For illustrative and educational purposes.
    </p>
     <p className="text-xs text-gray-400 mt-1.5"> {/* Updated text-slate-400 */}
      Ensure your API_KEY environment variable is set for full Gemini functionality.
    </p>
  </footer>
);

export default App;