<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-8 is-variable">
          <div class="column is-one-thirds has-text-left">
            <h1 class="title is-1">Contact Us</h1>
            <p class="is-size-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eligendi soluta
              voluptate facere molestiae consequatur.
            </p>
          </div>
          <div class="column is-one-third has-text-left">
            <br>
            <p class="title is-5 has-text-centered">Sign In With Social Media</p>
            <p></p>
            <div class="field">
              <div class="control">
                <button class="button is-link is-fullwidth has-text-weight-medium is-medium" @click="facebook">
                  <span class="icon">
                    <i class="fab fa-facebook-f"></i>
                  </span>
                  <span>Facebook</span>
                </button>
              </div>
            </div>
            
            <div class="field">
              <div class="control">
                <button class="button is-info is-fullwidth has-text-weight-medium is-medium" @click="twitter">
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span>
                <span>Twitter</span>
                </button>
              </div>
            </div>
            
            <div class="field">
              <div class="control">
                <button class="button is-danger is-fullwidth has-text-weight-medium is-medium" @click="google">
                <span class="icon">
                  <i class="fab fa-google-plus-g"></i>
                </span>
                <span>Google+</span>
                </button>
              </div>
            </div>
          </div>

          <div class="column is-one-third has-text-left">
            <br>
            <p class="title is-5 has-text-centered">Sign In</p>
            <p></p>
            <form @submit.prevent="submit">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input is-medium" type="text" name="name" v-model="user.email" />
                </div>
                <p class="help is-danger" v-if="!$v.user.email.required">Required</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input is-medium" type="password" name="password" v-model="user.password"/>
                </div>
                <p class="help is-danger" v-if="!$v.user.password.required">Required</p>
                <router-link to="/forgot">
                  <p class="help is-danger">Forgot password?</p>
                </router-link>
              </div>
              <div class="control">
                <button
                  type="submit"
                  class="button is-success is-fullwidth has-text-weight-medium is-medium"
                  :disabled="!$v.user.email.required || !$v.user.password.required"
                  >Sign In</button>
              </div>
            </form>
            <br />
            <h3>If You don't have an account create one here</h3>
            <div class="control">
              <router-link to="/register">
                <button 
                class="button is-link is-fullwidth has-text-weight-medium is-medium"
                >Sign Up</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Register from "./Register.vue";
import Home from "./Home.vue";
import Vue from "vue";
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import firebase from 'firebase'
import { required, minLength, between } from 'vuelidate/lib/validators'
Vue.use(Vuex);
Vue.use(Vuelidate);
export default {
  name: "Welcome",
  data() {
    return {
      user: {
        email: "",
        password: "",
      }
    };
  },
  methods: {
    submit() {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          this.$router.push('/home');
        })
        .catch(error => {
          alert(error.message);
        });
    },
    facebook(){
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        this.$router.push('/home');
      })
      .catch(error => {
        console.log(error);
      });
    },
    twitter(){
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        this.$router.push('/home');
      })
      .catch(error => {
        console.log(error);
      });
    },
    google(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
      })
      .catch(error => {
        console.log(error);
      })
      .finally(()=> {
        this.$router.push('/home');
      })
    }
  },
  validations:{
    user:{
      email: {required},
      password: {required},
    }
  }
};
</script>
