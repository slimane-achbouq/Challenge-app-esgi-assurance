import React from 'react';

import { useNavigate } from 'react-router-dom';
// import { SignupMultiSelect } from '../components/user/sign-up-multiselect';

import useSignup from '../hooks/useSignup';

import './signUp.css';

const Signup = () => {
    const { submitSignup, handleSelectChange, showMessage } = useSignup();

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div id="logreg-forms">
            <form className="form-signin" onSubmit={submitSignup}>
                { showMessage &&
                    <div className="alert alert-success alert-dismissible" role="alert">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <strong>Congratulations!</strong> Your account has been created !
                    </div>
                }
                <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
                    Sign up
                </h1>
                <input
                    type="firstName"
                    id="inputFirstName"
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                    required=""
                    autoFocus=""
                />
                <input
                    type="lastName"
                    id="inputFirstName"
                    name="lastName"
                    className="form-control"
                    placeholder="Last name"
                    required=""
                    autoFocus=""
                />
                {/*<SignupMultiSelect handleChange={handleSelectChange}/>*/}
                <input
                    type="email"
                    id="inputEmail"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    required=""
                    autoFocus=""
                />
                <input
                    type="password"
                    id="inputPassword"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required=""
                />
                <hr />
                <button className="btn btn-success btn-block" type="submit" id="btn-signup">
                    <i className="fas fa-user-plus" /> Sign up New Account
                </button>
                <hr />
                <button className="btn btn-primary btn-block" onClick={navigateToLogin} id="btn-signup">
                    <i className="fas fa-user-plus" /> Sign in
                </button>
            </form>
            <br />
        </div>

    )
};

export default Signup;