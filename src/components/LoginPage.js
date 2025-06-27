import React from "react";
import "./HomePage.css";

import React from "react";
import "./HomePage.css";

// Remove these problematic imports:
// import { FormBox } from './compositions';
// import { Button, ButtonGroup, InputField, TextLink } from './primitives';

const LoginPage = ({ onNavigateToApp }) => {
    return (
        <div className="loginpage">
            <div className="loginpage-content">
                <div className="welcome-section">
                    <div className="welcome-text">
                        Good to see you again!  👋
                    </div>
                    <div className="icon">

                    </div>
                </div>

                <div className="login-section">
                    
                    <form onSubmit={(e) => e.preventDefault()}>
                        
                        <div className="input-group">
                            <label htmlFor="email">Login</label>
                            <input 
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                className="input-field"
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                className="input-field"
                            />
                        </div>
                        
                        
                        <div className="button-group">
                            <button 
                                type="submit"
                                className="btn btn-primary"
                                onClick={() => {}}
                            >
                                Sign In
                            </button>
                        </div>
                        
                        
                        <a
                            href="#"
                            className="text-link"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigateToApp('forgot-password');
                            }}
                        >
                            Forgot password?
                        </a>
                    </form>
                </div>

                <div className="orgoogle-section">
                    
                    <div className="button-group">
                        <button 
                            className="btn btn-primary btn-google"
                            onClick={() => {}}
                        >
                            Or sign in with Google
                            <div className="google-svg"></div>
                        </button>
                    </div>
                    
                    <p>
                        Don't have an account?
                    </p>
                    
                    
                    <a href="#" className="text-link">
                        Sign up now!
                    </a>
                </div>
            </div>
        </div>
    );
};

// Fix the export name to match the component name
export default LoginPage;