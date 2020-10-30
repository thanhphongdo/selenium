import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import('../views/Project'),
  },
  {
    path: '/project/:projectId',
    name: 'ProjectDetail',
    component: () => import('../views/ProjectDetail'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact'),
  },
  {
    path: '/blank',
    name: 'Blank',
    component: () => import('../views/Blank.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
