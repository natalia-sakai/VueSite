<template>
  <section class="hero is-medium">
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link to="/bts">
            <a class="navbar-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Bts_logo.png" alt="Logo">
            </a>
            </router-link>
            <div class="navbar-burger burger" data-target="navbarMenu" aria-expanded="false" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
                <span></span>
                <span></span>
                <span></span>
            </div>
          </div>

          <div id="navbarMenu" class="navbar-menu" :class="{ 'is-active': showNav }">
            <div class="navbar-end">
              <a class="navbar-item" href="/">Sign In</a>
              <a class="navbar-item" href="/register">Sign Up</a>
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
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'


export default {
  data() {
    return {
      currentUser:false,
      showNav: false
    }
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
    },
    menu(){

    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.currentUser = true;
      }
    })
  },
};
</script>

<style>
.navbar-menu.is-active {
  text-align: center;
}
.hero.is-medium .hero-body {
    padding-bottom: 5rem;
    padding-top: 5rem;
}
</style>
