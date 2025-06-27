import React, { useState } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import ProcessingStatus from "./components/ProcessingStatus";
import Downloads from "./components/Downloads";
import HelpInfo from "./components/HelpInfo";
import ResultsDisplayContainer from "./components/ResultsDisplay";

function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState("home");

  // Your state for file, loading, processing step, extracted events, etc.
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [extractedEvents, setExtractedEvents] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  const processFile = async () => {
    // Your file processing logic here...
    // Then set the extracted events from the processed result.
  };

  const downloadCalendar = () => {
    // Your iCalendar generation and download method here...
  };

  const downloadJson = () => {
    // Your JSON download method here...
  };

  const navigateToApp = () => {
    setCurrentPage("app");
  };

  const navigateToHome = () => {
    setCurrentPage("home");
  };

  if (currentPage === "home") {
    return <HomePage onNavigateToApp={navigateToApp} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <Header title="Syllabus Date Extractor" />
        <div className="p-6">
          <button
            onClick={navigateToHome}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            ← Back to Home
          </button>
          <FileUpload fileName={fileName} handleFileUpload={handleFileUpload} />
          <ProcessingStatus
            loading={loading}
            processingStep={processingStep}
            processFile={processFile}
            fileExists={!!file}
          />
          {extractedEvents && (
            <ResultsDisplayContainer extractedEvents={extractedEvents} />
          )}
          <Downloads
            downloadCalendar={downloadCalendar}
            downloadJson={downloadJson}
          />
          <HelpInfo />
        </div>
      </div>
    </div>
  );
}

export default App;
