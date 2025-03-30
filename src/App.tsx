import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Components
import SEO from './components/SEO';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StepIndicator from './components/ui/StepIndicator';
import TransitionWrapper from './components/ui/TransitionWrapper';
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
    attestedDocument,
    isProcessing,
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
    handleFileDrop,
    handleSignatureUpload,
    handleSignatureDrop,
    handleAttest,
    handleSignatureEnd,
    setFile,
    setUploadedSignature,
    signatureMode,
    setSignatureMode,
    textSignature,
    setTextSignature,
  } = useAttestation();

  return (
    <>
      <SEO />
      <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content - Flex-1 ensures it takes available space, pushing footer down */}
      <main className="flex-1 flex flex-col items-center w-full">
        {!applicationStarted ? (
          // Explanation Page
          <ExplanationSection 
            startApplication={startApplication}
            darkMode={darkMode} 
          />
        ) : (
          // Main Application
          <div className="container mx-auto px-4 py-6 flex flex-col items-center w-full">
          {/* Step Indicator */}
          <StepIndicator 
            currentStep={currentStep} 
            totalSteps={3} 
            darkMode={darkMode} 
          />
          
          {/* Step Content Container */}
          <div className="w-full max-w-4xl px-2 sm:px-0">
            <div className={`p-5 sm:p-7 ${
              darkMode ? 'bg-gray-800/90' : 'bg-white/90'
            } rounded-2xl shadow-lg backdrop-blur mb-6 sm:mb-8`}>
              
              {/* Step 1: Upload Document */}
              <TransitionWrapper show={currentStep === 0}>
                <UploadStep 
                  file={file}
                  setFile={setFile}
                  handleFileChange={handleFileChange}
                  handleFileDrop={handleFileDrop}
                  darkMode={darkMode}
                />
              </TransitionWrapper>
              
              {/* Step 2: Add Signature */}
              <TransitionWrapper show={currentStep === 1}>
                <SignatureStep 
                  sigPad={sigPad}
                  uploadedSignature={uploadedSignature}
                  setUploadedSignature={setUploadedSignature}
                  clearSignature={clearSignature}
                  handleSignatureDrop={handleSignatureDrop}
                  handleSignatureUpload={handleSignatureUpload}
                  handleSignatureEnd={handleSignatureEnd}
                  darkMode={darkMode}
                  signatureMode={signatureMode}
                  setSignatureMode={setSignatureMode}
                  textSignature={textSignature}
                  setTextSignature={setTextSignature}
                />
              </TransitionWrapper>
              
              {/* Step 3: Download */}
              <TransitionWrapper show={currentStep === 2}>
                <DownloadStep 
                  attestedDocument={attestedDocument}
                  resetProcess={resetProcess}
                  darkMode={darkMode}
                />
              </TransitionWrapper>
              
              {/* Navigation Controls */}
              {currentStep < 2 && (
                <div className="mt-7 sm:mt-8">
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
                    <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-0">
                      <button
                        onClick={goToPreviousStep}
                        className={`px-4 sm:px-6 py-2 sm:py-3 ${
                          darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                        } rounded-2xl font-medium text-sm sm:text-base flex items-center shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center`}
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
                        disabled={!file || (signatureMode === 'upload' && !uploadedSignature) || (signatureMode === 'draw' && !hasSignature) || (signatureMode === 'text' && !textSignature.trim())}
                        className={`px-4 sm:px-6 py-2 sm:py-3 ${
                          !file || (signatureMode === 'upload' && !uploadedSignature) || (signatureMode === 'draw' && !hasSignature) || (signatureMode === 'text' && !textSignature.trim())
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : darkMode 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-blue-500 hover:bg-blue-600'
                        } text-white rounded-2xl font-medium flex items-center text-sm sm:text-base shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center`}
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
          </div>
        )}
      </main>
      
      {/* Footer */}
      <Footer darkMode={darkMode} />
      
      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </div>
    </>
  );
}

export default App;
