import {BrowserRouter, Navigate} from "react-router-dom";
import React from "react";

const PrivateRouter = () => {
    return (
        <BrowserRouter>
            <Navigate to="/login"/>
        </BrowserRouter>
    );
}

export default PrivateRouter;
