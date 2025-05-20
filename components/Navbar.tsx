import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 p-3 md:p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl border border-gray-300/70 px-4 py-3 sm:px-6 sm:py-4"> {/* Updated border-slate-300/70 */}
          <div className="flex items-center justify-center">
            <SparklesIcon className="w-7 h-7 sm:w-8 sm:h-8 mr-2.5 text-amber-400 flex-shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500">
              Student Resume AI
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;