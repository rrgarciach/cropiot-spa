import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/wifi-setup',
    name: 'wifi-setup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WiFiSetup.vue'),
  },
  {
    path: '/mqtt-setup',
    name: 'mqtt-setup',
    component: () => import('../views/MQTTSetup.vue'),
  },
  {
    path: '/device-setup',
    name: 'device-setup',
    component: () => import('../views/DeviceSetup.vue'),
  },
  {
    path: '*',
    redirect: '/',
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
