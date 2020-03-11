<template>
<div class="container">
    <div class="columns">
        <div class="column is-two-fifths">
            <div v-for="music in musics.slice(0,1)">
                <h1 class="title is-2 has-text-centered">{{title}}</h1>
                <p class="subtitle is-size-6 has-text-centered"> {{music.trackCount}} Songs, {{timealbum | album}}</p>
                <figure class="has-text-centered">
                    <img :src="albumImg" class="album-img"/>
                </figure>
            </div>
        </div>
        <div class="column is-three-fifths">
            <div class="card-content" v-for="(music, index) in musics.slice(1)">
                 <hr>
                <div class="media">
                    <div class="media-left">
                        <button class="button is-white" @click="play(music.previewUrl)">
                            <span>
                                <i class="icon fas fa-play"></i>
                            </span>
                            <p class="text subtitle is-6 has-text-grey-light">{{index}}</p>
                         </button>
                    </div>
                    <div class="media-content">
                        <div class="columns">
                            <div class="column is-four-fifths">
                                <p class="subtitle is-6">{{music.trackName}}</p>
                            </div>
                            <div class="column is-one-fifths">
                                <p class="subtitle is-6">{{music.trackTimeMillis | track}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
Vue.filter('track', function(ms) {
    var minutes = Math.floor((ms % 3600000) / 60000);
    var seconds = Math.floor(((ms % 360000) % 60000) / 1000);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + ":" + seconds;

});
Vue.filter('album', function(ms) {
    var hours = Math.floor(ms / 3600000);
    var minutes = Math.floor((ms % 3600000) / 60000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    if(hours < 1)
        return minutes+"min";
    else
        return hours+"h"+minutes+"min";
});
export default {
    props: ["albumID"],
    data() {
        return {
            musics: [],
            timealbum: 0,
            albumImg: "",
            title: ""
        }
    },
    created(){
        this.$http
        .get("https://itunes.apple.com/lookup?id="+this.albumID+"&entity=song")
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
           this.musics = data.results;
           console.log(data.results)
            for(let i=1; i<data.results.length; i++){
                this.timealbum += data.results[i].trackTimeMillis;
            }
        })
        .catch(error => {
            console.log(error);
        });

        this.$http
        .get("https://vue-firebase-dbf74.firebaseio.com/discography.json")
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            for (let key in data) {
                if(data[key].itunes == this.albumID){
                    this.albumImg = data[key].img;
                    this.title = data[key].name;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    methods:{
        play:function(s) {
			if(this.audio) {
				this.audio.pause();
				this.audio.currentTime = 0;
			}
			this.audio = new Audio(s);
			this.audio.play();
		}
    }
}
</script>

<style scoped>
.card-content{
    padding: 0px !important;
}
hr{
    margin: 0rem 0 !important;
    height: 1px;
}
.media-content{
    margin: auto;
}
.media{
    padding: 10px;
}
.text{
    display: block;
}
.icon{
    display: none;
    color: red;
}
.media:hover .icon{
    display: block;
}
.media:hover .text{
    display: none;
}
.media:hover .subtitle{
    color: red;
}
.button:hover{
    background-color: white;
}
.album-img{
    width: 360px;
    height: 360px;
    border-radius: 5px;
}
</style>
