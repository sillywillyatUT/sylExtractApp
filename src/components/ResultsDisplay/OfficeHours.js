import React from 'react';

const OfficeHours = ({ officehours }) => {
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Office Hours
      </h3>
      {officehours.map((officeHour, index) => (
        <div
          key={`office-${index}`}
          className="p-3 bg-gray-50 rounded-md mb-2 last:mb-0 border-l-2 border-blue-400"
        >
          <div className="flex items-start">
            <div className="flex-1">
              <span className="font-medium text-gray-800">
                {officeHour.day}
              </span>
              <p className="text-gray-600">{officeHour.time}</p>
              {officeHour.location && (
                <p className="text-gray-500 text-sm">
                  {officeHour.location}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfficeHours;
