<template>
    <div class="box">
        <article class="media">
        <div class="media-content">
            <div class="content">
                <p class="title is-4 has-text-centered">Account</p>
                <br>
                <form @submit.prevent="submit">
                <div class="field">
                    <label class="label">Username</label>
                    <div class="control">
                    <input class="input is-medium" type="text" name="name" v-model="user.displayName" />
                    </div>
                    <p class="help is-danger" v-if="!$v.user.displayName.required">Required</p>
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                    <input class="input is-medium" type="text" name="email" v-model="user.email" />
                    </div>
                    <p class="help is-danger" v-if="!$v.user.email.required">Required</p>
                </div>
                <div class="control">
                    <button
                    type="submit"
                    class="button has-text-weight-medium is-medium"
                    :disabled="!$v.user.displayName.required || !$v.user.email.required">
                    Save</button>
                </div>
                </form>
            </div>
        </div>
        </article>
    </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import Vuelidate from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
export default {
  data() {
      return {
          user: firebase.auth().currentUser,
      }
  },
  methods:{
        submit(){
            firebase.auth().currentUser.updateProfile({
                email: this.user.email,
                displayName: this.user.displayName
            })
            .then(sucess =>{

                alert('Updated Profile ');
            })
            .catch(error =>{
                console.log(error)
            })
        }
    },
    validations:{
        user:{
        displayName: {required},
        email: {required},
        }
    }
}
</script>