import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";
import UserList from "@/views/UserList.vue";
import Register from "@/views/Register.vue";
import NewQuote from "@/views/NewQuote.vue";
import CreateInsurance from "@/views/CreateInsurance.vue";
import Dashboard from "@/views/Dashboard.vue";
import Quotes from "@/views/Quotes.vue";
import Quote from "@/views/Quote.vue";
import VerificationCompte from "@/views/VerificationCompte.vue";
import EditQuote from "@/views/EditQuote.vue";
import NewContract from "@/views/NewContract.vue";
import Contracts from "@/views/Contracts.vue";
import Contract from "@/views/Contract.vue";
import ResetPasswordInput from "@/views/reset-password/reset-password-view.vue";
import ResetPasswordView from "@/views/reset-password/reset-password.vue";
import Claim from "@/views/Claim.vue";
import DecideClaim from "@/views/DecideClaim.vue";
import Profile from "@/views/Account.vue";
import Claims from "@/views/Claims.vue";
import NewClaim from "@/views/NewClaim.vue";
import UserProfile from "@/views/User-profile.vue";
import UserQuotes from "@/views/UserQuotes.vue";
import Home from "@/views/home/HomeView.vue";
import About from "@/views/home/AboutUs.vue";
import Contact from "@/views/home/ContactUs.vue";
import Services from "@/views/home/HomeServices.vue";
import MessageList from "@/views/Contact/MessageList.vue";
import PlansPanel from "@/views/PlansPanel.vue";
import PaymentSuccess from "@/components/PaymentSuccess.vue";
import PaymentFailed from "@/components/PaymentFailed.vue";
import UserContracts from "@/views/UserContracts.vue";
import Paiments from "../partials/settings/BillingPanel.vue";
import NewQuoteNotConnected from "@/views/NewQuoteNotConnected.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import TagsList from "@/views/analytics/TagsList.vue";
import NewTag from "@/views/analytics/NewTag.vue";
import Analytics from "@/views/analytics/Analytics.vue";
import AnalyticsRegister from "@/views/analytics/AnalyticsRegister.vue";
import AnalyticsLogin from "@/views/analytics/AnalyticsLogin.vue";
import AnalyticsLogout from "@/components/logout/AnalyticsLogout.vue";
import GettingStarted from "@/views/analytics/GettingStarted.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {requiresUnauth: false},
        },
        {
            path: "/about",
            name: "about",
            component: About,
            meta: {requiresUnauth: false},
        },
        {
            path: "/contact",
            name: "contact",
            component: Contact,
            meta: {requiresUnauth: false},
        },
        {
            path: "/services",
            name: "services",
            component: Services,
            meta: {requiresUnauth: false},
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta: {requiresUnauth: false},
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {requiresUnauth: false},
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
            meta: {requiresUnauth: false},
        },
        {
            path: "/dashboard/users",
            name: "users",
            component: UserList,
            meta: {requiresUnauth: false},
        },
        {
            path: "/contact/messageList",
            name: "messageList",
            component: MessageList,
            meta: {requiresUnauth: false},
        },
        {
            path: "/newquote",
            name: "newquote",
            component: NewQuote,
            meta: {requiresUnauth: false},
        },
        {
            path: "/step4",
            name: "step3",
            component: CreateInsurance,
            meta: {requiresUnauth: false},
        },
        {
            path: "/quotes",
            name: "quotes",
            component: Quotes,
            meta: {requiresUnauth: false},
        },
        {
            path: "/quote/:id",
            name: "quote",
            component: Quote,
            meta: {requiresUnauth: false},
        },
        {
            path: "/editquote/:id",
            name: "editquote",
            component: EditQuote,
            meta: {requiresUnauth: false},
        },
        {
            path: "/newContract/:id",
            name: "newcontract",
            component: NewContract,
            meta: {requiresUnauth: false},
        },
        {
            path: "/contracts",
            name: "contracts",
            component: Contracts,
            meta: {requiresUnauth: false},
        },
        {
            path: "/contract/:id",
            name: "contract",
            component: Contract,
            meta: {requiresUnauth: false},
        },
        {
            path: "/verify/:token",
            contract: "verify",
            component: VerificationCompte,
            meta: {requiresUnauth: false},
        },
        {
            path: "/reset-password-input",
            contract: "ResetPasswordInput",
            component: ResetPasswordInput,
            meta: {requiresUnauth: false},
        },
        {
            path: "/resetPassword/:token",
            contract: "resetPassword",
            component: ResetPasswordView,
            meta: {requiresUnauth: false},
        },
        {
            path: "/claims",
            name: "claims",
            component: Claims,
            meta: {requiresUnauth: false},
        },
        {
            path: "/claim/:id",
            name: "claim",
            component: Claim,
            meta: {requiresUnauth: false},
        },
        {
            path: "/claim/decision/:id",
            name: "decide_claim",
            component: DecideClaim,
            meta: {requiresUnauth: false},
        },
        {
            path: "/claims/new/:insurance_id",
            name: "new_claim",
            component: NewClaim,
            meta: {requiresUnauth: false},
        },
        {
            path: "/insurance/:insurance_id",
            name: "getContract",
            meta: {requiresUnauth: false},
        },
        {
            path: "/verify/:token",
            name: "verify",
            component: VerificationCompte,
            meta: {requiresUnauth: false},
        },
        {
            path: "/reset-password-input",
            name: "ResetPasswordInput",
            component: ResetPasswordInput,
            meta: {requiresUnauth: false},
        },
        {
            path: "/resetPassword/:token",
            name: "resetPassword",
            component: ResetPasswordView,
            meta: {requiresUnauth: false},
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            meta: {requiresUnauth: false},
        },
        {
            path: "/user-profile/:id",
            name: "user-profile",
            component: UserProfile,
            meta: {requiresUnauth: false},
        },
        {
            path: "/user-quotes",
            name: "user_quotes",
            component: UserQuotes,
            meta: {requiresUnauth: false},
        },
        {
            path: "/payment/:insurance_id",
            name: "new_payment",
            component: PlansPanel,
            meta: {requiresUnauth: false},
        },
        {
            path: "/payment/success/:token/:id/:price",
            name: "payment_success",
            component: PaymentSuccess,
            meta: {requiresUnauth: false},
        },
        {
            path: "/payment/failed",
            name: "payment_failed",
            component: PaymentFailed,
            meta: {requiresUnauth: false},
        },
        {
            path: "/user-contracts",
            name: "user-contracts",
            component: UserContracts,
            meta: {requiresUnauth: false},
        },
        {
            path: "/settings/paiments",
            name: "paiments",
            component: Paiments,
            meta: {requiresUnauth: false},
        },
        {
            path: "/new-quote",
            name: "new-quote",
            component: NewQuoteNotConnected,
            meta: {requiresUnauth: false},
        },
        {path: '/pagnotfound', name: 'pagnotfound', component: PageNotFound, meta: {requiresUnauth: false}},
        {path: '/login', name: 'login', component: LoginView, meta: {requiresUnauth: false}},
        {path: '/dashboard/users', name: 'users', component: UserList, meta: {requiresUnauth: false}},
        {path: '/analytics/dashboard', name: 'analytics_dashboard', component: Analytics, meta: {requiresUnauth: true}},
        {path: '/analytics/create-tag', name: 'analytics_new_tag', component: NewTag, meta: {requiresUnauth: true}},
        {path: '/analytics/my-tags', name: 'analytics_all_tags', component: TagsList, meta: {requiresUnauth: true}},
        {
            path: '/analytics/register',
            name: 'analytics_register',
            component: AnalyticsRegister,
            meta: {requiresUnauth: false}
        },
        {path: '/analytics/login', name: 'analytics_login', component: AnalyticsLogin, meta: {requiresUnauth: false}},
        {
            path: '/analytics/logout',
            name: 'analytics_logout',
            component: AnalyticsLogout,
            meta: {requiresUnauth: false}
        },
        {
            path: '/analytics/getting-started',
            name: 'analytics_getting_started',
            component: GettingStarted,
            meta: {requiresUnauth: false}
        },
    ],
});

export default router;