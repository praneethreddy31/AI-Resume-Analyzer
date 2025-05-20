import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import Card from './Card';

interface ATSScoreDisplayProps {
  score: number; // 0-100
}

const ATSScoreDisplay: React.FC<ATSScoreDisplayProps> = ({ score }) => {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score))); // Ensure score is rounded

  let textColor = 'text-red-600';
  let ringColor = 'ring-red-500/50';
  let progressColor = 'bg-red-500';
  let progressTrackColor = 'bg-red-200';
  let progressMessage = "Needs significant improvement for ATS.";
  
  if (normalizedScore >= 75) {
    textColor = 'text-green-600';
    ringColor = 'ring-green-500/50';
    progressColor = 'bg-green-500';
    progressTrackColor = 'bg-green-200';
    progressMessage = "Excellent! Highly compatible with ATS systems.";
  } else if (normalizedScore >= 50) {
    textColor = 'text-amber-600'; // Using amber for mid-range
    ringColor = 'ring-amber-500/50';
    progressColor = 'bg-amber-500';
    progressTrackColor = 'bg-amber-200';
    progressMessage = "Good, but can be further optimized for ATS.";
  }
  
  const circumference = 2 * Math.PI * 54; // (radius of circle: 60 - stroke-width/2: 6)
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;


  return (
    <Card 
      title={
        <div className="flex items-center">
            <SparklesIcon className="w-7 h-7 mr-2.5 text-sky-500" />
            <span className="text-xl font-semibold text-gray-700">ATS Compatibility Score</span> {/* Updated from text-slate-700 */}
        </div>
      }
      className="animate-reveal-pulse"
    >
      <div className="flex flex-col items-center justify-center text-center py-4">
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
            <circle
              className={`stroke-current ${progressTrackColor}`}
              strokeWidth="10"
              fill="transparent"
              r="54"
              cx="60"
              cy="60"
            />
            <circle
              className={`stroke-current ${textColor.replace('text-', 'stroke-')}`} // Use stroke-* for SVG
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              r="54"
              cx="60"
              cy="60"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 0.7s ease-out',
              }}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-full`}>
            <span className={`text-5xl md:text-6xl font-bold ${textColor}`}>
              {normalizedScore}
              <span className="text-3xl md:text-4xl opacity-80">%</span>
            </span>
          </div>
        </div>
        <p className={`mt-6 text-md font-medium ${textColor}`}>{progressMessage}</p>
        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto"> {/* Updated from text-slate-500 */}
          Applicant Tracking Systems (ATS) scan resumes for keywords and formatting. A higher score means better chances of passing initial screening.
        </p>
      </div>
    </Card>
  );
};

export default ATSScoreDisplay;