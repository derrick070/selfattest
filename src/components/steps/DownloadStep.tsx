import React from 'react';

interface DownloadStepProps {
  attestedPdfUrl: string | null;
  resetProcess: () => void;
  darkMode: boolean;
}

const DownloadStep: React.FC<DownloadStepProps> = ({
  attestedPdfUrl,
  resetProcess,
  darkMode,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Step 3: Download Your Attested Document</h2>
      
      <div className={`p-4 sm:p-8 ${
        darkMode ? 'bg-gray-700/50' : 'bg-green-50/80'
      } rounded-2xl w-full mb-6 sm:mb-8 flex flex-col items-center justify-center shadow-lg`}>
        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${
          darkMode ? 'bg-green-500' : 'bg-green-100'
        } flex items-center justify-center mb-3 sm:mb-4`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
            className={`${darkMode ? 'stroke-white' : 'stroke-green-600'}`}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="22 4 12 14.01 9 11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Document Successfully Attested</h3>
        <p className="text-sm text-center mb-4 sm:mb-6">Your document has been attested with your signature. You can now download it.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center w-full">
          <a 
            href={attestedPdfUrl || '#'}
            download="attested-document.pdf"
            className={`px-4 sm:px-6 py-2 sm:py-3 ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-2xl font-medium flex items-center justify-center text-sm sm:text-base shadow-md hover:shadow-lg transition-all w-full sm:w-auto`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className="stroke-white mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Attested Document
          </a>
          
          <button 
            onClick={resetProcess}
            className={`px-4 sm:px-6 py-2 sm:py-3 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            } rounded-2xl font-medium text-sm sm:text-base flex items-center justify-center shadow-md hover:shadow-lg transition-all w-full sm:w-auto`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className={`mr-2 ${darkMode ? 'stroke-white' : 'stroke-gray-700'}`}>
              <path d="M3 2v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 13a9 9 0 1 0 3-7.7L3 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadStep;
