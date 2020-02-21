<template>
  <section class="hero is-medium">
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link to="/">
            <a class="navbar-item">
              <h1 class="title">BTS</h1>
            </a>
            </router-link>
            <div class="navbar-burger burger" data-target="navbarMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
          </div>

          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">
              <span class="navbar-item" v-if="currentUser = false">
                <router-link to="/">
                  <a class="button is-inverted">Sign In</a>
                </router-link>
              </span>
              <span class="navbar-item" v-if="currentUser =  false"> 
                <router-link to="/register">
                  <a class="button is-inverted">Sign Up</a>
                </router-link>
              </span>
              <span class="navbar-item" v-if="currentUser">
                <a class="button is-inverted" @click="logout">Sign Out</a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">ARMY</h1>
        <h2 class="subtitle">World</h2>
        <p>{{this.currentUser}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
import firebase from 'firebase'
export default {
  state:{
    currentUser: firebase.auth().currentUser
  },
  computed: {
    ...mapState(['{currentUser: state => state.currentUser}'])
  },
  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push('/welcome');
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
};
</script>