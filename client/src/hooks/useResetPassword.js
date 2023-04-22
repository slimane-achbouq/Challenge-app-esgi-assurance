import { useState } from "react";

import { httpResetPassword } from "./requests";

function useResetPassword() {
    const [showMessage, setShowMessage] = useState('');
    const [messageStatus, setMessageStatus] = useState('');

    const submitResetPassword = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get("email");

        const response = await httpResetPassword({
            email
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
        submitResetPassword,
        showMessage,
        messageStatus
    }
}

export default useResetPassword;