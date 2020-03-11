<template>
  <div class="container">
    <br/>
    <div class="columns is-8 is-variable">
      <div class="column is-one-quarter has-text-left">
        <nav class="panel">
          <p class="panel-heading">Options</p>
          <a class="panel-block" @click="option = 0">
            <span class="panel-icon">
              <i class="fas fa-home" aria-hidden="true"></i>
            </span>
            Profile
          </a>
          <a class="panel-block" @click="option = 1">
            <span class="panel-icon">
              <i class="fas fa-user-alt" aria-hidden="true"></i>
            </span>
            Account
          </a>
          <a class="panel-block" @click="option = 2">
            <span class="panel-icon">
              <i class="fas fa-lock" aria-hidden="true"></i>
            </span>
            Access
          </a>
        </nav>
      </div>
      <div class="column is-three-quarter">
        <div v-if="option == 0"> 
            <div v-for="post in postsID" :key="post">
                <app-post :postId="post"></app-post>
            </div>
        </div>
        <app-account v-if="option == 1"></app-account>
        <app-access v-if="option == 2"></app-access>
      </div>
    </div>
  </div>
</template>

<script>
import Access from "@/components/Access.vue";
import Account from "@/components/Account.vue";
import Post from "@/components/Post.vue";

import Vue from "vue";
import firebase from "firebase";
export default {
  components: {
    "app-access": Access,
    "app-account": Account,
    "app-post": Post
  },
  data() {
    return {
      option: 0,
      user: firebase.auth().currentUser,
      postsID: [],
    };
  },
  created(){
      this.$http
      .get("https://vue-firebase-dbf74.firebaseio.com/posts.json")
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        var IDArray = [];
        for (let key in data) {
            if(data[key].userID == this.user.uid){
                IDArray.push(key);
            }
        }
        this.postsID = IDArray;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>