import React from 'react';

interface NavigationControlsProps {
  currentStep: number;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  isNextDisabled?: boolean;
  darkMode: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentStep,
  goToPreviousStep,
  goToNextStep,
  isNextDisabled = false,
  darkMode,
}) => {
  return (
    <div className="flex justify-between w-full">
      {currentStep > 0 ? (
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
      ) : (
        <div></div> // Empty div to maintain the flex layout
      )}
      
      {currentStep < 2 && (
        <button
          onClick={goToNextStep}
          disabled={isNextDisabled}
          className={`px-4 sm:px-6 py-2 sm:py-3 ${
            isNextDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
          } text-white rounded-lg font-medium text-sm sm:text-base flex items-center`}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
            className="ml-2 stroke-white">
            <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default NavigationControls;
