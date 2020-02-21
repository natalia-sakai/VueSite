<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <p>
                    <strong>{{this.user.displayName}}</strong>
                    </p>
                    <form @submit.prevent="submit">
                        <textarea class="textarea has-fixed-size" rows="2" name="message" v-model="post.message"></textarea>
                        <br>
                        <button class="button" type="submit">Reply</button>
                    </form>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
const fb = require('../firebaseConfig.js')
export default {
    data(){
        return{
            user: firebase.auth().currentUser,
            post:{
                userID: '',
                username: '',
                message: '',
                time: '',
            }
        }
    },
    methods:{
        submit(){

        }
    }
}
</script>