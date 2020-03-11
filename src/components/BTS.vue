<template>
<section class="all-bts">
    <div class="dropdown is-hoverable">
        <button type="button" aria-haspopup="true" aria-controls="dropdown-menu4" class="tour-button">
            <span>INFORMATION</span>
        </button>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                <div class="dropdown-item" @click="choice = 1">
                    <a>PROFILE</a>
                </div>
                <hr>
                <div class="dropdown-item" @click="choice = 2">
                    <a>UNICEF SPEECH</a>
                </div>
                <hr>
                </div>
            </div>
    </div>
    <br><br>
        <div class="container" v-if="choice == 1" data-target="modal-card">
            <div class="card-content" v-for="member in members">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-96x96">
                        <img
                            class="is-rounded"
                            :src="member.img"
                        />
                        </figure>
                    </div>
                    <div class="media-content">
                        <br />
                        <p class="title is-4">{{member.fullname}}</p>
                        <p class="subtitle is-6">@{{member.name}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" v-if="choice == 2">
            <p class="has-text-justified is-italic is-family-code">
              "É uma honra incrível sermos convidados para uma ocasião tão importante para a atual geração de jovens.
              <br>
              No último mês de novembro, o BTS lançou a campanha 'Love Myself' com a UNICEF, baseada na crença de que o amor verdadeiro começa primeiro com o amor próprio.
              Estamos nessa parceria com o programa da UNICEF para acabar com a violência, para proteger jovens e crianças ao redor do mundo.
              E nossos fãs se tornaram uma grande parte dessa campanha com suas ações e seus entusiamos. Nós realmente temos os melhores fãs do mundo.
              E eu gostaria de começar falando sobre mim mesmo.
              <br>
              Eu nasci em Ilsan, uma cidade próxima de Seul, na Coreia do Sul. É um lugar muito bonito, com um lago, montanhas, e até mesmo com um festival anual de flores.
              Eu tive uma infância muito feliz lá. E eu era apenas um garoto comum.
              Eu costumava olhar para o céu para pensar, e eu costumava sonhar os sonhos de um garoto. Eu imaginava que eu era um super herói que podia salvar o mundo.
              <br>
              E na introdução de um dos nossos primeiros álbuns, tem uma frase que diz: 'Meu coração parou quando eu tinha nove ou, talvez, dez anos'.
              Olhando para trás, acho que foi quando eu comecei a me preocupar sobre o que outras pessoas pensavam de mim, e comecei a me enxergar pelos olhos deles.
              Eu parei de olhar para o céu à noite e para as estrelas. Eu parei de sonhar acordado.

              Ao invés disso, tentei apenas me encaixar nos moldes criados por outras pessoas.
              <br>
              Logo, comecei a calar minha própria voz e passei a escutar as vozes dos outros. Ninguém chamava meu nome, nem eu mesmo chamava.
              Meu coração parou e meus olhos fecharam-se. E é assim, dessa forma, que eu, nós, todos perdemos nossos nomes. Nos tornamos fantasmas.
              <br>
              Mas eu tinha um refúgio, e era a música. Tinha uma pequena voz dentro de mim que dizia: 'Acorde, cara. E escute a si mesmo!' Mas demorou um tempo para que eu ouvisse a música chamando meu verdadeiro nome.
              <br>
              Mesmo depois de tomar a decisão de me juntar ao BTS, havia muitos obstáculos.
              Alguns podem não acreditar, mas muitas pessoas achavam que nós éramos um caso perdido, e algumas vezes, eu só quis desistir.
              Mas acho que tive muita sorte de não abrir mão de tudo. E eu tenho certeza de que eu, nós, vamos continuar cambaleando e caindo assim.
              <br>
              O BTS se tornou aqueles artistas que se apresentam em grandes estádios e vendem milhões de álbuns agora, mas eu ainda sou um cara comum de 24 anos.
              Se conquistei algo, isso só foi possível porque tenho os outros membros do BTS ao meu lado, e por causa do amor e do apoio do nosso fã-clube ao redor do mundo.
              <br>
              E eu posso ter cometido um erro ontem, mas o eu de ontem ainda sou eu. Hoje, eu sou o que sou com todos os meus defeitos e erros.
              Amanhã, eu posso ser um pouco mais sábio, e isso também será eu.
              Essas falhas e erros são o que eu sou, compondo as estrelas mais brilhantes da constelação da minha vida.
              Eu aprendi a me amar pelo o que eu sou, pelo o que eu fui, e pelo o que eu espero me tornar.
              <br>

              Eu gostaria de dizer mais uma última coisa.
              Depois de lançar a série de álbuns 'Love Yourself' e a campanha 'Love Myself', eu comecei a escutar histórias impressionantes de nossos fãs pelo mundo,
              de como nossa mensagem os ajudou a superarem as dificuldades da vida e de como eles passaram a se amar.
              Essas histórias constantemente nos lembram de nossa responsabilidade.
              <br>
              Então, vamos todos dar mais um passo. Aprendemos a nos amar.
              Agora, eu insisto que falem por si mesmos.
              Eu gostaria de perguntar a todos vocês: Quais são seus nomes? O que anima vocês e o que faz seus corações baterem?
              Me digam suas histórias, eu quero ouvir suas vozes e ouvir suas convicções.

              Não importa quem você seja, de onde você venha, sua cor de pele, sua identidade de gênero, apenas fale! Encontre seu nome e sua voz, falando por si próprio.
              <br>
              Eu sou o Kim Nam-joon, e também sou um BTS.
              Sou um ídolo e também sou um artista de uma pequena cidade da Coreia.
              Como a maioria das pessoas, eu cometi muitos erros em minha vida, tenho muitos defeitos e muitos medos,
              mas eu vou me aceitar da maior forma que eu puder, e começar a me amar, gradualmente, aos poucos.
              <br>
              Qual é seu nome? Fale por si próprio. Muito obrigado!"
            </p>
            <p class="has-text-centered">BTS UNICEF SPEECH</p>
        </div>
</section>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            choice: 1,
            members:[],

        }
    },
    created() {
        this.$http
        .get("https://vue-firebase-dbf74.firebaseio.com/bts-member.json")
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            for (let key in data) {
                this.members.push(data[key])
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
};
</script>

<style scoped>
.all-bts {
    z-index: 11;
    width: 100%;
    margin: 0 auto;
    padding: 33px 0 58px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
}
.all-bts .dropdown{
    width: 450px; height: 40px;
    position: relative;
    padding-bottom: 0%;
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
.dropdown-item a{
    color: black;
    width: 450px;
}
hr{
    margin-top: 0%;
    margin-bottom: 0%;
}
.all-bts button {
    width: 450px; height: 40px;
    margin: auto;
    border-bottom: 1px solid rgba(170, 170, 170, 0.8);
    border-left: none; border-right: none; border-top: none;
    background: url('../assets/images/tour-select.png') no-repeat right center;
    background-size: auto 100%; color: #404040;
}
</style>
