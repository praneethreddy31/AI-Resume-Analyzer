import React from 'react';

interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-3.5 py-1.5 rounded-md shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:bg-sky-200/70">
      {skill}
    </span>
  );
};

export default SkillTag;