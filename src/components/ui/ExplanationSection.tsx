import React, { useState, useEffect } from 'react';

interface ExplanationSectionProps {
  startApplication: () => void;
  darkMode: boolean;
}

const ExplanationSection: React.FC<ExplanationSectionProps> = ({
  startApplication,
  darkMode,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    // Animate through the steps
    const interval = setInterval(() => {
      setActiveStep(prev => (prev < 2 ? prev + 1 : 0));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
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
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className={`w-full max-w-4xl p-6 sm:p-8 rounded-2xl my-4 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-2xl`}>
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Document Self-Attestation</h1>
          
          <p className="text-lg mb-8 text-center">
            This application allows you to self-attest documents by adding your signature to PDF files.
            No data is sent to any server - all processing happens directly in your browser.
          </p>
          
          {/* Single animated step box */}
          <div className="w-full max-w-lg mx-auto">
            <div 
              className={`p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 ease-in-out flex flex-col ${
                darkMode ? 'border-blue-500 bg-blue-900/20' : 'border-blue-500 bg-blue-50'
              } min-h-[250px] sm:min-h-[280px]`}
            >
              {/* Step indicator dots */}
              <div className="flex justify-center mb-4 sm:mb-6">
                {steps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mx-1 sm:mx-2 transition-colors ${
                      activeStep === index
                        ? darkMode ? 'bg-blue-400' : 'bg-blue-600'
                        : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {/* Animated content */}
              <div className="flex-1 flex flex-col items-center justify-between">
                <div 
                  className="flex flex-col items-center text-center transition-opacity duration-500 ease-in-out animate-fadeIn w-full"
                  key={activeStep} /* Key forces re-render on step change */
                >
                  <div className="mb-6 sm:mb-8 transform-gpu animate-bounce">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{steps[activeStep].title}</h3>
                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {steps[activeStep].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bento-style button container */}
        <div className="flex justify-center mt-6">
          <button
            onClick={startApplication}
            className={`px-6 py-3 rounded-2xl font-medium text-white transition-colors shadow-md hover:shadow-lg ${
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
