import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StepIndicator from './components/ui/StepIndicator';
import ExplanationSection from './components/ui/ExplanationSection';
import NavigationControls from './components/ui/NavigationControls';
import UploadStep from './components/steps/UploadStep';
import SignatureStep from './components/steps/SignatureStep';
import DownloadStep from './components/steps/DownloadStep';

// Hooks
import useAttestation from './hooks/useAttestation';

function App() {
  const {
    darkMode,
    currentStep,
    file,
    uploadedSignature,
    attestedPdfUrl,
    isProcessing,
    showExplanation,
    hasSignature,
    applicationStarted,
    sigPad,
    toggleDarkMode,
    startApplication,
    goToNextStep,
    goToPreviousStep,
    resetProcess,
    clearSignature,
    handleFileChange,
    handlePDFDrop,
    handleSignatureUpload,
    handleSignatureDrop,
    handleAttest,
    handleSignatureEnd,
    setShowExplanation,
    setFile,
    setUploadedSignature,
  } = useAttestation();

  return (
    <div className={`min-h-screen flex flex-col items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col items-center">
        {/* Header */}
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Explanation Section */}
        <ExplanationSection 
          showExplanation={showExplanation} 
          setShowExplanation={setShowExplanation}
          startApplication={startApplication}
          darkMode={darkMode} 
        />
        
        {applicationStarted && (
          <>
            {/* Step Indicator */}
            <StepIndicator 
              currentStep={currentStep} 
              totalSteps={3} 
              darkMode={darkMode} 
            />
            
            {/* Step Content Container */}
            <div className="w-full max-w-4xl px-2 sm:px-0">
              <div className={`p-4 sm:p-6 ${
                darkMode ? 'bg-gray-800/90' : 'bg-white/90'
              } rounded-2xl shadow-lg backdrop-blur mb-6 sm:mb-8`}>
                
                {/* Step 1: Upload Document */}
                {currentStep === 0 && (
                  <UploadStep 
                    file={file}
                    setFile={setFile}
                    handleFileChange={handleFileChange}
                    handlePDFDrop={handlePDFDrop}
                    darkMode={darkMode}
                  />
                )}
                
                {/* Step 2: Add Signature */}
                {currentStep === 1 && (
                  <SignatureStep 
                    sigPad={sigPad}
                    uploadedSignature={uploadedSignature}
                    setUploadedSignature={setUploadedSignature}
                    clearSignature={clearSignature}
                    handleSignatureDrop={handleSignatureDrop}
                    handleSignatureUpload={handleSignatureUpload}
                    handleSignatureEnd={handleSignatureEnd}
                    darkMode={darkMode}
                  />
                )}
                
                {/* Step 3: Download */}
                {currentStep === 2 && (
                  <DownloadStep 
                    attestedPdfUrl={attestedPdfUrl}
                    resetProcess={resetProcess}
                    darkMode={darkMode}
                  />
                )}
                
                {/* Navigation Controls */}
                {currentStep < 2 && (
                  <div className="mt-6 sm:mt-8">
                    {currentStep === 0 && (
                      <NavigationControls 
                        currentStep={currentStep}
                        goToPreviousStep={goToPreviousStep}
                        goToNextStep={goToNextStep}
                        isNextDisabled={!file}
                        darkMode={darkMode}
                      />
                    )}
                    
                    {currentStep === 1 && (
                      <div className="flex justify-between w-full">
                        <button
                          onClick={goToPreviousStep}
                          className={`px-4 sm:px-6 py-2 sm:py-3 ${
                            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                          } rounded-lg font-medium text-sm sm:text-base flex items-center`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                            className={`mr-2 ${darkMode ? 'stroke-white' : 'stroke-gray-700'}`}>
                            <path d="M19 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Previous
                        </button>
                        
                        <button 
                          onClick={handleAttest}
                          disabled={!file || (!uploadedSignature && (!hasSignature))}
                          className={`px-4 sm:px-6 py-2 sm:py-3 ${
                            !file || (!uploadedSignature && (!hasSignature))
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : darkMode 
                                ? 'bg-blue-600 hover:bg-blue-700' 
                                : 'bg-blue-500 hover:bg-blue-600'
                          } text-white rounded-lg font-medium flex items-center text-sm sm:text-base`}
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Create Attested Document
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                className="stroke-white ml-2">
                                <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Footer */}
      <Footer darkMode={darkMode} />
      
      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
