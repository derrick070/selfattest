import React, { RefObject, useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignatureStepProps {
  sigPad: RefObject<SignatureCanvas>;
  uploadedSignature: string | null;
  setUploadedSignature: (signature: string | null) => void;
  clearSignature: () => void;
  handleSignatureDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleSignatureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignatureEnd: () => void;
  darkMode: boolean;
  signatureMode: 'draw' | 'upload' | 'text';
  setSignatureMode: (mode: 'draw' | 'upload' | 'text') => void;
  textSignature: string;
  setTextSignature: (text: string) => void;
}

const SignatureStep: React.FC<SignatureStepProps> = ({
  sigPad,
  uploadedSignature,
  setUploadedSignature,
  clearSignature,
  handleSignatureDrop,
  handleSignatureUpload,
  handleSignatureEnd,
  darkMode,
  signatureMode,
  setSignatureMode,
  textSignature,
  setTextSignature,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 200 });
  
  // Handle canvas resize to fix alignment issues
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: Math.floor(width - 4), // Subtract border width
          height: 200
        });
      }
    };
    
    // Initial size
    updateCanvasSize();
    
    // Update on resize
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);
  
  // Reset signature pad when size changes
  useEffect(() => {
    if (sigPad.current) {
      // Clear and resize
      sigPad.current.clear();
    }
  }, [canvasSize, sigPad]);
  
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Step 2: Add Your Signature</h2>
      
      {/* Signature Mode Toggle */}
      <div className="flex w-full max-w-md mb-6 rounded-2xl overflow-hidden shadow-md">
        <button
          onClick={() => setSignatureMode('draw')}
          className={`flex-1 py-2 sm:py-3 text-center text-sm sm:text-base font-medium transition-colors ${signatureMode === 'draw' 
            ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white' 
            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
        >
          Draw
        </button>
        <button
          onClick={() => setSignatureMode('upload')}
          className={`flex-1 py-2 sm:py-3 text-center text-sm sm:text-base font-medium transition-colors ${signatureMode === 'upload' 
            ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white' 
            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
        >
          Upload
        </button>
        <button
          onClick={() => setSignatureMode('text')}
          className={`flex-1 py-2 sm:py-3 text-center text-sm sm:text-base font-medium transition-colors ${signatureMode === 'text' 
            ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white' 
            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
        >
          Name
        </button>
      </div>
      
      <div className="w-full max-w-2xl mb-4 sm:mb-6">
        {/* Draw Signature */}
        {signatureMode === 'draw' && (
          <div className={`p-3 sm:p-5 border-2 border-dashed ${
            darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50/80'
          } rounded-2xl flex flex-col items-center w-full`}>
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Draw Your Signature</h3>
            <div 
              ref={containerRef}
              className={`w-full border-2 ${
                darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
              } rounded-2xl mb-3 sm:mb-4 relative`}
            >
              <SignatureCanvas
                ref={sigPad}
                canvasProps={{
                  className: 'sigCanvas',
                  width: canvasSize.width,
                  height: canvasSize.height,
                  style: {
                    width: '100%',
                    height: '200px'
                  }
                }}
                backgroundColor={darkMode ? '#1f2937' : 'white'}
                penColor={darkMode ? 'white' : 'black'}
                onEnd={handleSignatureEnd}
              />
            </div>
            <button
              onClick={clearSignature}
              className={`px-4 py-2 rounded-xl ${
                darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } shadow-md hover:shadow-lg transition-all`}
            >
              Clear
            </button>
          </div>
        )}
        
        {/* Upload Signature */}
        {signatureMode === 'upload' && (
          <div className={`p-3 sm:p-5 border-2 border-dashed ${
            darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50/80'
          } rounded-2xl flex flex-col items-center w-full`}>
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Upload Signature Image</h3>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleSignatureDrop}
              className={`p-3 sm:p-5 border-2 border-dashed ${
                darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'
              } rounded-2xl text-center w-full mb-3 sm:mb-4 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[150px]`}
            >
              {!uploadedSignature ? (
                <>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`mb-2 sm:mb-3 ${darkMode ? 'stroke-gray-300' : 'stroke-gray-600'}`}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="21 15 16 10 5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="mb-4 text-xs sm:text-sm">Drag and drop your signature image</p>
                  <label
                    className={`px-4 py-2 rounded-xl ${
                      darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    } cursor-pointer shadow-md hover:shadow-lg transition-all`}
                  >
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                  </label>
                </>
              ) : (
                <>
                  <img src={uploadedSignature} alt="Uploaded Signature" className="max-w-full max-h-[100px] sm:max-h-[120px] border border-gray-300 p-2 bg-white mb-4 sm:mb-5 rounded-xl"/>
                  <button 
                    onClick={() => setUploadedSignature(null)}
                    className={`px-4 py-2 rounded-xl ${
                      darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    } shadow-md hover:shadow-lg transition-all`}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Text Signature */}
        {signatureMode === 'text' && (
          <div className={`p-3 sm:p-5 border-2 border-dashed ${
            darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50/80'
          } rounded-2xl flex flex-col items-center w-full`}>
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Type Your Name</h3>
            <div className="w-full mb-4">
              <input
                type="text"
                value={textSignature}
                onChange={(e) => setTextSignature(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full p-3 sm:p-4 rounded-xl border-2 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } text-center text-lg sm:text-xl font-cursive focus:outline-none focus:ring-2 ${
                  darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
                }`}
              />
            </div>
            
            {textSignature && (
              <div className={`w-full border-2 ${
                darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
              } rounded-2xl mb-3 sm:mb-4 p-4 flex items-center justify-center min-h-[120px]`}>
                <p className="text-center italic text-2xl sm:text-3xl font-cursive">
                  {textSignature}
                </p>
              </div>
            )}
            
            {textSignature && (
              <button
                onClick={() => setTextSignature('')}
                className={`px-4 py-2 rounded-xl ${
                  darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } shadow-md hover:shadow-lg transition-all`}
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignatureStep;
