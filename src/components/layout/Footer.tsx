import React from "react";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {

  return (
    <footer className="w-full py-4 mt-auto flex flex-col items-center gap-3">
      {/* Buy Me a Coffee Button */}
      <div className="flex flex-col items-center">
        <a
          href="https://paypal.me/derrickd070"
          target="_blank"
          rel="noopener noreferrer"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } flex items-center gap-2`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M18 8H19C20.105 8 21 8.895 21 10V16C21 17.105 20.105 18 19 18H5C3.895 18 3 17.105 3 16V10C3 8.895 3.895 8 5 8H6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 11V6C6 4.343 7.343 3 9 3H15C16.657 3 18 4.343 18 6V11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          ☕ Buy me a coffee
        </a>


      </div>

      {/* Copyright */}
      <p
        className={`text-xs sm:text-sm text-center ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Created with ❤️ by Derrick D'souza
      </p>
    </footer>
  );
};

export default Footer;
