import React, { useRef, useState } from 'react';
import useWizardStore from '../../store/wizardStore';

const FileUploader = ({ label, maxFiles = 10, maxSizeMB = 10 }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const attachments = useWizardStore((state) => state.attachments);
  const addAttachment = useWizardStore((state) => state.addAttachment);
  const removeAttachment = useWizardStore((state) => state.removeAttachment);

  const SUPPORTED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];

  const validateFile = (file) => {
    if (attachments.length >= maxFiles) {
      return `You can upload a maximum of ${maxFiles} files.`;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size must not exceed ${maxSizeMB} MB.`;
    }
    if (!SUPPORTED_TYPES.includes(file.type)) {
      return 'File format is not supported. Allowed: PDF, DOC, DOCX, JPG, JPEG, PNG.';
    }
    return null;
  };

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      const attachment = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: error ? 0 : 100,
        status: error ? 'error' : 'completed',
        errorMessage: error || undefined,
      };
      addAttachment(attachment);
    });
  };

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
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal w-[488px]">
          {label}
        </label>
      )}
      
      <div 
        className={`w-full h-[190px] rounded-[8px] border border-dashed bg-white text-center cursor-pointer transition-colors flex flex-col items-center justify-center mt-3 ${
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
          onChange={handleFileChange}
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

      {/* File list */}
      {attachments.length > 0 && (
        <div className="mt-3 space-y-2">
          {attachments.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px]">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#5C656E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-[13px] font-medium text-[#333333]">{file.name}</p>
                  <p className="text-[11px] text-[#767676]">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {file.status === 'error' && (
                  <span className="text-[11px] text-red-500">{file.errorMessage}</span>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeAttachment(file.id); }}
                  className="text-[#767676] hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
