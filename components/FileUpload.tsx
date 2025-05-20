import React, { useState, useCallback } from 'react';
import DocumentArrowUpIcon from './icons/DocumentArrowUpIcon';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === "application/pdf") {
        onFileSelect(event.target.files[0]);
      } else {
        alert("Please upload a PDF file.");
      }
    }
    // Reset input value to allow re-uploading the same file after an error or cancellation
    event.target.value = '';
  };

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // Check if the leave target is outside the component
    if (event.relatedTarget && (event.currentTarget as Node).contains(event.relatedTarget as Node)) {
        return;
    }
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) event.dataTransfer.dropEffect = 'copy';
  }, [disabled]);
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
       if (event.dataTransfer.files[0].type === "application/pdf") {
        onFileSelect(event.dataTransfer.files[0]);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  }, [onFileSelect, disabled]);

  return (
    <label
      htmlFor="resume-upload"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        flex flex-col items-center justify-center w-full p-8 md:p-12 border-2 border-dashed rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out group
        ${disabled ? 'bg-gray-200/50 border-gray-300 cursor-not-allowed' : 
                     isDragging ? 'bg-sky-100/70 border-sky-500 scale-105 shadow-lg' : 'bg-gray-50/70 hover:bg-sky-50/70 border-gray-300 hover:border-sky-400'}
      `}
      aria-disabled={disabled}
    >
      <DocumentArrowUpIcon className={`w-16 h-16 mb-4 transition-colors duration-300 ${disabled ? 'text-gray-400' : isDragging ? 'text-sky-500' : 'text-sky-500 group-hover:text-sky-600'}`} />
      <p className={`text-xl font-semibold transition-colors duration-300 ${disabled ? 'text-gray-500' : isDragging ? 'text-sky-600' : 'text-gray-600 group-hover:text-sky-600'}`}>
        {isDragging ? 'Drop your resume here!' : 'Drag & drop PDF or click to upload'}
      </p>
      <p className={`mt-2 text-sm transition-colors duration-300 ${disabled ? 'text-gray-400' : 'text-gray-500 group-hover:text-gray-600'}`}>
        (Max file size: 5MB, .pdf only)
      </p>
      <input
        id="resume-upload"
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={disabled}
        aria-label="Resume upload input"
      />
    </label>
  );
};

export default FileUpload;