<template>
    <div class="container">
        <div class="box">
        <article class="media">
            <div class="media-content">
            <div class="content">
                <p>
                <strong>{{this.post.username}}</strong>
                <small>@{{this.post.username}}</small>
                <small>{{this.post.time}}</small>
                <br />
                {{post.message}}
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                <a class="level-item" aria-label="reply" @click="clickReply = !clickReply">
                    <span class="icon is-small">
                    <i class="fas fa-reply" aria-hidden="true"></i>
                    </span>
                </a>
                <a class="level-item" aria-label="retweet" v-bind:class="{'retweet': clickRetweet}" v-on:click="actionRetweet()">
                    <span class="icon is-small">
                    <i class="fas fa-retweet" aria-hidden="true"></i>
                    <p class="is-family-code is-size-7" v-if="this.interaction.retweet>0">{{this.interaction.retweet}}</p>
                    </span>
                </a>
                <a class="level-item" aria-label="like" v-bind:class="{'liked': clickLike}" v-on:click="actionLike()">
                    <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                    <p class="is-family-code is-size-7" v-if="this.interaction.like>0">{{this.interaction.like}}</p>
                    </span>
                </a>
                </div>
            </nav>
            </div>
        </article>
        </div>
        <hr v-if="clickReply == true" class="reply">
        <app-reply v-if="clickReply == true"></app-reply>
        <br>
    </div>
</template>

<script>
import firebase, { database } from 'firebase'
import Reply from '@/components/Reply.vue'
export default {
    props: ["postId"],
    components: {
        "app-reply": Reply
    },
    data() {
        return {
            user: firebase.auth().currentUser,
            clickLike: false,
            clickRetweet: false,
            clickReply: false,
            post: {
                userID: "",
                username: "",
                message: "",
                time: "",
            },
            interaction:{
                postID:"",
                like: "",
                retweet: "",
            },
            interactionID: "",
            userinteraction:{
                postID:"",
                userID: "",
                like: "",
                retweet:"",
            }
        }
    },
    created(){

        //SHOW POST
        this.$http.get("https://vue-firebase-dbf74.firebaseio.com/posts.json")
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            for (let key in data) {
                data[key].id = key;
                //verifica o user logado
                if (data[key].id == this.postId) {
                    this.post = data[key];
                }
            }
        })
        .catch(error => {
            console.log(error);
        });

        //SHOW INTERACTIONS
        this.$http.get("https://vue-firebase-dbf74.firebaseio.com/interactions.json")
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            for(let i in data){
                if(data[i].postID == this.postId){
                    
                    this.interaction = data[i]
                    this.interactionID = i;
                }
            }            
        })
        .catch(error => {
            console.log(error);
        });

        //SHOW USER INTERACTIONS 
        this.$http.get("https://vue-firebase-dbf74.firebaseio.com/userinteractions.json")
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            for(let key in data){
                //se o user tiver interação com esse post
                if(data[key].userID == this.user.uid && data[key].postID == this.postId){
                    if(data[key].like > 0)
                        this.clickLike = true
                    if(data[key].retweet > 0)
                        this.clickRetweet = true;
                }
                else if(data[key].userID != this.user.uid && data[key].postID == this.postId){
                    this.clickRetweet = false;
                    this.clickLike = false;
                }
            }
        })
        .catch(error =>{
            console.log(error)
        })

    },
    methods:{
        //CREATE/UPDATE USER INTERACTION AND UPDATE INTERACTION
        actionRetweet(){
            this.clickRetweet = !this.clickRetweet;
            if(this.clickRetweet == true){
                this.Retweet(1)
            }
            else{
                this.Retweet(0)
            }
        },
        actionLike(){
           this.clickLike = !this.clickLike;
            if(this.clickLike == true){
                this.Like(1)
            }
            else{
                this.Like(0)
            }
        },
        Retweet(action){
            //ACTION 1 = rt / 0 = no rt

            //verifica se o user ja curtiu/rt
            this.$http.get("https://vue-firebase-dbf74.firebaseio.com/userinteractions.json")
            .then(function(data){
                return data.json();
            })
            .then(function(data){
                //não possui registro na table
                if(data == null){
                    //cria o interaction do user
                    var userinteraction = {
                        postID: this.postId,
                        userID: this.user.uid,
                        like: 0,
                        retweet: 1,
                    }
                    this.$http.post("https://vue-firebase-dbf74.firebaseio.com/userinteractions.json", userinteraction)
                    .then(function(data){

                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                else{
                    for(let key in data){
                        //se o user tiver interação com esse post
                        if(data[key].userID == this.user.uid && data[key].postID == this.postId){
                            //update userinteraction
                            var userinteraction = {
                                postID: data[key].postID,
                                userID: data[key].userID,
                                like: data[key].like,
                                retweet: action,
                            }
                            var update = {};
                            update['/userinteractions/'+ key] = userinteraction;
                            firebase.database().ref().update(update)
                            .then(function(data){

                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                        else{
                            //cria o interaction do user
                            var userinteraction = {
                                postID: this.postId,
                                userID: this.user.uid,
                                like: 0,
                                retweet: 1,
                            }
                            this.$http.post("https://vue-firebase-dbf74.firebaseio.com/userinteractions.json", userinteraction)
                            .then(function(data){

                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                    }
                }
                
                if(action == 1)
                    this.interaction.retweet++;
                else{
                    //se ja tiver rt só retira um
                    if(this.interaction.retweet > 0)
                        this.interaction.retweet--;
                    //se nao deixa como zero
                    else
                        this.interaction.retweet = 0;
                }
                //atualiza o interaction do post
                var updates = {};
                updates['/interactions/' + this.interactionID] = this.interaction;
                firebase.database().ref().update(updates)
                .then(data=>{
                })
                .catch(error=>{
                    console.log(error)
                })
            })
            .catch(error => {
                console.log(error)
            })
        },
        Like(action){
            //ACTION 1 = like / 0 = dislike

            //verifica se o user ja curtiu/rt
            this.$http.get("https://vue-firebase-dbf74.firebaseio.com/userinteractions.json")
            .then(function(data){
                return data.json();
            })
            .then(function(data){
                //não possui registro
                if(data == null){
                    //cria o interaction do user
                    var userinteraction = {
                        postID: this.postId,
                        userID: this.user.uid,
                        like: 1,
                        retweet: 0,
                    }
                    this.$http.post("https://vue-firebase-dbf74.firebaseio.com/userinteractions.json", userinteraction)
                    .then(function(data){

                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                else {
                    for(let key in data){
                        //se o user tiver interação com esse post
                        if(data[key].userID == this.user.uid && data[key].postID == this.postId){
                            //update userinteraction
                            var userinteraction = {
                                postID: data[key].postID,
                                userID: data[key].userID,
                                like: action,
                                retweet: data[key].retweet,
                            }
                            var update = {};
                            update['/userinteractions/'+ key] = userinteraction;
                            firebase.database().ref().update(update)
                            .then(function(data){

                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                        else{
                            //cria o interaction do user
                            var userinteraction = {
                                postID: this.postId,
                                userID: this.user.uid,
                                like: 1,
                                retweet: 0,
                            }
                            this.$http.post("https://vue-firebase-dbf74.firebaseio.com/userinteractions.json", userinteraction)
                            .then(function(data){

                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                    }
                }

                if(action == 1)
                    this.interaction.like++;
                else{
                    //se ja tiver rt só retira um
                    if(this.interaction.like > 0)
                        this.interaction.like--;
                    //se nao deixa como zero
                    else
                        this.interaction.like = 0;
                }
                //atualiza o interaction do post
                var updates = {};
                updates['/interactions/' + this.interactionID] = this.interaction;
                firebase.database().ref().update(updates)
                .then(data=>{
                })
                .catch(error=>{
                    console.log(error)
                })
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
}
</script>

<style>
.liked{
    color: red !important
}
.retweet{
    color: green !important
}
.reply{
    padding-top: 1px !important;
    margin-top: 1px !important;
    margin-bottom: 1.5px !important;
    margin-left: 25px;
    height: 20px;
    border-left: 4px solid grey;
    width: 6px;
}
.box{
    margin-bottom: 0px !important;
}
</style>