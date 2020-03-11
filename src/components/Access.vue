<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
            <p class="title is-4 has-text-centered">Password</p>
          <br />
          <form @submit.prevent="submit">
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input is-medium" type="password" name="name" v-model="password" />
              </div>
              <p class="help is-danger" v-if="!$v.password.required">Required</p>
            </div>
            <div class="field">
              <label class="label">New Password</label>
              <div class="control">
                <input class="input is-medium" type="password" name="email" v-model="newPassword" />
              </div>
              <p class="help is-danger" v-if="!$v.newPassword.required">Required</p>
            </div>
            <div class="control">
              <button
                type="submit"
                class="button has-text-weight-medium is-medium"
                :disabled="!$v.password.required || !$v.newPassword.required"
              >Save</button>
            </div>
          </form>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Vue from "vue";
import firebase from "firebase";
import Vuelidate from "vuelidate";
import {
  required,
  minLength,
  between,
  requiredIf
} from "vuelidate/lib/validators";
Vue.use(Vuelidate);
export default {
  data() {
    return {
      password: "",
      newPassword: "",
      user: firebase.auth().currentUser,
      check: false
    };
  },
  methods: {
    submit() {
        var credential = firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email,
        this.password
        );
        firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
        .then(data => {
            firebase.auth().currentUser.updatePassword(newPassword)
            .then(sucess =>{
                alert('Updated Password')
            })
            .catch(error =>{
                console.log(error)
            })
        })
        .catch(error => {
            alert('Invalid password')
        });
    },
  },
  validations: {
    password: { required },
    newPassword: { required }
  }
};
</script>

