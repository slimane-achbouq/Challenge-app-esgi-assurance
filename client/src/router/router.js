import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import UserList from '@/views/UserList.vue';
import UserProfile from '@/views/UserProfile.vue';
import Register from '@/views/Register.vue';
import NewQuote from '@/views/NewQuote.vue';
import CreateInsurance from '@/views/CreateInsurance.vue';
import Dashboard from '@/views/Dashboard.vue';
import Quotes from '@/views/Quotes.vue';
import Quote from '@/views/Quote.vue';
import VerificationCompte from '@/views/VerificationCompte.vue';
import EditQuote from '@/views/EditQuote.vue';
import NewContract from '@/views/NewContract.vue';
import Contracts from '@/views/Contracts.vue';
import Contract from '@/views/Contract.vue';
import ResetPasswordInput from '@/views/reset-password/reset-password-view.vue';
import ResetPasswordView from '@/views/reset-password/reset-password.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', redirect: '/login' },
      { path: '/login', name: 'login', component: LoginView, meta: { requiresUnauth: false } },
      { path: '/register', name: 'register', component: Register, meta: { requiresUnauth: false } },
      { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresUnauth: false } },
      { path: '/dashboard/users', name: 'users', component: UserList, meta: { requiresUnauth: false } },
      { path: '/userprofile/:id', name: 'user-profile', component: UserProfile, meta: { requiresUnauth: false }},
      { path: '/newquote', name: 'user-profile', component: NewQuote, meta: { requiresUnauth: false }},
      { path: '/step4', name: 'step3', component: CreateInsurance, meta: { requiresUnauth: false }},
      { path: '/quotes', name: 'quotes', component: Quotes, meta: { requiresUnauth: false }},
      { path: '/quote/:id', name: 'quote', component: Quote, meta: { requiresUnauth: false }},
      { path: '/editquote/:id', name: 'editquote', component: EditQuote, meta: { requiresUnauth: false }},
      { path: '/newContract/:id', name: 'newcontract', component: NewContract, meta: { requiresUnauth: false }},
      { path: '/contracts', name: 'contracts', component: Contracts, meta: { requiresUnauth: false }},
      { path: '/contract/:id', name: 'contract', component: Contract, meta: { requiresUnauth: false }},
      { path: '/verify/:token', contract: 'verify', component: VerificationCompte, meta: { requiresUnauth: false }},
      { path: '/reset-password-input', contract: 'ResetPasswordInput', component: ResetPasswordInput, meta: { requiresUnauth: false }},
      { path: '/resetPassword/:token', contract: 'resetPassword', component: ResetPasswordView, meta: { requiresUnauth: false }},

    ]
  })
  
  export default router