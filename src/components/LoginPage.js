import React from "react";
import "./HomePage.css";

import { FormBox } from "compositions"
import { TextLink } from "primitives"
import { ButtonGroup } from "primitives"
import { Button } from "primitives"
import { InputField } from "primitives"
const HomePage = ({ onNavigateToApp }) => {
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
                    <FormBox onSubmit={() => { }}>
                        <InputField
                            label="Login"
                            placeholder="Enter email"
                        />
                        <InputField
                            label="Password"
                            placeholder="Enter password"
                        />
                        <ButtonGroup align="justify">
                            <Button
                                onPress={() => { }}
                                variant="primary"
                            >
                                Sign In
                            </Button>
                        </ButtonGroup>
                        <TextLink href="#">
                            Forgot password?
                        </TextLink>
                    </FormBox>


                </div>

                <div className="orgoogle-section">
                    <ButtonGroup align="justify">
                        <Button
                            onPress={() => { }}
                            variant="primary"
                        >
                            Or sign in with Google
                            <div className="google-svg"></div>
                        </Button>
                    </ButtonGroup>
                    <p>
                        Don't have an account?
                    </p>
                    <TextLink href="#">
                        Sign up now!
                    </TextLink>
                </div>


            </div>
        </div>
    );
};