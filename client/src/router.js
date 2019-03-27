import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: () => import('@/views/form.vue'),
    }, {
      path: '/register',
      name: 'register',
      component: () => import('@/views/form.vue'),
    }, {
      path: '/all',
      name: 'all',
      component: () => import('@/views/allUser.vue'),
    },
    {
      path: '/ListComment/:QuestionId',
      name: 'ListComment',
      component: () => import('@/components/ListComment.vue'),
    },
    {
      path: '/addQuestion',
      name: 'addQuestion',
      component: () => import('@/views/addQuestion.vue'),
    }
  ],
});
