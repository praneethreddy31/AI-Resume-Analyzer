import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, icon, style }) => {
  return (
    <div 
      className={`bg-white shadow-xl rounded-lg p-6 md:p-8 transition-all duration-300 ease-out border border-gray-200/80 hover:shadow-2xl ${className}`}
      style={style}
    >
      {title && (
        <div className="flex items-center mb-5 pb-4 border-b border-gray-200">
          {icon && <span className="mr-3 text-sky-500 w-7 h-7 flex-shrink-0">{icon}</span>}
          {typeof title === 'string' ? <h2 className="text-xl font-semibold text-gray-700">{title}</h2> : title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;