import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', redirect: '/login' },
      { path: '/login', name: 'login', component: LoginView, meta: { requiresUnauth: false } },
    ]
  })
  
  export default router