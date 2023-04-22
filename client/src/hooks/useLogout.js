import {httpLogout} from './requests';

function useLogout() {
    return async () => {
        const response = await httpLogout();
        const statusCode = response.status;

        if (statusCode === 200) {
            localStorage.removeItem('cpe-user-token');
            localStorage.removeItem('user-mail');
            localStorage.removeItem('executed');
            console.log(JSON.stringify({"logout": true}));
        } else {
            console.log(JSON.stringify({"logout": false}));
        }
    };
};

export default useLogout();