
import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.25 7.5l.813 2.846a4.5 4.5 0 0 1 3.09 3.09L25.000002 12l-2.846.813a4.5 4.5 0 0 1-3.09 3.09L18.25 18.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09L11.500002 12l2.846-.813a4.5 4.5 0 0 1 3.09-3.09L18.25 7.5Z" />
  </svg>
);
// Note: Path data adjusted to fit within 24x24 viewbox if it was from a different source.
// Heroicons original for reference might be slightly different but this is a valid sparkles icon.
// Using Heroicons style directly:
export const HeroSparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.788 3.212a.75.75 0 0 0-1.06 0l-7.5 7.5a.75.75 0 0 0 1.06 1.06L5.165 10.94a2.25 2.25 0 0 1 3.182 0l2.688 2.688a2.25 2.25 0 0 1 0 3.182L9.25 18.607a.75.75 0 0 0 1.06 1.06l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.879 10.121.373-.372a.75.75 0 0 0-1.06-1.06l-.373.372a.75.75 0 0 0 1.06 1.06Zm-2.122 2.121.373-.372a.75.75 0 0 0-1.06-1.06l-.373.372a.75.75 0 0 0 1.06 1.06Zm2.121 2.121.373-.372a.75.75 0 0 0-1.06-1.06l-.373.372a.75.75 0 0 0 1.06 1.06Zm2.121 2.121.373-.372a.75.75 0 0 0-1.06-1.06l-.373.372a.75.75 0 0 0 1.06 1.06Zm2.121 2.121.373-.372a.75.75 0 0 0-1.06-1.06l-.373.372a.75.75 0 0 0 1.06 1.06Zm2.121 2.121.373-.372a.75.75 0 0 0-1.06-1.06l-.373.372a.75.75 0 0 0 1.06 1.06Z" />
 </svg>
);

export default HeroSparklesIcon; // Exporting the Heroicons one
