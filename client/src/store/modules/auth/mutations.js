export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.firstname = payload.firstname;
        state.lastname = payload.lastname;
        state.email = payload.email;
        state.roles = payload.roles;
        state.id = payload.id
    }
};