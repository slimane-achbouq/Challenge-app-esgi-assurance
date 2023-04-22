import React from "react";

import { useNavigate } from "react-router-dom";

import useResetPassword from "../hooks/useResetPassword";

import './resetPassword.css';


const ResetPassword = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

    const { submitResetPassword, showMessage, messageStatus } = useResetPassword();

    return (
        <div id="logreg-forms">
            <form className="form-signin" onSubmit={submitResetPassword}>
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
                    Reset Password
                </h1>
                <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    name="email"
                    placeholder="Email address"
                    required=""
                />
                <button className="btn btn-success btn-block" type="submit">
                    <i className="fas fa-sign-in-alt" /> Reset Password
                </button>
                <hr />
                <button onClick={navigateToLogin} className="btn btn-primary btn-block" type="button" id="btn-signup">
                    <i className="fas fa-user-plus" /> Sign in
                </button>
            </form>
            <br />
        </div>
    );
};

export default ResetPassword;