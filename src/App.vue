<template>
  <div id="app">
    <app-header></app-header>
    <!--  <app-navbar v-if="currentUser"></app-navbar> -->
    <div class="body">
      <br />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import header from "./components/Header.vue";
import navbar from "./components/Navbar.vue";
import firebase from "firebase";
import { mapState } from "vuex";
export default {
  components: {
    "app-header": header,
    "app-navbar": navbar
  },
  data() {
    return {
      currentUser: firebase.auth().currentUser
    }
  },
  computed: {
    ...mapState(['{currentUser: state => state.auth.currentUser}'])
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
