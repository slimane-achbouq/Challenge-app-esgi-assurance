import React from "react";

import resetPasswordConfirmation from "../hooks/resetPasswordConfirmation.js";

import './inputResetPassword.css';


const InputResetPassword = () => {

    const { submitResetPasswordConfirmation, showMessage, messageStatus } = resetPasswordConfirmation();

    return (
        <div id="logreg-forms">
            <form className="form-signin" onSubmit={submitResetPasswordConfirmation}>
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
                    type="password"
                    name="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required=""
                />
                <input
                    type="password"
                    name="passwordConfirmation"
                    id="inputPasswordConfirmation"
                    className="form-control"
                    placeholder="Password confirmation"
                    required=""
                />
                <button className="btn btn-success btn-block" type="submit">
                    <i className="fas fa-sign-in-alt" /> Confirmation
                </button>
            </form>
            <br />
        </div>
    );
};

export default InputResetPassword;