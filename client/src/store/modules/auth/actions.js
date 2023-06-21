import VueJwtDecode from 'vue-jwt-decode';

export default {
    async signin(context, payload) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password
                }),
            });

            if (!response.ok) {
                const error = new Error(response.message || 'Failed to authenticate. Check your login data.');
                throw error;
            }

            const responseData = await response.json();

            if(responseData.message == 'User profile is not activated !') return responseData;
            if(responseData.message == 'User does not exist !') return responseData;
            if(responseData.message == 'User profile is not activated !') return responseData;

            localStorage.setItem('esgi-ws-token', responseData.accessToken);

            const userInfos = VueJwtDecode.decode(responseData.accessToken);
            context.commit('setUser', {
                token: responseData.accessToken,
                refreshToken: responseData.refreshToken,
                firstname: userInfos.firstname,
                lastname: userInfos.lastname,
                email: userInfos.email,
                roles: userInfos.roles,
                id: userInfos.id
            });

            return responseData;
        } catch (ex) {
            const error = new Error(ex || 'Failed to authenticate. Check your login data.');
            throw error;
        }

    },
    tryLogin(context) {
        const token = localStorage.getItem('esgi-ws-token');
        if (token) {
            const userInfos = VueJwtDecode.decode(token);
            context.commit('setUser', {
                token: token,
                firstname: userInfos.firstname,
                lastname: userInfos.lastname,
                email: userInfos.email,
                roles: userInfos.roles,
                id: userInfos.id
            });
        }
    },
    async signUp(context, payload) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    email: payload.email,
                    adresse: payload.street,
                    city: payload.city,
                    codeCity: payload.postalCode,
                    phoneNumber: payload.phoneNumber,
                    password: payload.password,
                    age: payload.age,
                }),
            });

            if (!response.ok) {
                const error = new Error(response.message || 'Failed to register. Check your register data.');
                throw error;
            }
            return response;
        } catch (err) {
            const error = new Error(err || 'Failed to register. Check your register data.');
            throw error;
        }

    },
}