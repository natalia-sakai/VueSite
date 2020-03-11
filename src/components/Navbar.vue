<template>
    <div class="hero-foot">
      <br>
      <!-- NAV HEAD -->
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
                  <a class="navbar-item" href="/home">Home</a>
                  <a class="navbar-item" href="/bts">BTS</a>
                  <a class="navbar-item" href="/profile">Profile</a>
                  <a class="navbar-item" href="/timeline">Timeline</a>
                  <a class="navbar-item" href="/about">About</a>
                  <a class="navbar-item" href="/tour">Tour</a>
                  <a class="navbar-item" href="/youtube">Youtube</a>
                  <a class="navbar-item" href="/allalbums">Albums</a>
                  <a class="navbar-item" @click="logout">Sign Out</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!-- END NAV HEAD -->
      <hr>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
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
  }
}
</script>
<style>
.navbar-menu.is-active {
  text-align: center;
}
.hero-foot{
  background-color: white;
}
</style>
