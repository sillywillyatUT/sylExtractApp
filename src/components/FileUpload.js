import React from 'react';

const FileUpload = ({ fileName, handleFileUpload }) => {
  return (
    <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition">
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".pdf,.docx,.txt"
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-flex items-center cursor-pointer"
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
          />
        </svg>
        Choose File
      </label>
      <p className="mt-3 text-sm text-gray-500">
        PDF, DOCX, or TXT files accepted
      </p>
      {fileName && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="font-medium text-gray-700">{fileName}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
