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
    <div className="w-full">
      {label && (
        <label className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal w-[488px]">
          {label}
        </label>
      )}
      
      <div 
        className={`w-full h-[190px] rounded-[8px] border border-dashed bg-white text-center cursor-pointer transition-colors flex flex-col items-center justify-center ${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-[#B8C4D6]'
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
        
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <svg className="w-5 h-5 text-[#5C656E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <p className="text-[15px] font-medium leading-[15px] tracking-normal text-[#333333]">
            Drag files here or <span className="text-[#2563eb] underline decoration-solid cursor-pointer">Browse</span>
          </p>
          <p className="text-[12px] font-normal leading-[12px] tracking-normal text-[#9AA1AB]">
            PDF, DOC, DOCX, JPG, JPEG, PNG — max {maxFiles} files, {maxSizeMB} MB each
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
