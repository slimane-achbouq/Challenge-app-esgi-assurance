import React, {useState, useEffect} from 'react';

import {Navigate, useNavigate, useParams} from 'react-router-dom';

const Logout = () => {
    let navigate = useNavigate();

    localStorage.removeItem('cpe-user-token');
    localStorage.removeItem('user-mail');
    localStorage.removeItem('executed');
    console.log("Disconnected !");
    return (<Navigate to="/login" />)
}

export default Logout;