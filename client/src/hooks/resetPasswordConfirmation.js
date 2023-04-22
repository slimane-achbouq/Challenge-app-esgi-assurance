import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { httpResetPasswordConfirmation } from "./requests";

function resetPasswordConfirmation() {
    const { token } = useParams();
    const [showMessage, setShowMessage] = useState('');
    const [messageStatus, setMessageStatus] = useState('');
    let navigate = useNavigate();

    const submitResetPasswordConfirmation = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const password = data.get("password");
        const passwordConfirmation = data.get("passwordConfirmation");

        if(password !== passwordConfirmation) {
            setMessageStatus('error');
            setShowMessage('Passwords do not match');
            return;
        }

        const response = await httpResetPasswordConfirmation({
            password,
            passwordConfirmation,
            token,
        });
        const statusCode = response.status;
        const body = await response.json();

        if (statusCode === 200) {
            setShowMessage(body.message);
            setMessageStatus('alert alert-success alert-dismissible');
            setTimeout(function(){
                setShowMessage(false),
                    setMessageStatus('')
            },5000);
            return navigate('/login');
        } else {
            setShowMessage(body.message);
            setMessageStatus('alert alert-danger alert-dismissible');
            setTimeout(function(){
                setShowMessage(false),
                    setMessageStatus('')
            },5000);
            console.log(JSON.stringify(body));
        }
    };

    return {
        submitResetPasswordConfirmation,
        showMessage,
        messageStatus
    }
}

export default resetPasswordConfirmation;