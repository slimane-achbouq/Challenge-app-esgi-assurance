import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import UserList from '@/views/UserList.vue';
import Analytics from "@/views/analytics/Analytics.vue";
import NewTag from "@/views/analytics/NewTag.vue";
import TagsList from "@/views/analytics/TagsList.vue";
import AnalyticsRegister from "@/views/analytics/AnalyticsRegister.vue";
import AnalyticsLogin from "@/views/analytics/AnalyticsLogin.vue";
import AnalyticsLogout from "@/components/logout/AnalyticsLogout.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', redirect: '/login' },
      { path: '/login', name: 'login', component: LoginView, meta: { requiresUnauth: false } },
      { path: '/dashboard/users', name: 'users', component: UserList, meta: { requiresUnauth: false } },
      { path: '/analytics/dashboard', name: 'analytics_dashboard', component: Analytics, meta: { requiresUnauth: true } },
      { path: '/analytics/create-tag', name: 'analytics_new_tag', component: NewTag, meta: { requiresUnauth: true } },
      { path: '/analytics/my-tags', name: 'analytics_all_tags', component: TagsList, meta: { requiresUnauth: true } },
      { path: '/analytics/register', name: 'analytics_register', component: AnalyticsRegister, meta: { requiresUnauth: false } },
      { path: '/analytics/login', name: 'analytics_login', component: AnalyticsLogin, meta: { requiresUnauth: false } },
      { path: '/analytics/logout', name: 'analytics_logout', component: AnalyticsLogout, meta: { requiresUnauth: false } },
    ]
  })

  export default router