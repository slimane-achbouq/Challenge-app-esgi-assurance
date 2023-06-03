export default {
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token;
    },
    fullName(state) {
        return state.firstname + ' ' + state.lastname;
    },
    role(state) {
        return state.roles[0] === 'ROLE_ADMIN' ? 'Admin' : 'Client';
    },
    email(state){
        return state.email;
    }
};