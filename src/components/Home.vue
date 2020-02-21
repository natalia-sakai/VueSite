<template>
  <div class="container">
    <app-newMessage></app-newMessage>
    <div v-for="post in posts" :key="post">
      <app-post :postId="post"></app-post>
      <br>
    </div>
  </div>
</template>

<script>
const fb = require("../firebaseConfig.js");
import firebase from "firebase";
import newMessage from "@/components/newMessage.vue";
import Post from "@/components/Post.vue";
export default {
  //props: ["id"],
  components: {
    "app-newMessage": newMessage,
    "app-post": Post
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      users: [],
      posts: []
    };
  },
  created() {
    //HTTP para os usuarios
    this.$http
      .get("https://vue-firebase-dbf74.firebaseio.com/users.json")
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        //cria um array com todos os users
        var userArray = [];
        for (let key in data) {
          data[key].id = key;
          userArray.push(data[key]);
          /*
          //verifica o user logado
          if (data[key].id == this.id) {
            this.user = data[key];
          }
          */
        }
        this.users = userArray;
      })
      .catch(error => {
        console.log(error);
      });

    //HTTP para os Posts
    this.$http
      .get("https://vue-firebase-dbf74.firebaseio.com/posts.json")
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        var IDArray = [];
        for (let key in data) {
          IDArray.push(key);
        }
        this.posts = IDArray;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

