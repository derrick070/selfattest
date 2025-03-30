import React, { useState } from 'react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const [showDonateOptions, setShowDonateOptions] = useState(false);
  
  const toggleDonateOptions = () => {
    setShowDonateOptions(prev => !prev);
  };
  
  return (
    <footer className="w-full py-4 mt-auto flex flex-col items-center gap-3">
      {/* Donate Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={toggleDonateOptions}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          {showDonateOptions ? 'Hide Options' : '☕ Buy me a coffee'}
        </button>
        
        {/* Donation Options */}
        {showDonateOptions && (
          <div className={`mt-3 p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} max-w-xs`}>
            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              If you found this tool helpful, consider supporting its development:
            </p>
            <div className="flex flex-col gap-2">
              <a 
                href="https://paypal.me/derrickd070" 
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded ${darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 5.25H4.5C3.67157 5.25 3 5.92157 3 6.75V17.25C3 18.0784 3.67157 18.75 4.5 18.75H19.5C20.3284 18.75 21 18.0784 21 17.25V6.75C21 5.92157 20.3284 5.25 19.5 5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 9.75H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 15.75H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                PayPal
              </a>
              
              {/* <a 
                href="https://ko-fi.com/derrickdsouza" 
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded ${darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8H19C20.105 8 21 8.895 21 10V16C21 17.105 20.105 18 19 18H5C3.895 18 3 17.105 3 16V10C3 8.895 3.895 8 5 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 11V6C6 4.343 7.343 3 9 3H15C16.657 3 18 4.343 18 6V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ko-fi
              </a> */}
            </div>
          </div>
        )}
      </div>
      
      {/* Copyright */}
      <p className={`text-xs sm:text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Created with ❤️ by 
        <a 
          href="https://www.linkedin.com/in/derrick-dsouza-007" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-500 hover:text-blue-600'} no-underline hover:underline ml-1`}
        >
          Derrick D'Souza
        </a>
      </p>
    </footer>
  );
};

export default Footer;
