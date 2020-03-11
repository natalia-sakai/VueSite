<template>
    <div class="container">
        <br>
        <Timeline id="bts_twt" sourceType="profile"/>
    </div>
</template>

<script>
//npm i vue-tweet-embed
import { Tweet, Moment, Timeline } from 'vue-tweet-embed'
export default {
    components:{
        'Tweet': Tweet,
        'Moment': Moment,
        'Timeline': Timeline,
    }
}
</script>
