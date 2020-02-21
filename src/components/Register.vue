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
          <div class="column is-two-third has-text-left">
            <form @submit.prevent="submit">
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input class="input is-medium" type="text" name="name" v-model="user.name" />
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input is-medium" type="text" name="email" v-model="user.email" />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    class="input is-medium"
                    type="password"
                    name="password"
                    v-model="user.password"
                  />
                </div>
              </div>
              <div class="control">
                <button
                  type="submit"
                  class="button is-success is-fullwidth has-text-weight-medium is-medium"
                >Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const fb = require('../firebaseConfig.js')
export default {
  data() {
    return {
      user:{
        name: '',
        email: '',
        password: '',
        id: null
      }
    };
  },
  methods: {
      submit(){
        firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          this.$store.commit('setCurrentUser', data)
          
          data.user.updateProfile({
            displayName: this.user.name
          })
          .then(()=>{this.$router.push({name: 'Home'})});
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  };
</script>