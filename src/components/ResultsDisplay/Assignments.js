import React from 'react';

const Assignments = ({ assignments }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Assignments
      </h3>
      {assignments.map((assignment, index) => (
        <div
          key={`assignment-${index}`}
          className="p-3 bg-gray-50 rounded-md mb-2 last:mb-0 border-l-2 border-blue-400"
        >
          <div className="flex items-start">
            <div className="flex-1">
              <span className="font-medium text-gray-800">
                {assignment.name}
              </span>
              <p className="text-gray-600">
                Due: {new Date(assignment.due).toLocaleDateString()}
              </p>
              {assignment.description && (
                <p className="text-gray-500 text-sm mt-1">
                  {assignment.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Assignments;
