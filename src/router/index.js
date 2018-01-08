import Vue from 'vue';
import Router from 'vue-router';

import Homepage from 'components/Homepage';
import Login from 'components/Login';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    }
  ]
});
