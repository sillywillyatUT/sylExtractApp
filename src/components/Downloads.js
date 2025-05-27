import React from 'react';

const Downloads = ({ downloadCalendar, downloadJson }) => {
  return (
    <div className="mt-8 flex flex-col md:flex-row gap-4">
      <button
        onClick={downloadCalendar}
        className="flex-1 py-3 px-4 rounded-lg transition flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
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
        <br></br>
        Download iCalendar (.ics)
      </button>
      <br></br>
      <button
        onClick={downloadJson}
        className="flex-1 py-3 px-4 rounded-lg transition flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download JSON Data
      </button>
    </div>
  );
};

export default Downloads;
