import React, { useRef, useState } from 'react';

const FileUploader = ({ label, maxFiles = 10, maxSizeMB = 10 }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Logic for handling files will be added here
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-6 w-full">
      {label && (
        <label className="block text-gray-900 font-semibold text-[15px] mb-4">
          {label}
        </label>
      )}
      
      <div 
        className={`w-full border-2 border-dashed rounded-lg py-6 px-6 text-center cursor-pointer transition-colors min-h-[130px] flex flex-col items-center justify-center ${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={() => {}} // Handle file selection
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <p className="text-[14px] text-gray-800 font-medium">
            Drag files here or <span className="text-blue-600 cursor-pointer">Browse</span>
          </p>
          <p className="text-[11px] text-gray-400 uppercase tracking-widest">
            PDF, DOC, DOCX, JPG, JPEG, PNG — max {maxFiles} files, {maxSizeMB} MB each
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
