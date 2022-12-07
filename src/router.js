import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

const CoachesList = () => import('./pages/coaches/CoachesList.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const RequestsReceived = () => import('./pages/requests/RequestReceived.vue');
const NotFound = () => import('./pages/NotFound.vue');
const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
        // IMPORTANT: children routes must not have "/" in the beginning of their name
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
