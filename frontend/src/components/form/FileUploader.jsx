import React, { useRef, useState } from 'react';
import useWizardStore from '../../store/wizardStore';

const VISIBLE_FILES_COUNT = 3;

const FileUploader = ({ label, maxFiles = 10, maxSizeMB = 10 }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [removingIds, setRemovingIds] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  
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

  const handleFiles = (files) => {
    setValidationErrors([]);

    const remainingSlots = maxFiles - attachments.length;
    if (remainingSlots <= 0) {
      setValidationErrors(['Maximum file limit reached.']);
      return;
    }

    const allFiles = Array.from(files);
    const errors = [];
    const sizeErrors = [];
    const formatErrors = [];
    let addedCount = 0;
    let limitRejected = 0;

    for (const file of allFiles) {
      // Check format first
      if (file.size > maxSizeMB * 1024 * 1024) {
        sizeErrors.push(file.name);
        continue;
      }
      if (!SUPPORTED_TYPES.includes(file.type)) {
        formatErrors.push(file.name);
        continue;
      }
      // Valid file — check if there's room
      if (addedCount + attachments.length >= maxFiles) {
        limitRejected++;
        continue;
      }
      // Add the file
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
      addedCount++;
    }

    // Build grouped error messages
    if (sizeErrors.length === 1) {
      errors.push(`"${sizeErrors[0]}" exceeds the ${maxSizeMB} MB file size limit.`);
    } else if (sizeErrors.length > 1) {
      errors.push(`${sizeErrors.length} files exceed the ${maxSizeMB} MB file size limit.`);
    }

    if (formatErrors.length === 1) {
      errors.push(`"${formatErrors[0]}" is not a supported file type. Allowed formats: PDF, DOC, DOCX, JPG, JPEG, PNG.`);
    } else if (formatErrors.length > 1) {
      errors.push(`${formatErrors.length} files are not supported. Allowed formats: PDF, DOC, DOCX, JPG, JPEG, PNG.`);
    }

    if (limitRejected > 0) {
      errors.push(`Maximum file limit reached. ${limitRejected} ${limitRejected === 1 ? 'file was' : 'files were'} not added.`);
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
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
      // Clear validation error if files are now under the limit
      if (attachments.length - 1 < maxFiles) {
        setValidationErrors([]);
      }
      // If after removal we have 3 or fewer files, collapse
      if (attachments.length - 1 <= VISIBLE_FILES_COUNT) {
        setIsExpanded(false);
      }
    }, 200);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const hiddenCount = attachments.length - VISIBLE_FILES_COUNT;

  const isMaxFilesReached = attachments.length >= maxFiles;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal w-full max-w-[488px]">
          {label}
        </label>
      )}
      
      {/* Upload area */}
      <div 
        className={`w-full min-h-[140px] rounded-[10px] text-center transition-colors flex flex-col items-center justify-center mt-4 py-[24px] flex-shrink-0 ${
          isMaxFilesReached ? 'bg-[#F3F4F6] opacity-60 cursor-not-allowed' : 'bg-[#FAFBFC] cursor-pointer'
        } ${isDragging && !isMaxFilesReached ? 'bg-blue-50' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='${isMaxFilesReached ? '%23F3F4F6' : '%23FAFBFC'}' rx='10' ry='10' stroke='${isDragging && !isMaxFilesReached ? '%234664DC' : '%23B9C1CC'}' stroke-width='1.5' stroke-dasharray='6%2C 5' stroke-dashoffset='0' stroke-linecap='round'/%3E%3C/svg%3E")`,
        }}
        onDragOver={!isMaxFilesReached ? handleDragOver : undefined}
        onDragLeave={!isMaxFilesReached ? handleDragLeave : undefined}
        onDrop={!isMaxFilesReached ? handleDrop : undefined}
        onClick={!isMaxFilesReached ? handleClick : undefined}
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
          <img src="/fileicon.svg" alt="Upload" className="w-[14px] h-[14px]" />
          <p className="text-[15px] font-medium leading-[15px] tracking-normal text-[#333333]">
            Drag files here or <span onClick={!isMaxFilesReached ? handleClick : undefined} className={`text-[#2563eb] underline decoration-solid ${isMaxFilesReached ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>Browse</span>
          </p>
          <p className="text-[12px] font-normal leading-[12px] tracking-normal text-[#9AA1AB]">
            PDF, DOC, DOCX, JPG, JPEG, PNG — max {maxFiles} files, {maxSizeMB} MB each
          </p>
        </div>
      </div>

      {/* Validation error messages */}
      {validationErrors.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          {validationErrors.map((error, index) => (
            <p key={index} className="text-[13px] text-red-500">{error}</p>
          ))}
        </div>
      )}

      {/* File list */}
      {attachments.length > 0 && (
        <div className="mt-4 flex flex-col gap-[8px]">
          {/* First 3 files - always visible */}
          {attachments.slice(0, VISIBLE_FILES_COUNT).map((file) => (
            <div 
              key={file.id} 
              className={`flex items-center justify-between px-[16px] py-[10px] min-h-[52px] bg-white border border-[#E5E7EB] rounded-[10px] cursor-default hover:bg-[#F8FAFC] hover:border-[#D1D5DB] transition-all duration-200 ease-in-out ${
                removingIds.includes(file.id) ? 'opacity-0 -translate-y-1 max-h-0 py-0 my-0 overflow-hidden' : 'opacity-100 translate-y-0 max-h-[60px]'
              }`}
              style={{ transition: 'all 200ms ease-out' }}
            >
              <div className="flex items-center gap-[12px] overflow-hidden min-w-0 flex-1">
                <img src="/fileuploadicon.svg" alt="File" className="w-[20px] h-[20px] flex-shrink-0" />
                <a
                  href={file.file ? URL.createObjectURL(file.file) : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={file.name}
                  className="text-[#2563EB] text-[14px] font-normal leading-[20px] no-underline hover:underline overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {file.name}
                </a>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemoveFile(file.id); }}
                className="w-[32px] h-[32px] flex-shrink-0 flex items-center justify-center bg-transparent border-none cursor-pointer rounded-full p-[8px] transition-colors duration-200 hover:bg-[#FFEEEE] focus:outline-none"
                aria-label={`Remove ${file.name}`}
              >
                <img src="/deleteicon.svg" alt="Delete" className="w-[16px] h-[16px]" />
              </button>
            </div>
          ))}

          {/* Expandable files (4+) - animated container */}
          {hiddenCount > 0 && (
            <div 
              className="flex flex-col gap-[8px] overflow-hidden transition-all duration-200 ease-out"
              style={{
                maxHeight: isExpanded ? `${(hiddenCount) * 68}px` : '0px',
                opacity: isExpanded ? 1 : 0,
              }}
            >
              {attachments.slice(VISIBLE_FILES_COUNT).map((file, index) => (
                <div 
                  key={file.id} 
                  className={`flex items-center justify-between px-[16px] py-[10px] min-h-[52px] bg-white border border-[#E5E7EB] rounded-[10px] cursor-default hover:bg-[#F8FAFC] hover:border-[#D1D5DB] transition-all duration-200 ease-out ${
                    removingIds.includes(file.id) ? 'opacity-0 -translate-y-1 max-h-0 py-0 my-0 overflow-hidden' : ''
                  }`}
                  style={{
                    opacity: isExpanded ? 1 : 0,
                    transform: isExpanded ? 'translateY(0)' : 'translateY(4px)',
                    transition: `opacity 180ms ease-out ${index * 30}ms, transform 180ms ease-out ${index * 30}ms`,
                  }}
                >
                  <div className="flex items-center gap-[12px] overflow-hidden min-w-0 flex-1">
                    <img src="/fileuploadicon.svg" alt="File" className="w-[20px] h-[20px] flex-shrink-0" />
                    <a
                      href={file.file ? URL.createObjectURL(file.file) : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={file.name}
                      className="text-[#2563EB] text-[14px] font-normal leading-[20px] no-underline hover:underline overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {file.name}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleRemoveFile(file.id); }}
                    className="w-[32px] h-[32px] flex-shrink-0 flex items-center justify-center bg-transparent border-none cursor-pointer rounded-full p-[8px] transition-colors duration-200 hover:bg-[#FFEEEE] focus:outline-none"
                    aria-label={`Remove ${file.name}`}
                  >
                    <img src="/deleteicon.svg" alt="Delete" className="w-[16px] h-[16px]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Expand/Collapse button */}
          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={toggleExpand}
              aria-expanded={isExpanded}
              className="w-full flex items-center gap-2 px-[16px] py-[8px] text-[14px] font-medium text-[#4664DC] cursor-pointer bg-transparent border-none hover:text-[#0657AD] transition-colors duration-200"
            >
              <span>
                {isExpanded ? 'Show less' : `Show ${hiddenCount} more file${hiddenCount > 1 ? 's' : ''}`}
              </span>
              <img 
                src={isExpanded ? '/upicon.svg' : '/downicon.svg'} 
                alt={isExpanded ? 'Collapse' : 'Expand'} 
                className="w-4 h-4 transition-transform duration-200" 
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
