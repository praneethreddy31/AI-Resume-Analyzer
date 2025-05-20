import React from 'react';
import AcademicCapIcon from './icons/AcademicCapIcon';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';
import ArrowTrendingUpIcon from './icons/ArrowTrendingUpIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

const InfoSection: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ActionButton: React.FC<{ children: React.ReactNode; onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void }> = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
    >
      {children}
    </button>
  );

  interface InfoBlockProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }

  const InfoBlock: React.FC<InfoBlockProps> = ({ icon, title, children, className, style }) => (
    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200/70 ${className}`} style={style}> {/* Updated border-slate-200/70 */}
      <div className="flex items-center mb-4">
        <span className="text-sky-500 w-8 h-8 mr-4 flex-shrink-0">{icon}</span>
        <h3 className="text-2xl font-semibold text-gray-700">{title}</h3> {/* Updated text-slate-700 */}
      </div>
      <div className="text-gray-600 space-y-3 text-md"> {/* Updated text-slate-600 */}
        {children}
      </div>
    </div>
  );

  return (
    <section className="py-10 md:py-16 bg-gray-50 w-full px-4"> {/* Updated bg-slate-50 */}
      <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
        <InfoBlock 
          icon={<><AcademicCapIcon className="w-6 h-6 inline mr-1.5" /><ChatBubbleLeftRightIcon className="w-6 h-6 inline" /></>} 
          title="Student-Focused, Interview-Ready"
          className="animate-fadeInUpSlight" style={{animationDelay: '0.1s'}}
        >
          <p>As a tool designed by students, for students, Student Resume AI understands the modern job hunt. We've incorporated insights from various interview perspectives to help you craft a resume that truly stands out.</p>
        </InfoBlock>

        <InfoBlock 
          icon={<MagnifyingGlassIcon />} 
          title="Discover Your Resume's Potential"
          className="animate-fadeInUpSlight" style={{animationDelay: '0.2s'}}
        >
          <p><strong>Find out your resume score and see how you compare.</strong> Our checker benchmarks your resume against a curated collection of successful resumes from candidates hired at top global companies.</p>
          <ul className="list-disc list-inside pl-2 space-y-1.5 mt-3">
            <li>Check how your resume score compares against the best.</li>
            <li>Get a detailed resume review report.</li>
            <li>Improve your CV with personalized tips.</li>
          </ul>
          <ActionButton onClick={scrollToTop}>Check My Resume Score Now</ActionButton>
        </InfoBlock>

        <InfoBlock 
          icon={<MagnifyingGlassIcon className="transform -scale-x-100"/>} /* Flipped for variety */
          title="How We Calculate Your Score"
          className="animate-fadeInUpSlight" style={{animationDelay: '0.3s'}}
        >
          <p>Our online resume checker grades your resume based on key criteria chosen from what recruiters typically look for:</p>
          <ul className="list-disc list-inside pl-2 space-y-1.5 mt-3">
            <li>Does the resume contain all essential information?</li>
            <li>Are you using the available space effectively?</li>
            <li>Any overused expressions? Presence of strong action verbs?</li>
          </ul>
           <ActionButton onClick={scrollToTop}>Review My Resume Now</ActionButton>
        </InfoBlock>

        <InfoBlock 
          icon={<ArrowTrendingUpIcon />} 
          title="Elevate Your Resume's Quality"
          className="animate-fadeInUpSlight" style={{animationDelay: '0.4s'}}
        >
          <p><strong>Improve your resume's quality with a single click.</strong> Each metric comes with suggested revision tips to help you quickly strengthen your resume.</p>
           <ul className="list-disc list-inside pl-2 space-y-1.5 mt-3">
            <li>Accept suggested revisions with a single click (feature coming soon!).</li>
            <li>Receive custom-tailored resume tips.</li>
            <li>Increase your resume score & get hired faster!</li>
          </ul>
        </InfoBlock>

        <InfoBlock 
          icon={<ShieldCheckIcon />} 
          title="Security & Data Protection"
          className="animate-fadeInUpSlight" style={{animationDelay: '0.5s'}}
        >
          <p>Student Resume AI gives you full control over your data while keeping it safe. Your privacy is a priority.</p>
        </InfoBlock>
      </div>
    </section>
  );
};

export default InfoSection;