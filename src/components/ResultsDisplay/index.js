
// File: src/components/ResultsDisplay/index.js
import React from 'react';
import ClassTimes from './ClassTimes';
import Assignments from './Assignments';
import Exams from './Exams';
import OfficeHours from './OfficeHours';

const ResultsDisplayContainer = ({ extractedEvents }) => (
  <div className="mt-8">
    {extractedEvents.classTimes && (
      <ClassTimes classTimes={extractedEvents.classTimes} />
    )}
    {extractedEvents.assignments && (
      <Assignments assignments={extractedEvents.assignments} />
    )}
    {extractedEvents.exams && <Exams exams={extractedEvents.exams} />}
    {extractedEvents.officehours && (
      <OfficeHours officehours={extractedEvents.officehours} />
    )}
  </div>
);

export default ResultsDisplayContainer;

// Additionally, you can re-export the subcomponents if needed:
export { default as ClassTimes } from './ClassTimes';
export { default as Assignments } from './Assignments';
export { default as Exams } from './Exams';
export { default as OfficeHours } from './OfficeHours';
