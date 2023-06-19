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
    roles(state) {
        console.log(state.roles)
        return state.roles[0] === 'Admin' ? 'Admin' : 'Client';
    },
    email(state){
        console.log(state.email)
        return state.email;
    },
    id(state){
        console.log(state.id)
        return state.id;
    }
};