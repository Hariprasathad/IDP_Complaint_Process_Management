import React, { useRef, useState } from 'react';
import useWizardStore from '../../store/wizardStore';

const FileUploader = ({ label, maxFiles = 10, maxSizeMB = 10 }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [removingIds, setRemovingIds] = useState([]);
  
  const attachments = useWizardStore((state) => state.formData.attachments);
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

  const [validationError, setValidationError] = useState('');

  const validateFile = (file) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File "${file.name}" exceeds ${maxSizeMB} MB.`;
    }
    if (!SUPPORTED_TYPES.includes(file.type)) {
      return `File "${file.name}" is not supported. Allowed: PDF, DOC, DOCX, JPG, JPEG, PNG.`;
    }
    return null;
  };

  const handleFiles = (files) => {
    setValidationError('');

    // Check max files limit first
    const remainingSlots = maxFiles - attachments.length;
    if (remainingSlots <= 0) {
      setValidationError(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    const rejectedCount = Array.from(files).length - filesToProcess.length;

    filesToProcess.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        setValidationError(error);
      } else {
        const attachment = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 100,
          status: 'completed',
        };
        addAttachment(attachment);
      }
    });

    if (rejectedCount > 0) {
      setValidationError(`You can upload a maximum of ${maxFiles} files. ${rejectedCount} file(s) were not added.`);
    }
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

  const handleRemoveFile = (id) => {
    setRemovingIds((prev) => [...prev, id]);
    setTimeout(() => {
      removeAttachment(id);
      setRemovingIds((prev) => prev.filter((rid) => rid !== id));
    }, 200);
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
        className={`w-full h-[129px] rounded-[10px] bg-[#FAFBFC] text-center cursor-pointer transition-colors flex flex-col items-center justify-center mt-3 pt-[30px] pb-[30px] ${
          isDragging ? 'bg-blue-50' : ''
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23FAFBFC' rx='10' ry='10' stroke='${isDragging ? '%234664DC' : '%23B9C1CC'}' stroke-width='1.5' stroke-dasharray='6%2C 5' stroke-dashoffset='0' stroke-linecap='round'/%3E%3C/svg%3E")`,
        }}
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
        
        <div className="flex flex-col items-center justify-center gap-[8px]">
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

      {/* Validation error message */}
      {validationError && (
        <p className="mt-2 text-[13px] text-red-500">{validationError}</p>
      )}

      {/* File list */}
      {attachments.length > 0 && (
        <div className="mt-4 flex flex-col gap-[8px]">
          {attachments.map((file) => (
            <div 
              key={file.id} 
              className={`flex items-center justify-between px-[16px] py-[10px] min-h-[52px] bg-white border border-[#E5E7EB] rounded-[10px] cursor-default hover:bg-[#F8FAFC] hover:border-[#D1D5DB] transition-all duration-200 ease-in-out ${
                removingIds.includes(file.id) ? 'opacity-0 -translate-y-1 max-h-0 py-0 my-0 overflow-hidden' : 'opacity-100 translate-y-0 max-h-[60px]'
              }`}
              style={{ transition: 'all 200ms ease-out' }}
            >
              <a
                href={file.file ? URL.createObjectURL(file.file) : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] text-[14px] font-normal leading-[20px] no-underline hover:underline overflow-hidden text-ellipsis whitespace-nowrap max-w-[85%] cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                {file.name}
              </a>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveFile(file.id); }}
                  className="w-[32px] h-[32px] flex items-center justify-center text-[#9CA3AF] bg-transparent border-none cursor-pointer hover:text-[#DC2626] transition-[color] duration-200 ease-in-out rounded-full"
                  aria-label={`Remove ${file.name}`}
                >
                  <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
