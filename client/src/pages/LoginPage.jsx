import React from 'react';

import { useNavigate } from 'react-router-dom';

import useSigin from '../hooks/useSignin';

import './loginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup');
    };

    const navigateToResetPassword = () => {
        navigate('/reset-password');
    };

    const { submitSignin, showMessage, messageStatus } = useSigin();

    return (
        <div id="logreg-forms">
            <form className="form-signin" onSubmit={submitSignin}>
                { showMessage &&
                    <div className={messageStatus} role="alert">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        {showMessage}
                    </div>
                }
                <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
                    {" "}
                    Sign in
                </h1>
                <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    name="email"
                    placeholder="Email address"
                    required=""
                />
                <input
                    type="password"
                    name="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required=""
                />
                <button className="btn btn-success btn-block" type="submit">
                    <i className="fas fa-sign-in-alt" /> Sign in
                </button>
                <a href="/reset-password" id="forgot_pswd">
                    Forgot password?
                </a>
                <hr />
                {/* <p>Don't have an account!</p>  */}
                <button onClick={navigateToSignup} className="btn btn-primary btn-block" type="button" id="btn-signup">
                    <i className="fas fa-user-plus" /> Sign up New Account
                </button>
            </form>
            <br />
        </div>

    )
};

export default LoginPage;