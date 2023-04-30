import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import UserList from '@/views/UserList.vue';
import Analytics from "@/views/analytics/Analytics.vue";
import NewTag from "@/views/analytics/NewTag.vue";
import TagsList from "@/views/analytics/TagsList.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', redirect: '/login' },
      { path: '/login', name: 'login', component: LoginView, meta: { requiresUnauth: false } },
      { path: '/dashboard/users', name: 'users', component: UserList, meta: { requiresUnauth: false } },
      { path: '/analytics/dashboard', name: 'analytics_dashboard', component: Analytics, meta: { requiresUnauth: false } },
      { path: '/analytics/create-tag', name: 'analytics_new_tag', component: NewTag, meta: { requiresUnauth: false } },
      { path: '/analytics/my-tags', name: 'analytics_all_tags', component: TagsList, meta: { requiresUnauth: false } },
    ]
  })
  
  export default router