import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import UserList from '@/views/UserList.vue';
import Analytics from "@/views/Analytics.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', redirect: '/login' },
      { path: '/login', name: 'login', component: LoginView, meta: { requiresUnauth: false } },
      { path: '/dashboard/users', name: 'users', component: UserList, meta: { requiresUnauth: false } },
      { path: '/analytics/dashboard', name: 'analytics_dashboard', component: Analytics, meta: { requiresUnauth: false } },
    ]
  })
  
  export default router