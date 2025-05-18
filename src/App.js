import { useState } from 'react';
import * as mammoth from 'mammoth';
import { Parser } from 'papaparse';

export default function SyllabusParser() {
  // Custom CSS styles - Add this at the top of your component
  const styles = {
    container: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4",
    card: "max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden",
    header: "bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center",
    headerTitle: "text-2xl font-bold text-white flex-1",
    headerIcon: "text-white h-8 w-8",
    body: "p-6",
    stepContainer: "mb-8 last:mb-0",
    stepHeader: "flex items-center mb-4",
    stepNumber: "flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold mr-3",
    stepTitle: "text-xl font-semibold text-gray-800",
    uploadContainer: "border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition",
    uploadButton: "bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-flex items-center",
    fileInfo: "mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center",
    button: {
      primary: "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center",
      secondary: "w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition flex items-center justify-center",
      disabled: "w-full bg-gray-200 text-gray-400 font-medium py-3 px-4 rounded-lg cursor-not-allowed",
    },
    resultCard: "bg-white rounded-lg shadow-md p-5 mb-5 border-l-4 border-blue-600",
    resultSection: "mb-6 last:mb-0",
    resultTitle: "text-lg font-semibold text-gray-800 mb-3 flex items-center",
    resultItem: "p-3 bg-gray-50 rounded-md mb-2 last:mb-0 border-l-2 border-blue-400",
    downloadButton: "flex-1 py-3 px-4 rounded-lg transition flex items-center justify-center text-white font-medium",
  };

  
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
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Syllabus Date Extractor</h1>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.headerIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <div className={styles.body}>
          {/* Step 1: Upload */}
          <div className={styles.stepContainer}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>1</span>
              <h2 className={styles.stepTitle}>Upload Your Syllabus</h2>
            </div>
            
            <div className={styles.uploadContainer}>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.docx,.txt"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className={styles.uploadButton}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                Choose File
              </label>
              <p className="mt-3 text-sm text-gray-500">PDF, DOCX, or TXT files accepted</p>
              
              {fileName && (
                <div className={styles.fileInfo}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-gray-700">{fileName}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Step 2: Process */}
          <div className={styles.stepContainer}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>2</span>
              <h2 className={styles.stepTitle}>Extract Important Dates</h2>
            </div>
            
            <button
              onClick={processFile}
              disabled={!file || loading}
              className={!file || loading ? styles.button.disabled : styles.button.primary}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Extract Dates from Syllabus
                </>
              )}
            </button>
            
            {loading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{processingStep}</p>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
          </div>
          
          {/* Step 3: Results (conditional rendering) */}
          {extractedEvents && (
            <div className={styles.stepContainer}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>3</span>
                <h2 className={styles.stepTitle}>Review Extracted Events</h2>
              </div>
              
              {/* Class Times */}
              <div className={styles.resultSection}>
                <h3 className={styles.resultTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Class Schedule
                </h3>
                
                {extractedEvents.classTimes.map((classTime, index) => (
                  <div key={`class-${index}`} className={styles.resultItem}>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{classTime.day}</span>
                        <p className="text-gray-600">{classTime.time} {classTime.location && `at ${classTime.location}`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Assignments */}
              <div className={styles.resultSection}>
                <h3 className={styles.resultTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Assignments
                </h3>
                
                {extractedEvents.assignments.map((assignment, index) => (
                  <div key={`assignment-${index}`} className={styles.resultItem}>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{assignment.name}</span>
                        <p className="text-gray-600">Due: {new Date(assignment.due).toLocaleDateString()}</p>
                        {assignment.description && <p className="text-gray-500 text-sm mt-1">{assignment.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Exams */}
              <div className={styles.resultSection}>
                <h3 className={styles.resultTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Exams & Tests
                </h3>
                
                {extractedEvents.exams.map((exam, index) => (
                  <div key={`exam-${index}`} className={styles.resultItem}>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{exam.name}</span>
                        <p className="text-gray-600">{new Date(exam.date).toLocaleDateString()} at {exam.time}</p>
                        {exam.location && <p className="text-gray-500 text-sm">{exam.location}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Office Hours */}
              <div className={styles.resultSection}>
                <h3 className={styles.resultTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Office Hours
                </h3>
                
                {extractedEvents.officehours.map((officeHour, index) => (
                  <div key={`office-${index}`} className={styles.resultItem}>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{officeHour.day}</span>
                        <p className="text-gray-600">{officeHour.time}</p>
                        {officeHour.location && <p className="text-gray-500 text-sm">{officeHour.location}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Download options */}
              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <button onClick={downloadCalendar} className={`${styles.downloadButton} bg-blue-600 hover:bg-blue-700`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Download iCalendar (.ics)
                </button>
                <button onClick={downloadJson} className={`${styles.downloadButton} bg-gray-700 hover:bg-gray-800`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download JSON Data
                </button>
              </div>
            </div>
          )}
          
          {/* Extracted Text (Hidden by default) */}
          {extractedText && (
            <details className="mt-6 p-4 bg-gray-50 rounded-lg">
              <summary className="font-medium text-gray-700 cursor-pointer">View Raw Extracted Text</summary>
              <div className="mt-3 p-3 bg-white rounded border border-gray-200 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                {extractedText}
              </div>
            </details>
          )}
          
          {/* Help/Information section */}
          <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        </div>
      </div>
    </div>
  );
}