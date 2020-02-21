<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <strong>{{this.user.displayName}}</strong>
                    <br><br>
                    <form @submit.prevent="submit">
                        <textarea class="textarea" name="message" v-model="post.message"></textarea>
                        <br>
                        <button class="button" type="submit">Post</button>
                    </form>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import { mapState } from "vuex";
const fb = require('../firebaseConfig.js')
export default {
    name: 'NewMessage',
    computed: {
    ...mapState('{currentUser: state => state.auth.currentUser}')
    },
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
    methods: {
        submit(){
            this.post.userID = this.user.uid;
            this.post.username = this.user.displayName;
            this.post.time = moment().format('lll');
            this.$http.post('https://vue-firebase-dbf74.firebaseio.com/posts.json', this.post)
            .then(function(data){
                alert('Postado');
                form.reset()
            })
            .catch(error => {
                console.log(error)
            });
        }
    },
    created() {
        /*
        this.$http.get('https://vue-firebase-dbf74.firebaseio.com/users.json').then(function(data){
            return data.json();
        })
        .then(function(data){
            //cria um array com todos os users
            var userArray = [];
            for(let key in data){
                data[key].id = key;
                if(data[key].id == this.id){
                    this.user = data[key]
                }
            }
        })
        .catch(error => {
            console.log(error)
        });
        */

    },
}
</script>