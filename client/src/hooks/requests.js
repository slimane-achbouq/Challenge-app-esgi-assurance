const API_URL = 'http://localhost:8000';

async function httpGetLogs(logType, startDate, endDate) {
    return await fetch(`${API_URL}/logs`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'logType': logType, 'startDate': startDate, 'endDate': endDate})
    });
}

async function httpSignup(userData) {
    try {
        // console.log(JSON.stringify(userData));
        return await fetch(`${API_URL}/signup`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userData)
        });
    } catch (err) {
        return {
            ok: false,
        }
    }
}

async function httpLoginVerification(jwt, authLinkId) {
    try {
        return await fetch(`${API_URL}/signin-verification`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({'auth_link': authLinkId})
        });
    } catch (err) {
        console.error(err);
        return {
            ok: false,
        }
    }
}

async function httpGetUserInfo() {
    const jwt = localStorage.getItem('cpe-user-token');
    try {
        return await fetch(`${API_URL}/user-info`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            // body: JSON.stringify({'auth_link' : authLinkId})
        });
    } catch (err) {
        console.error(err);
        return {
            ok: false,
        }
    }
}

async function httpSignin(data) {
    try {
        return await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error(err);
        return {
            ok: false
        }
    }
}

async function httpLogout() {
    try {
        return await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'logout': true, 'email': localStorage.getItem('user-mail')})
        });
    } catch (err) {
        console.error(err);
        return {
            ok: false
        }
    }
}

async function httpResetPassword(data) {
    try {
        return await fetch(`${API_URL}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error(err);
        return {
            ok: false
        }
    }
}

async function httpResetPasswordConfirmation(data) {
    console.log(data);
    try {
        return await fetch(`${API_URL}/reset-password-confirmation`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error(err);
        return {
            ok: false
        }
    }
}

async function httpUpdateProfileInfos(infos) {
    const jwt = localStorage.getItem('cpe-user-token');
    try {
        return await fetch(`${API_URL}/update-infos`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            method: "POST",
            body: JSON.stringify(infos)
        });
    } catch (err) {
        return {
            ok: false,
        }
    }
}

export {
    httpSignup,
    httpLoginVerification,
    httpLogout,
    httpSignin,
    httpResetPassword,
    httpResetPasswordConfirmation,
    httpGetUserInfo,
    httpGetLogs,
}