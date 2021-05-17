import Vue from 'vue';
import Router from 'vue-router';

const Assess = () => import('../views/Assess');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/assess'
    }, {
      path: '/assess',
      name: '首页',
      component: Assess
    }]
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name;
  }
  next();
});

export default router;
