import React from 'react';
import { AnalysisResult } from '../types';
import Card from './Card';
import SkillTag from './SkillTag';
import ATSScoreDisplay from './ATSScoreDisplay';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';
import AcademicCapIcon from './icons/AcademicCapIcon';
import SparklesIcon from './icons/SparklesIcon'; // For overall insights

interface AnalysisDisplayProps {
  result: AnalysisResult;
  fileName: string | null;
}

const ListItem: React.FC<{icon: React.ReactNode, text: string, itemKey?: string | number, iconClass?: string}> = ({icon, text, itemKey, iconClass = "text-gray-500"}) => ( /* Default iconClass changed */
  <li key={itemKey} className="flex items-start space-x-3.5 py-3 border-b border-gray-200/70 last:border-b-0"> {/* Updated from border-slate-200/70 */}
    <span className={`flex-shrink-0 w-5 h-5 mt-0.5 ${iconClass}`}></span>
    <span className="text-gray-700 text-md">{text}</span> {/* Updated from text-slate-700 */}
  </li>
);

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, fileName }) => {
  return (
    <div className="space-y-8 py-6 md:py-8">
      {fileName && (
        <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Resume Analysis for: <span className="text-sky-600">{fileName}</span></h2> {/* Updated from text-slate-700 */}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        <div className="lg:col-span-1">
          <ATSScoreDisplay score={result.atsScore} />
        </div>

        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <Card 
            title="Highlights & Strengths" 
            icon={<CheckCircleIcon />} 
            className="animate-reveal-pulse" 
            style={{animationDelay: '0.1s'}}
          >
            {result.positives.length > 0 ? (
              <ul className="space-y-0.5">
                {result.positives.map((item, index) => (
                  <ListItem key={`positive-${index}`} icon={<CheckCircleIcon />} text={item} iconClass="text-green-500" />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No specific strengths highlighted by the AI. Consider adding more quantifiable achievements or tailoring content to job descriptions.</p> /* Updated */
            )}
          </Card>

          <Card 
            title="Areas for Enhancement" 
            icon={<ExclamationTriangleIcon />} 
            className="animate-reveal-pulse" 
            style={{animationDelay: '0.2s'}}
          >
            {result.negatives.length > 0 ? (
              <ul className="space-y-0.5">
                {result.negatives.map((item, index) => (
                  <ListItem key={`negative-${index}`} icon={<ExclamationTriangleIcon />} text={item} iconClass="text-amber-500" />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Great job! The AI found no major areas for improvement in this scan.</p> /* Updated */
            )}
          </Card>
        </div>
      </div>

      <Card 
        title="Skills to Consider" 
        icon={<AcademicCapIcon />} 
        className="animate-reveal-pulse"
        style={{animationDelay: '0.3s'}}
      >
        {result.recommendedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {result.recommendedSkills.map((skill, index) => (
              <SkillTag key={`skill-${index}`} skill={skill} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No specific skills recommended at this time. Ensure your current skills are clearly listed and relevant to your target roles.</p> /* Updated */
        )}
      </Card>
    </div>
  );
};

export default AnalysisDisplay;