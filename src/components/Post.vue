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
                <a class="level-item" aria-label="retweet" v-bind:class="{'retweet': clickRetweet}" v-on:click="clickRetweet = !clickRetweet">
                    <span class="icon is-small">
                    <i class="fas fa-retweet" aria-hidden="true"></i>
                    </span>
                </a>
                <a class="level-item" aria-label="like" v-bind:class="{'liked': clickLike}" v-on:click="clickLike = !clickLike">
                    <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                    </span>
                </a>
                </div>
            </nav>
            </div>
        </article>
        </div> 
        <app-reply v-if="clickReply == true"></app-reply>
    </div>
</template>

<script>
import Reply from '@/components/Reply.vue'
export default {
    props: ["postId"],
    components: {
        "app-reply": Reply
    },
    data() {
        return {
            clickLike: false,
            clickRetweet: false,
            clickReply: false,
            post: []
        }
    },
    created(){
        this.$http
      .get("https://vue-firebase-dbf74.firebaseio.com/posts.json")
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
</style>