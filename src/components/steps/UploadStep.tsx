import React, { useState, useEffect } from 'react';

interface UploadStepProps {
  file: File | null;
  setFile: (file: File | null) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  darkMode: boolean;
}

const UploadStep: React.FC<UploadStepProps> = ({
  file,
  setFile,
  handleFileChange,
  handleFileDrop,
  darkMode,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Step 1: Upload Your Document</h2>
      
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        className={`p-3 sm:p-5 border-2 border-dashed ${
          darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50/80'
        } rounded-2xl text-center w-full mb-4 sm:mb-6`}
      >
        <div className="flex flex-col items-center justify-center py-4 sm:py-6 w-full">
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={`mb-3 sm:mb-4 ${darkMode ? 'stroke-gray-300' : 'stroke-gray-600'}`}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18v-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 15l3 3 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <p className={`mb-3 sm:mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>
            Drag & drop your document here, or
            <label className={`ml-1 cursor-pointer ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'}`}>
              browse
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </p>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6 sm:mb-8`}>
            Supported formats: PDF, JPG, PNG, GIF
          </p>

          <label
            className={`px-4 sm:px-6 py-2 sm:py-3 ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-2xl font-medium cursor-pointer text-sm sm:text-base shadow-md hover:shadow-lg transition-all w-full sm:w-auto`}
          >
            Upload Document
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      {file && (
        <div className={`p-4 sm:p-6 ${
          darkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } rounded-2xl shadow-lg backdrop-blur mb-6 sm:mb-8 w-full`}>
          {/* File Info Header */}
          <div className={`p-2 sm:p-3 rounded-xl ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          } flex items-center justify-between w-full mb-4`}>
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                className={`mr-2 sm:mr-3 ${darkMode ? 'stroke-blue-400' : 'stroke-blue-500'}`}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm sm:text-base font-medium truncate max-w-[150px] sm:max-w-[300px] md:max-w-[400px]">
                {file.name}
              </span>
            </div>
            <button 
              onClick={() => setFile(null)}
              className={`p-1 rounded-full ${
                darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
              }`}
              aria-label="Remove file"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                className={`${darkMode ? 'stroke-gray-300' : 'stroke-gray-600'}`}>
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Document Preview */}
          <DocumentPreview file={file} darkMode={darkMode} />
        </div>
      )}
    </div>
  );
};

// Document Preview Component
const DocumentPreview: React.FC<{ file: File, darkMode: boolean }> = ({ file, darkMode }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Clear previous preview
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    
    setLoading(true);
    setError(null);
    
    // Generate preview URL
    try {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setLoading(false);
      
      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } catch (err) {
      console.error('Error creating preview:', err);
      setError('Could not generate preview for this file');
      setLoading(false);
    }
  }, [file]);
  
  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`flex items-center justify-center h-64 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{error}</p>
      </div>
    );
  }
  
  // Render based on file type
  if (file.type === 'application/pdf') {
    return (
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-[500px]">
        <iframe 
          src={`${preview}#toolbar=0`} 
          className="w-full h-full" 
          title="PDF Preview"
        />
      </div>
    );
  } else if (file.type.startsWith('image/')) {
    return (
      <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex justify-center p-4`}>
        <img 
          src={preview || ''} 
          alt="Document preview" 
          className="max-h-[400px] object-contain rounded shadow-sm" 
        />
      </div>
    );
  }
  
  // Fallback for unsupported file types
  return (
    <div className={`flex items-center justify-center h-64 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Preview not available for this file type
      </p>
    </div>
  );
};

export default UploadStep;
