import { useState } from 'react';
import * as mammoth from 'mammoth';
import { Parser } from 'papaparse';

export default function SyllabusParser() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [extractedEvents, setExtractedEvents] = useState(null);
  const [processingStep, setProcessingStep] = useState('');

  // Process the uploaded file
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setFileName(uploadedFile.name);
    setError('');
    setExtractedText('');
    setExtractedEvents(null);
  };

  // Extract text from different file types
  const extractTextFromFile = async () => {
    if (!file) {
      setError('Please upload a file first');
      return '';
    }

    setLoading(true);
    setProcessingStep('Extracting text from file...');

    try {
      let text = '';
      const fileType = file.name.split('.').pop().toLowerCase();

      if (fileType === 'pdf') {
        // Handle PDF files
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Direct PDF text extraction
        const pdfText = await extractPDFText(uint8Array);
        text = pdfText;
      } else if (fileType === 'docx') {
        // Handle DOCX files using Mammoth
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (fileType === 'txt') {
        // Handle plain text files
        text = await file.text();
      } else {
        throw new Error(`Unsupported file type: ${fileType}`);
      }

      setExtractedText(text);
      return text;
    } catch (err) {
      setError(`Failed to extract text: ${err.message}`);
      return '';
    }
  };

  // Extract text from PDF using a hypothetical function
  // In real implementation, you would use a library like pdf.js
  const extractPDFText = async (pdfData) => {
    // This is a placeholder for PDF extraction
    // We'll use a mock implementation for now since we can't directly integrate pdf.js here
    return new Promise((resolve) => {
      // Simulate PDF text extraction
      setTimeout(() => {
        resolve("This is placeholder text extracted from the PDF. In a real implementation, the actual PDF content would be extracted here.");
      }, 1000);
    });
  };

  // Process the text with a hypothetical LLM to extract events
  const processWithLLM = async (text) => {
    if (!text) return null;
    
    setProcessingStep('Analyzing text with language model...');

    try {
      // This is where you would send the text to an actual LLM API
      // For now, we'll simulate the response with a mock function
      const events = await mockLLMProcessing(text);
      return events;
    } catch (err) {
      setError(`Failed to process with LLM: ${err.message}`);
      return null;
    }
  };

  // Mock LLM processing function
  const mockLLMProcessing = async (text) => {
    // This is a placeholder. In a real implementation, you would call an actual LLM API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate LLM processing with sample data
        resolve({
          classTimes: [
            { day: 'MWF', time: '10:00 AM - 11:15 AM', location: 'Science Building 101' },
            { day: 'TTH', time: '2:30 PM - 3:45 PM', location: 'Engineering Hall 305' }
          ],
          assignments: [
            { name: 'Homework 1', due: '2025-06-01', description: 'Problem set on chapters 1-3' },
            { name: 'Project Proposal', due: '2025-06-15', description: 'One-page outline of final project' },
            { name: 'Lab Report', due: '2025-06-30', description: 'Write-up of lab experiment results' }
          ],
          exams: [
            { name: 'Midterm 1', date: '2025-06-10', time: '10:00 AM - 12:00 PM', location: 'Main Hall 100' },
            { name: 'Midterm 2', date: '2025-07-08', time: '10:00 AM - 12:00 PM', location: 'Main Hall 100' },
            { name: 'Final Exam', date: '2025-08-05', time: '1:00 PM - 4:00 PM', location: 'University Arena' }
          ],
          officehours: [
            { day: 'Monday', time: '1:00 PM - 3:00 PM', location: 'Faculty Office 210' },
            { day: 'Thursday', time: '11:00 AM - 12:00 PM', location: 'Online via Zoom' }
          ]
        });
      }, 2000);
    });
  };

  // Handle the entire process
  const processFile = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Extract text from the file
      const text = await extractTextFromFile();
      if (!text) {
        setLoading(false);
        return;
      }
      
      // Process with LLM
      const events = await processWithLLM(text);
      setExtractedEvents(events);
      
      setProcessingStep('Complete!');
      setLoading(false);
    } catch (err) {
      setError(`Processing failed: ${err.message}`);
      setLoading(false);
    }
  };

  // Convert events to iCal format
  const generateICalendar = () => {
    if (!extractedEvents) return '';

    let icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Syllabus Parser//EN'
    ];

    // Process class times as recurring events
    extractedEvents.classTimes.forEach((classTime, index) => {
      // Parse the days
      const days = parseDays(classTime.day);
      
      // For each day, create a recurring event
      days.forEach(day => {
        const [startTime, endTime] = parseTimeRange(classTime.time);
        
        // Create a start date for this semester (would come from user input in real app)
        const startDate = new Date('2025-05-25'); // Example semester start
        
        // Adjust to the first occurrence of this day
        while (startDate.getDay() !== dayToNumber(day)) {
          startDate.setDate(startDate.getDate() + 1);
        }
        
        const dateStr = formatDate(startDate);
        const eventId = `class-${index}-${day}`;
        
        icalContent.push(
          'BEGIN:VEVENT',
          `UID:${eventId}`,
          `SUMMARY:Class - ${classTime.day}`,
          `LOCATION:${classTime.location}`,
          `DTSTART:${dateStr}T${formatTime(startTime)}`,
          `DTEND:${dateStr}T${formatTime(endTime)}`,
          'RRULE:FREQ=WEEKLY;COUNT=15', // Recurring for 15 weeks
          'END:VEVENT'
        );
      });
    });

    // Process assignments
    extractedEvents.assignments.forEach((assignment, index) => {
      const eventId = `assignment-${index}`;
      const dateStr = assignment.due.replace(/-/g, '');
      
      icalContent.push(
        'BEGIN:VEVENT',
        `UID:${eventId}`,
        `SUMMARY:Due: ${assignment.name}`,
        `DESCRIPTION:${assignment.description}`,
        `DTSTART:${dateStr}T235900`,
        `DTEND:${dateStr}T235900`,
        'END:VEVENT'
      );
    });

    // Process exams
    extractedEvents.exams.forEach((exam, index) => {
      const eventId = `exam-${index}`;
      const dateStr = exam.date.replace(/-/g, '');
      const [startTime, endTime] = parseTimeRange(exam.time);
      
      icalContent.push(
        'BEGIN:VEVENT',
        `UID:${eventId}`,
        `SUMMARY:${exam.name}`,
        `LOCATION:${exam.location}`,
        `DTSTART:${dateStr}T${formatTime(startTime)}`,
        `DTEND:${dateStr}T${formatTime(endTime)}`,
        'END:VEVENT'
      );
    });

    // Process office hours as recurring events
    extractedEvents.officehours.forEach((officeHour, index) => {
      const day = officeHour.day;
      const [startTime, endTime] = parseTimeRange(officeHour.time);
      
      // Create a start date for this semester
      const startDate = new Date('2025-05-25'); // Example semester start
      
      // Adjust to the first occurrence of this day
      while (startDate.getDay() !== dayNameToNumber(day)) {
        startDate.setDate(startDate.getDate() + 1);
      }
      
      const dateStr = formatDate(startDate);
      const eventId = `officehour-${index}`;
      
      icalContent.push(
        'BEGIN:VEVENT',
        `UID:${eventId}`,
        `SUMMARY:Office Hours`,
        `LOCATION:${officeHour.location}`,
        `DTSTART:${dateStr}T${formatTime(startTime)}`,
        `DTEND:${dateStr}T${formatTime(endTime)}`,
        'RRULE:FREQ=WEEKLY;COUNT=15', // Recurring for 15 weeks
        'END:VEVENT'
      );
    });

    icalContent.push('END:VCALENDAR');
    return icalContent.join('\r\n');
  };

  // Helper functions for iCal generation
  const parseDays = (dayString) => {
    // Parse day strings like "MWF" or "TTH"
    const mapping = {
      'M': 'Monday',
      'T': 'Tuesday',
      'W': 'Wednesday',
      'TH': 'Thursday',
      'F': 'Friday'
    };
    
    let days = [];
    if (dayString === 'MWF') {
      days = ['Monday', 'Wednesday', 'Friday'];
    } else if (dayString === 'TTH' || dayString === 'TR') {
      days = ['Tuesday', 'Thursday'];
    } else {
      // Try to parse other formats
      if (dayString.includes('M')) days.push('Monday');
      if (dayString.includes('T') && !dayString.includes('TH')) days.push('Tuesday');
      if (dayString.includes('W')) days.push('Wednesday');
      if (dayString.includes('TH')) days.push('Thursday');
      if (dayString.includes('F')) days.push('Friday');
    }
    
    return days;
  };

  const parseTimeRange = (timeString) => {
    // Parse time strings like "10:00 AM - 11:15 AM"
    const parts = timeString.split('-').map(part => part.trim());
    if (parts.length !== 2) return ['100000', '110000']; // Default if parsing fails
    
    try {
      const startTimeParts = parts[0].match(/(\d+)(?::(\d+))?\s*(AM|PM)?/i);
      const endTimeParts = parts[1].match(/(\d+)(?::(\d+))?\s*(AM|PM)?/i);
      
      if (!startTimeParts || !endTimeParts) return ['100000', '110000'];
      
      let startHour = parseInt(startTimeParts[1]);
      let startMinute = startTimeParts[2] ? parseInt(startTimeParts[2]) : 0;
      const startAmPm = startTimeParts[3] ? startTimeParts[3].toUpperCase() : null;
      
      let endHour = parseInt(endTimeParts[1]);
      let endMinute = endTimeParts[2] ? parseInt(endTimeParts[2]) : 0;
      const endAmPm = endTimeParts[3] ? endTimeParts[3].toUpperCase() : null;
      
      // Handle special cases like "noon"
      if (parts[0].toLowerCase().includes('noon')) {
        startHour = 12;
        startMinute = 0;
      }
      
      // Adjust for AM/PM
      if (startAmPm === 'PM' && startHour < 12) startHour += 12;
      if (startAmPm === 'AM' && startHour === 12) startHour = 0;
      if (endAmPm === 'PM' && endHour < 12) endHour += 12;
      if (endAmPm === 'AM' && endHour === 12) endHour = 0;
      
      const startTimeString = `${startHour.toString().padStart(2, '0')}${startMinute.toString().padStart(2, '0')}00`;
      const endTimeString = `${endHour.toString().padStart(2, '0')}${endMinute.toString().padStart(2, '0')}00`;
      
      return [startTimeString, endTimeString];
    } catch (e) {
      return ['100000', '110000']; // Default if parsing fails
    }
  };

  const dayToNumber = (day) => {
    const days = {
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6,
      'Sunday': 0
    };
    return days[day] || 0;
  };
  
  const dayNameToNumber = (dayName) => {
    const days = {
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6,
      'Sunday': 0
    };
    return days[dayName] || 0;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const formatTime = (timeString) => {
    // Already in format HHMMSS
    return timeString;
  };

  // Download the calendar file
  const downloadCalendar = () => {
    const icalContent = generateICalendar();
    const blob = new Blob([icalContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'syllabus_calendar.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download extracted events as JSON
  const downloadJson = () => {
    if (!extractedEvents) return;
    
    const json = JSON.stringify(extractedEvents, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'syllabus_events.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Syllabus Date Extractor</h1>
      
      {/* File upload section */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Step 1: Upload Syllabus</h2>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded">
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".pdf,.docx,.txt"
            className="hidden"
            id="file-upload"
          />
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Select File
          </label>
          <p className="mt-2 text-sm text-gray-600">Supports PDF, DOCX, and TXT files</p>
          {fileName && (
            <div className="mt-4 text-center">
              <p className="font-medium">Selected file:</p>
              <p className="text-blue-600">{fileName}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Processing section */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Step 2: Extract Important Dates</h2>
        <button
          onClick={processFile}
          disabled={!file || loading}
          className={`w-full py-2 rounded transition ${
            !file || loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {loading ? 'Processing...' : 'Extract Dates from Syllabus'}
        </button>
        
        {loading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{processingStep}</p>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
      
      {/* Results section */}
      {extractedEvents && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Step 3: Review Extracted Information</h2>
          
          {/* Class Times */}
          <div className="mb-4">
            <h3 className="font-medium text-blue-800 mb-2">Class Schedule</h3>
            <div className="bg-gray-50 p-3 rounded">
              {extractedEvents.classTimes.map((classTime, index) => (
                <div key={`class-${index}`} className="mb-2 last:mb-0">
                  <p>
                    <span className="font-medium">{classTime.day}:</span> {classTime.time}
                    {classTime.location && ` at ${classTime.location}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Assignments */}
          <div className="mb-4">
            <h3 className="font-medium text-blue-800 mb-2">Assignments</h3>
            <div className="bg-gray-50 p-3 rounded">
              {extractedEvents.assignments.map((assignment, index) => (
                <div key={`assignment-${index}`} className="mb-2 last:mb-0">
                  <p>
                    <span className="font-medium">{assignment.name}:</span> Due {new Date(assignment.due).toLocaleDateString()}
                    {assignment.description && ` - ${assignment.description}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Exams */}
          <div className="mb-4">
            <h3 className="font-medium text-blue-800 mb-2">Exams & Tests</h3>
            <div className="bg-gray-50 p-3 rounded">
              {extractedEvents.exams.map((exam, index) => (
                <div key={`exam-${index}`} className="mb-2 last:mb-0">
                  <p>
                    <span className="font-medium">{exam.name}:</span> {new Date(exam.date).toLocaleDateString()} at {exam.time}
                    {exam.location && ` in ${exam.location}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Office Hours */}
          <div className="mb-4">
            <h3 className="font-medium text-blue-800 mb-2">Office Hours</h3>
            <div className="bg-gray-50 p-3 rounded">
              {extractedEvents.officehours.map((officeHour, index) => (
                <div key={`office-${index}`} className="mb-2 last:mb-0">
                  <p>
                    <span className="font-medium">{officeHour.day}:</span> {officeHour.time}
                    {officeHour.location && ` at ${officeHour.location}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Download options */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <button
              onClick={downloadCalendar}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition flex items-center justify-center"
            >
              <span className="mr-2">Download iCalendar File</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={downloadJson}
              className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition flex items-center justify-center"
            >
              <span className="mr-2">Download JSON Data</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Extracted Text (Hidden by default) */}
      {extractedText && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <details>
            <summary className="text-lg font-semibold mb-2 cursor-pointer">Raw Extracted Text</summary>
            <div className="mt-2 p-3 bg-gray-50 rounded text-sm font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
              {extractedText}
            </div>
          </details>
        </div>
      )}
      
      {/* Help information */}
      <div className="mt-8 p-4 bg-blue-50 text-blue-700 rounded">
        <h3 className="font-semibold mb-2">How It Works</h3>
        <p className="text-sm">
          This tool extracts important dates and schedule information from your syllabus, including:
        </p>
        <ul className="list-disc list-inside text-sm mt-2">
          <li>Regular class meeting times (MWF, TTH, etc.)</li>
          <li>Assignment due dates</li>
          <li>Exams, midterms, and finals</li>
          <li>Office hours</li>
        </ul>
        <p className="text-sm mt-2">
          The extracted information can be downloaded as an iCalendar file (.ics) that works with 
          most calendar applications including Google Calendar, Apple Calendar, and Microsoft Outlook.
        </p>
      </div>
    </div>
  );
}