<template>
    <div class="container">
        <div class="video-box">
            <youtube :video-id="id"></youtube>
        </div>
    </div>

</template>

<script>
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)
export default {
    data() {
        return {
            id: "IK5UUrPglTM"
        }
    },
    created(){

    },
    methods: {

    }
}
</script>

<style scoped>
.video-box{
    text-align: center;
}
</style>
