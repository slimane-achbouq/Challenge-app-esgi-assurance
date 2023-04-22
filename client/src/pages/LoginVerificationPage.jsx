import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { httpLoginVerification } from '../hooks/requests';

const LoginVerificationPage = () => {
    const {jwt, id} = useParams();
    const [responseStatus, setResponseStatus] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        async function urlVerification() {
            const response = await httpLoginVerification(jwt, id);
            if (response.status === 200) {
                setResponseStatus(true)
            }
        }
        urlVerification().catch(console.error);
    }, []);

    if (responseStatus) {
        localStorage.setItem('cpe-user-token', jwt);
        return navigate('/profile');
    } else {
        localStorage.removeItem('cpe-user-token');
        return navigate('/login');
    }
}

export default LoginVerificationPage;