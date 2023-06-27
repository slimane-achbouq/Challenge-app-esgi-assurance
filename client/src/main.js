import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/router";
import store from "@/store/index.js";

import "./css/style.css";

const app = createApp(App);


const routes = ["/pagnotfound","/","/login","/register","/about","/contact","/services","/dashboard/users","/contact/messageList","/newquote","/step4","/quotes","/quote","/editquote","/newContract","/contracts","/contract","/verify","/reset-password-input","/resetPassword","/claims","/claim","/insurance","/verify","/profile","/user-profile/","/user-quotes","/payment","/user-contracts","/new-quote"]
const routesAdmin = ["/dashboard/users","/quotes","/contracts"]
const routesUser = ["/profile","/user-quotes","/user-contracts"]


router.beforeEach((to,from)=>{

    const token =store.state.auth.token
    if (!token){
        if (to.fullPath!="/login") router.push('login')
    }

    else {

        const role = store.state.auth.roles[0]

        if( !routes.includes(to.fullPath)){

             router.push('pagnotfound')

        } 

        else {

            if (to.fullPath=="/login" || to.fullPath=="/register" ) router.push('')

            else 
            if( routesAdmin.includes(to.fullPath) && role!="Admin") router.push('')
            else
            if( routesUser.includes(to.fullPath) && role!="User") router.push('users')
        }
        


        

        


    }
    return 
})

app.use(router);

app.use(store);

app.mount("#app");
