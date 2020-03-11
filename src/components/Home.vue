<template>
  <div class="container">
    <br />
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <strong>{{this.user.displayName}}</strong>
            <br />
            <br />
            <form @submit.prevent="submit" id="message">
              <textarea class="textarea" name="message" v-model="newPost.message"></textarea>
              <br />
              <button class="button" type="submit">Post</button>
            </form>
          </div>
        </div>
      </article>
    </div>
    <br />
    <div v-for="post in postsID" :key="post">
      <app-post :postId="post"></app-post>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
import Post from "@/components/Post.vue";
import { mapState } from "vuex";
export default {
  components: {
    "app-post": Post
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      postsID: [],
      newPost: {
        userID: "",
        username: "",
        message: "",
        time: "",
      },
    };
  },
  created() {
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
        this.postsID = IDArray;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    submit() {
      this.newPost.userID = this.user.uid;
      this.newPost.username = this.user.displayName;
      this.newPost.time = moment().format("lll");
      
      this.$http.post("https://vue-firebase-dbf74.firebaseio.com/posts.json", this.newPost)
      .then(function(data) {
        return data.json();
      })
      .then(function(data){

        var interaction = {
          postID: data.name,
          like: 0,
          retweet: 0,
        }

        this.postsID.push(data.name);
        this.$http.post("https://vue-firebase-dbf74.firebaseio.com/interactions.json", interaction)
        alert("Postado");
        this.newPost.message = "";
      })
      .catch(error => {
        console.log(error);
      });
      
    }
  }
};
</script>

