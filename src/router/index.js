import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import moment from 'moment'
import firebase from 'firebase'

import Welcome from '@/components/Welcome'
import Register from '@/components/Register'
import Home from '@/components/Home'
import forgotPassword from '@/components/forgotPassword'
import Account from '@/components/Account'
import Access from '@/components/Access'
import Profile from '@/components/Profile'
import BTS from '@/components/BTS'
import Timeline from '@/components/Timeline'
import About from '@/components/About'
import Tour from '@/components/Tour'
import Youtube from '@/components/Youtube'
import Album from '@/components/Album'
import AllAlbums from '@/components/AllAlbums'
// Use packages
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(moment);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      beforeEnter(to, from, next){
        firebase.auth().onAuthStateChanged(user => {
          if(user)
            next('/home')
          else
            next('/welcome')
        })
      }
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
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/access',
      name: 'Access',
      component: Access,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bts',
      name: 'BTS',
      component: BTS,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: Timeline,
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
    {
      path: '/tour',
      name: 'Tour',
      component: Tour,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/youtube',
      name: 'Youtube',
      component: Youtube,
      meta: {

        requiresAuth: true
      }
    },
    {
      path: '/album/:albumID',
      name: 'Album',
      props: true,
      component: Album,
      meta: {

        requiresAuth: true
      }
    },
    {
      path: '/allalbums',
      name: 'AllAlbums',
      props: true,
      component: AllAlbums,
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
