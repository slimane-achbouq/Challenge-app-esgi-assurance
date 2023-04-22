import { useCallback, useEffect, useState } from "react";

import { httpSignup } from './requests';

function useSignup() {
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const submitSignup = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const email = data.get("email");
        const password = data.get("password");
        const role = "ROLE_USER";
        const user_technologies = selectedTechnologies;

        const response = await httpSignup({
            firstName, lastName, email, password, role, user_technologies
        });

        if (response.ok) {
            setShowMessage(true);
            setTimeout(function(){setShowMessage(false)},5000);
        } else {
            console.log(JSON.stringify(response));
        }
    };

    const handleSelectChange = (selectedOptions) => {
        let selectedOptionsArray = selectedOptions.map((val, _) => {
            return {technology_id:val.value};
        });
        setSelectedTechnologies(selectedOptionsArray);
    };

    return {
        submitSignup,
        handleSelectChange,
        showMessage
    }
};

export default useSignup;