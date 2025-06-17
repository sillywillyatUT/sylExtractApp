import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center">
      <h1 className="text-2xl font-bold text-white flex-1">{title}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-white h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        width="10em"
        height="10em"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </header>
  );
};

export default Header;
