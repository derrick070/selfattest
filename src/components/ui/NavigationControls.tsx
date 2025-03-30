import React, { useState } from 'react';

interface NavigationControlsProps {
  currentStep: number;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  isNextDisabled: boolean;
  darkMode: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentStep,
  goToPreviousStep,
  goToNextStep,
  isNextDisabled,
  darkMode,
}) => {
  const [prevButtonPressed, setPrevButtonPressed] = useState(false);
  const [nextButtonPressed, setNextButtonPressed] = useState(false);
  
  const handlePrevClick = () => {
    setPrevButtonPressed(true);
    setTimeout(() => {
      setPrevButtonPressed(false);
      goToPreviousStep();
    }, 150);
  };
  
  const handleNextClick = () => {
    if (isNextDisabled) return;
    
    setNextButtonPressed(true);
    setTimeout(() => {
      setNextButtonPressed(false);
      goToNextStep();
    }, 150);
  };
  return (
    <div className="flex justify-between w-full">
      {currentStep > 0 ? (
        <button
          onClick={handlePrevClick}
          className={`px-4 sm:px-6 py-2 sm:py-3 ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          } rounded-2xl font-medium text-sm sm:text-base flex items-center shadow-md hover:shadow-lg transition-all transform ${prevButtonPressed ? 'scale-95' : 'scale-100'} duration-150`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
            className={`mr-2 ${darkMode ? 'stroke-white' : 'stroke-gray-700'}`}>
            <path d="M19 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Previous
        </button>
      ) : (
        <div></div>
      )}
      
      <button
        onClick={handleNextClick}
        disabled={isNextDisabled}
        className={`px-4 sm:px-6 py-2 sm:py-3 ${
          isNextDisabled
            ? 'bg-gray-400 cursor-not-allowed' 
            : darkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
        } text-white rounded-2xl font-medium flex items-center text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform ${nextButtonPressed && !isNextDisabled ? 'scale-95' : 'scale-100'} duration-150`}
      >
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className="stroke-white ml-2">
          <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default NavigationControls;
