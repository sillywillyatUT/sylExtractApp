import React from 'react';

const Exams = ({ exams }) => {
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Exams & Tests
      </h3>
      {exams.map((exam, index) => (
        <div
          key={`exam-${index}`}
          className="p-3 bg-gray-50 rounded-md mb-2 last:mb-0 border-l-2 border-blue-400"
        >
          <div className="flex items-start">
            <div className="flex-1">
              <span className="font-medium text-gray-800">{exam.name}</span>
              <p className="text-gray-600">
                {new Date(exam.date).toLocaleDateString()} at {exam.time}
              </p>
              {exam.location && (
                <p className="text-gray-500 text-sm">{exam.location}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Exams;
