import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  darkMode: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, darkMode }) => {
  return (
    <div className="flex items-center justify-center w-full mb-6 sm:mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Step Circle */}
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
              index <= currentStep
                ? darkMode
                  ? 'bg-blue-600'
                  : 'bg-blue-500'
                : darkMode
                ? 'bg-gray-700'
                : 'bg-gray-200'
            }`}
          >
            {index < currentStep ? (
              // Completed step (checkmark)
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-white"
              >
                <polyline
                  points="20 6 9 17 4 12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // Current or future step (number)
              <span className="text-white font-medium">{index + 1}</span>
            )}
          </div>

          {/* Connector Line (if not the last step) */}
          {index < totalSteps - 1 && (
            <div
              className={`h-1 flex-1 mx-2 sm:mx-3 ${
                index < currentStep
                  ? darkMode
                    ? 'bg-blue-600'
                    : 'bg-blue-500'
                  : darkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-200'
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
