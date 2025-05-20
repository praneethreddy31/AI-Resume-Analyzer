import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Analyzing your resume..." }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-opacity duration-300 ease-in-out" role="alert" aria-live="assertive">
      <div className="w-16 h-16 border-4 border-t-sky-500 border-r-sky-500 border-b-sky-500 border-l-gray-200 rounded-full animate-spin"></div>
      <p className="mt-6 text-xl text-gray-700 font-semibold tracking-wide">{message}</p>
      <p className="mt-2 text-sm text-gray-500">This might take a few moments. Powered by Gemini AI.</p>
    </div>
  );
};

export default Loader;