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
      { path: '/quote', contract: 'quote', component: Quote, meta: { requiresUnauth: false }},
    ]
  })
  
  export default router