import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import moment from 'moment'
import firebase from 'firebase'

import Welcome from '@/components/Welcome'
import Register from '@/components/Register'
import Home from '@/components/Home'
import About from '@/components/About'
import forgotPassword from '@/components/forgotPassword'

// Use packages
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(moment);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/welcome'
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: forgotPassword
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/welcome')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router