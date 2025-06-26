import React from "react";
import "./HomePage.css";
import { ChevronRight } from "lucide-react";
const HomePage = ({ onNavigateToApp }) => {
  return (
    <div className="homepage">
      <div className="homepage-header">
        <div className="header-container">
          <div className="brand-section">
            <img
              src="/api/placeholder/55/55"
              alt="Syllabus Extractor Logo"
              className="brand-logo"
            />
            <div className="brand-name">Syllabus Extractor</div>
          </div>
          <div className="nav-section">
            <div className="nav-link">About</div>
            <div className="nav-link upload-link" onClick={onNavigateToApp}>
              Upload
            </div>
            <div className="nav-link">Contact</div>
          </div>
          <div className="auth-section">
            <div
              className="login-button"
              onClick={onNavigateToLogin}
              style={{ cursor: "pointer" }}
            >
              Login
            </div>
            <div className="signup-button">Sign up</div>
          </div>
        </div>
        <div className="header-divider" />
      </div>

      <div className="homepage-content">
        <div className="hero-section">
          <h1 className="hero-title">
            Syllabus Extractor is a tool for transforming syllabi into clean,
            personalized academic calendars.
          </h1>
          <h2 className="hero-subtitle">
            Effortlessly turn your syllabi into organized calendars -{" "}
            <span className="highlight-text">all in one place.</span>
          </h2>
          <div className="cta-buttons">
            <button className="get-started-button" onClick={onNavigateToApp}>
              <span className="button-text">Get</span>{" "}
              <span className="button-text">Started</span>
            </button>
            <button className="learn-more-button">
              <span className="learn-more-text">Learn More</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="var(--color-text-quaternary)"
                role="img"
                focusable="false"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                style={{ "--icon-color": "var(--color-text-quaternary)" }}
              >
                <path d="M5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L10.5303 8.53033C10.8207 8.23999 10.8236 7.77014 10.5368 7.47624L6.63419 3.47624C6.34492 3.17976 5.87009 3.17391 5.57361 3.46318C5.27713 3.75244 5.27128 4.22728 5.56054 4.52376L8.94583 7.99351L5.46967 11.4697Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="features-section">
          <div className="features-container">
            <div className="feature-content">
              <div className="content-wrapper">
                <h3 className="feature-heading">How it works</h3>
                <p className="feature-text">
                  Using advanced language processing techniques, our tool
                  intelligently analyzes your course syllabus to extract and
                  organize critical academic information — all in seconds.
                  Simply upload your syllabus, and we'll take care of the rest.
                </p>
                <div className="feature-spacer" />
              </div>
            </div>
            <div className="feature-image">
              <div className="image-placeholder" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default HomePage;
