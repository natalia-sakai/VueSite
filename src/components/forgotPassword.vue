<template>
    <div class="container">
        <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                        <h1 class="subtitle has-text-centered">Reset Your Password</h1>
                        <p class="is-size-5 has-text-centered">We will send you an e-mail with your new password, if you want to change go to Profile > Access</p>                  
                    <br>
                    <form @submit.prevent="submit">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                            <input class="input is-medium" type="text" name="email" v-model="email" />
                            </div>
                            <p class="help is-danger" v-if="!$v.email.required">Required</p>
                        </div>
                        <br>
                        <button class="button" type="submit" :disabled="!$v.email.required">Submit</button>
                    </form>
                </div>
            </div>
        </article>
        </div>
        <br>
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
            email: '',
        }
    },
    methods:{
        submit(){
            firebase.auth().sendPasswordResetEmail(this.email).then(function(){

            })
            .catch(error =>{
                console.log(error)
            });
        }
    },
    validations:{
        email:{required}
    }
}
</script>