<template>
<div class="container">
<div class="media" v-for="disco in discography">
        <div class="media-left">
        <figure class="image is-128x128">
            <img
                class="is-rounded"
                :src="disco.img"
            />
        </figure>
        </div>
        <div class="media-content">
            <br>
            <router-link :to="'/album/'+disco.itunes">
                <a class="title is-4">{{disco.name}}</a>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            discography: []
        }
    },
    created(){
        this.$http
        .get("https://vue-firebase-dbf74.firebaseio.com/discography.json")
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            for (let key in data) {
                this.discography.push(data[key])
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}
</script>
