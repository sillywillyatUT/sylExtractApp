import React from 'react';

const HelpInfo = () => {
  return (
    <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500 mr-3"
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-semibold text-blue-800 mb-2">How It Works</h3>
          <p className="text-sm text-blue-700">
            This tool extracts important dates and schedule information from your syllabus using advanced language processing. It recognizes:
          </p>
          <ul className="list-disc list-inside text-sm mt-2 text-blue-700 ml-2">
            <li>Regular class meeting times (MWF, TTH, etc.)</li>
            <li>Assignment due dates</li>
            <li>Exams, midterms, and finals</li>
            <li>Office hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpInfo;
