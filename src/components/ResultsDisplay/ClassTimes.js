import React from 'react';

const ClassTimes = ({ classTimes }) => {
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Class Schedule
      </h3>
      {classTimes.map((classTime, index) => (
        <div
          key={`class-${index}`}
          className="p-3 bg-gray-50 rounded-md mb-2 last:mb-0 border-l-2 border-blue-400"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <span className="font-medium text-gray-800">
                {classTime.day}
              </span>
              <p className="text-gray-600">
                {classTime.time} {classTime.location && `at ${classTime.location}`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassTimes;
