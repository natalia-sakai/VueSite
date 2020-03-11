<template>
  <div id="app">
    <app-header v-if="!currentUser"></app-header>
    <app-navbar v-if="currentUser"></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import header from "./components/Header.vue";
import navbar from "./components/Navbar.vue";
import firebase from "firebase";
import { mapState } from "vuex";
const fb = require('./firebaseConfig.js')
export default {
  components: {
    "app-header": header,
    "app-navbar": navbar
  },
  data() {
    return {
      currentUser: false
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.currentUser = true;
      }
    })
  }
};
</script>
<style>
.hero.is-fullheight {
  min-height: 50vh !important;
}

.body {
  background-color: #dcdcdc;
}
</style>
