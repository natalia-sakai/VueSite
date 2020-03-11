<template>
    <section class="all-tour">
        <div class="dropdown is-hoverable">
            <button type="button" aria-haspopup="true" aria-controls="dropdown-menu4" class="tour-button">
                <span>TOUR</span>
            </button>
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                <div class="dropdown-item" @click="selectTour(3)">
                    <a>MAP OF THE SOUL TOUR</a>
                </div>
                <hr>
                <div class="dropdown-item" @click="selectTour(2)">
                    <a>LOVE YOURSELF TOUR</a>
                </div>
                <hr>
                <div class="dropdown-item" @click="selectTour(1)">
                    <a>WINGS TOUR</a>
                </div>
                <hr>
                </div>
            </div>
        </div>
        <div class="tourInfo">
            <div class="tourImage" id="tourImage">
                <div v-if="tour == 1">
                    <figure class="image">
                        <img src="../assets/images/wings-tour.png"/>
                    </figure>
                </div>
                <div v-if="tour == 2">
                    <figure class="image">
                        <img src="../assets/images/ly-tour.png"/>
                    </figure>
                </div>
                <div v-if="tour == 3">
                    <figure class="image">
                        <img src="../assets/images/mots-tour.png"/>
                        <!-- <img src="../assets/images/mots.jpg"/> -->
                    </figure>
                </div>
            </div>
            <div class="tourDate" id="tourDate">
                <h1>Hello World</h1>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tour: 3
        }
    },
    methods:{
        selectTour(selected){
            switch(selected){
                case 1:
                    this.tour = 1;
                    document.getElementById("tourDate").style.backgroundColor = "black";
                    document.getElementById("tourDate").style.color = "white";
                    document.getElementById("tourImage").style.backgroundImage = "url('https://i.ytimg.com/vi/KsHUrwV0Kek/maxresdefault.jpg')";
                    break;
                case 2:
                    this.tour = 2;
                    document.getElementById("tourDate").style.backgroundColor = "white";
                    document.getElementById("tourDate").style.color = "black";
                    document.getElementById("tourImage").style.backgroundImage = "url('https://ibighit.com/bts/images/bts/tour/love_yourself/tour-bg.jpg')";
                    break;
                case 3:
                    this.tour = 3;
                    document.getElementById("tourDate").style.backgroundColor = "#000066";
                    document.getElementById("tourDate").style.color = "white";
                    document.getElementById("tourImage").style.backgroundImage = "url('https://ibighit.com/bts/images/bts/tour/map_of_the_soul/tour-kv-bg.jpg')";
                    console.log('hey')
                    break;
            }
        }
    }
}
</script>

<style>
.tourImage{
    height: 450px;
    background-position: center;
    background-repeat: no-repeat;
     /*estes defaults mudam a cada era */
    background-image: url(../assets/images/mots.jpg);
}
.tourInfo{
    margin: auto;
    height: 100%;
    /*estes defaults mudam a cada era */
    background-color: #000066;
    color: white;
}
.image{
    width: 800px;
    margin:auto;
}
.all-tour {
    z-index: 11;
    width: 100%;
    margin: 0 auto;
    padding: 15px 0 58px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
}
.all-tour .dropdown{
    width: 450px; height: 40px;
    position: relative;
    padding-bottom: 5%;
    margin: auto;
}
.dropdown-content{
    padding-bottom: 0%;
    padding-top: 0%;
    margin: auto;
}
.dropdown-item{
    width: 450px;
    text-align: center;
    padding-bottom: 10px;
    padding-top: 10px;
}
/* .dropdown-item:hover{
    background-color: grey;
} */
.dropdown-item a{
    color: black;
    width: 450px;
}
hr{
    margin-top: 0%;
    margin-bottom: 0%;
}
.all-tour button {
    width: 450px; height: 40px;
    margin: auto;
    border-bottom: 1px solid rgba(170, 170, 170, 0.8);
    border-left: none; border-right: none; border-top: none;
    background: url('../assets/images/tour-select.png') no-repeat right center;
    background-size: auto 100%; color: #404040;
}

</style>
