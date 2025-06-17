import React from "react";
import "./HomePage.css";

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
            <div className="login-button">Login</div>
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
              <img
                src="/api/placeholder/19/19"
                alt="Arrow"
                className="arrow-icon"
              />
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
