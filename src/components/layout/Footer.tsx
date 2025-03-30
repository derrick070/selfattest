import React from 'react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer>
      <p className={`mt-6 sm:mt-8 text-xs sm:text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
