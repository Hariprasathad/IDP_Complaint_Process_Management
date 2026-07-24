import { useRef, useState } from 'react';
import InlineError from './InlineError.jsx';
import { MESSAGES } from '../../validation/messages.js';

const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUploader({ files = [], onUpload, onRemove, maxFiles = 10, maxSizeMB = 10 }) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  function validateFile(file) {
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      return MESSAGES.fileInvalidType;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return MESSAGES.fileTooLarge;
    }
    if (files.length >= maxFiles) {
      return MESSAGES.fileMaxCount;
    }
    return null;
  }

  function handleFiles(fileList) {
    setError('');
    for (const file of fileList) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      onUpload(file);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleInputChange(e) {
    if (e.target.files?.length) {
      handleFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  }

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-brand-blue bg-brand-blue-light' : 'border-grey-border'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <svg className="mx-auto h-10 w-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-gray-600 mb-1">
          Drag and drop or{' '}
          <button
            type="button"
            className="text-brand-blue font-medium hover:underline"
            onClick={() => inputRef.current?.click()}
          >
            Browse
          </button>
        </p>
        <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, JPEG, PNG — max 10MB each</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={ACCEPTED_EXTENSIONS.join(',')}
        multiple
        onChange={handleInputChange}
      />

      <InlineError message={error} />

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file) => (
            <li key={file.id || file.name} className="flex items-center justify-between bg-grey-bg rounded-lg px-4 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="h-4 w-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                <span className="text-xs text-gray-500 shrink-0">({formatFileSize(file.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(file.id || file.name)}
                className="text-gray-400 hover:text-red-600 ml-2 shrink-0"
                aria-label={`Remove ${file.name}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
