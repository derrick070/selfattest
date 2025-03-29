import React from 'react';

interface UploadStepProps {
  file: File | null;
  setFile: (file: File | null) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePDFDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  darkMode: boolean;
}

const UploadStep: React.FC<UploadStepProps> = ({
  file,
  setFile,
  handleFileChange,
  handlePDFDrop,
  darkMode,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Step 1: Upload Your Document</h2>
      
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handlePDFDrop}
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
            Drag & drop your PDF here, or
            <label className={`ml-1 cursor-pointer ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'}`}>
              browse
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </p>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6 sm:mb-8`}>
            Supported format: PDF
          </p>

          <label
            className={`px-4 sm:px-6 py-2 sm:py-3 ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-2xl font-medium cursor-pointer text-sm sm:text-base shadow-md hover:shadow-lg transition-all w-full sm:w-auto`}
          >
            Upload PDF
            <input
              type="file"
              accept="application/pdf"
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
          <div className={`p-2 sm:p-3 rounded-xl ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          } flex items-center justify-between w-full`}>
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
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                className={`${darkMode ? 'stroke-gray-300' : 'stroke-gray-600'}`}>
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadStep;
