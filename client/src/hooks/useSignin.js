import { useCallback, useEffect, useState } from "react";

import { httpSignin } from './requests';

function useSignin() {
    const [showMessage, setShowMessage] = useState('');
    const [messageStatus, setMessageStatus] = useState('');

    const submitSignin = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get("email");
        const password = data.get("password");

        const response = await httpSignin({
            email, password
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
            // console.log(JSON.stringify(body));
        }
    };

    return {
        submitSignin,
        showMessage,
        messageStatus
    }
};

export default useSignin;