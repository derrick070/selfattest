import React, { useState, useEffect } from 'react';

interface ExplanationSectionProps {
  showExplanation: boolean;
  setShowExplanation: (show: boolean) => void;
  startApplication: () => void;
  darkMode: boolean;
}

const ExplanationSection: React.FC<ExplanationSectionProps> = ({
  showExplanation,
  setShowExplanation,
  startApplication,
  darkMode,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    if (showExplanation) {
      setIsVisible(true);
      
      // Animate through the steps
      const interval = setInterval(() => {
        setActiveStep(prev => (prev < 2 ? prev + 1 : 0));
      }, 3000);
      
      return () => clearInterval(interval);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this with the transition duration
      return () => clearTimeout(timer);
    }
  }, [showExplanation]);
  
  if (!isVisible && !showExplanation) return null;
  
  const steps = [
    {
      title: "Upload Your Document",
      description: "Upload the PDF document you want to self-attest.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className={`${darkMode ? 'stroke-blue-400' : 'stroke-blue-600'}`}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 15l3-3 2 2 4-4 2 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7v7m-3-3l3 3 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Add Your Signature",
      description: "Draw or upload your signature to be added to the document.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className={`${darkMode ? 'stroke-blue-400' : 'stroke-blue-600'}`}>
          <path d="M3 17h4.5L18 6.5c1-1 1-2.5 0-3.5s-2.5-1-3.5 0L4 13.5V18z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.5 3l3.5 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 21h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Download Attested Document",
      description: "Download your document with the signature applied.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className={`${darkMode ? 'stroke-blue-400' : 'stroke-blue-600'}`}>
          <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 16v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];
  
  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 ${
      showExplanation ? 'opacity-100' : 'opacity-0 pointer-events-none'
    } transition-opacity duration-300 ease-in-out ${
      darkMode ? 'bg-gray-900/95' : 'bg-gray-100/95'
    }`}>
      <div 
        className={`w-full max-w-4xl p-6 sm:p-8 rounded-xl my-4 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-2xl transition-all duration-500 ease-in-out transform ${
          showExplanation ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Document Self-Attestation</h1>
          <button 
            onClick={() => setShowExplanation(false)}
            className={`p-1 rounded-full ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className={`${darkMode ? 'stroke-gray-400' : 'stroke-gray-600'}`}>
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="mb-8">
          <p className="text-lg mb-4">
            This application allows you to self-attest documents by adding your signature to PDF files.
            No data is sent to any server - all processing happens directly in your browser.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ease-in-out ${
                  activeStep === index 
                    ? `scale-105 ${darkMode ? 'border-blue-500 bg-blue-900/20' : 'border-blue-500 bg-blue-50'}`
                    : `${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-3 transition-transform duration-500 ease-in-out ${
                    activeStep === index ? 'transform-gpu animate-bounce' : ''
                  }`}>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={() => {
              setShowExplanation(false);
              startApplication();
            }}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } flex items-center`}
          >
            Get Started
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className="ml-2 stroke-white">
              <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
