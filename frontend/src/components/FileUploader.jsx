import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';

const FileUploader = ({ onFileSelect, isUploading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-all duration-200
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }
        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      {isDragActive ? (
        <p className="text-blue-600">Drop the CSV file here...</p>
      ) : (
        <>
          <p className="text-gray-600">
            Drag & drop a CSV file here, or click to select
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported format: .csv
          </p>
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <FileText className="h-4 w-4 mr-1" />
            <span>Maximum file size: 10MB</span>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;