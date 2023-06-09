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
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
                throw error;
            }

            localStorage.setItem('esgi-ws-token', responseData.tokens['accessToken']);

            // const userInfos = VueJwtDecode.decode(responseData.tokens[0]);
            // const userInfos = VueJwtDecode.decode(responseData.tokens['accessToken']);
            // console.log(userInfos);
            // context.commit('setUser', {
            //     token: responseData.tokens['accessToken'],
            //     refreshToken: responseData.tokens['refreshToken'],
            //     firstname: responseData.user['firstname'],
            //     lastname: responseData.user['lastname'],
            //     email: responseData.user['email'],
            //     roles: responseData.user['role'],
            //     id: responseData.user['_id']
            // });
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
                    adresse: payload.adresse,
                    city: payload.city,
                    phoneNumber: payload.phoneNumber,
                    age: payload.age,
                    password: payload.password,
                    codeCity: payload.codeCity
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to register. Check your register data.');
                throw error;
            }
            return responseData;
        } catch (ex) {
            const error = new Error(ex || 'Failed to register. Check your register data.');
            throw error;
        }

    },
}