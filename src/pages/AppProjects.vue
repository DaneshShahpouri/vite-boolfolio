<script>
import axios from 'axios';
import { store } from '../store.js';
import AppFooter from '../components/AppFooter.vue';

export default {
    name: 'AppProjects',
    data() {
        return {
            store,
            scrollBool: true,
            tempProjects: [],
            urlImg: 'http://127.0.0.1:8000' + '/storage/',
        }
    },

    components: {
        AppFooter
    },

    methods: {
        elScrollParallax() {
            let win_pos = window.scrollY;


            // Elementi con scroll
            let img = document.getElementById('background-slayer');
            let img2 = document.getElementById('background-slayer-2');

            //Posizione degli elementi
            let imgPos = img.getBoundingClientRect();
            let img2Pos = img2.getBoundingClientRect();


            // bg
            if (win_pos > imgPos.top && this.scrollBool) {
                img.style.transform = "translateY(" + imgPos.top * -.4 + "px)"
            };

            if (img2 && win_pos > img2Pos.top) {
                img2.style.transform = "translateY(" + imgPos.top * -.4 + "px)"
            };

        },

        getTempProjects() {
            this.store.projects = [];
            axios.get('http://127.0.0.1:8000/api/projects').then(response => {

                this.store.isLoading = true;
                if (response.data.results) {

                    response.data.results.forEach(project => {
                        if (this.store.searchInput != '') {

                            if (project.title.toLocaleLowerCase().includes(this.store.searchInput.toLocaleLowerCase())) {
                                this.store.projects.push(project)

                            }
                        } else {
                            this.store.projects.push(project)
                        }
                    });

                    this.store.isSuccess = true;

                    if (this.store.projects.length == 0) {
                        this.store.isSuccess = false
                    }

                } else {

                    this.store.isSuccess = false;
                }

                this.store.isLoading = false
            });

        },
    },


    created() {
        this.store.isLoading = true,
            this.store.searchInput = '',
            this.getTempProjects()
    },

    mounted() {
        this.store.currentPage = 'projects';
        window.addEventListener('scroll', this.elScrollParallax);
    },

    unmounted() {
        window.removeEventListener('scroll', this.elScrollParallax);
    },

}
</script>

<template>
    <div id="works">

        <div class="container p-5 mt-5">
            <h1 class="text-uppercase text-center mt-5">Works_</h1>
        </div>
        <!-- Caricamento -->
        <div v-if="this.store.isLoading == true" class="container" id="loading-screen">
            <div class="icon-wrapper">
                <i class="fa-solid fa-circle-notch"></i>
            </div>
            <span>Loading..</span>
        </div>
        <!-- Schermo Principale -->
        <div v-if="this.store.isLoading == false && this.store.isSuccess == true">

            <div class="container d-flex justify-content-start align-item-center flex-column _cards-container">

                <div class="_mycard" v-for="project in this.store.projects">

                    <div class="img-wrapper">
                        <img :src="project.cover_image == null ? 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image' : (this.urlImg + project.cover_image)"
                            class="_mycard-img-top h-100" alt="...">
                    </div>
                    <div class="text-info">
                        <h4 class="_mycard-title ">{{ project.title }}</h4>
                        <div class="_mycard-body">
                            <p class="_mycard-text">{{ project.description }}</p>
                            <router-link :to="{ name: 'works/show', params: { slug: project.slug } }"
                                class="btn btn-outline-dark">Vedi
                                Dettagli</router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- Nessun Risultato -->
        <div v-if="this.store.isLoading == false && this.store.isSuccess == false">
            <div class="container d-flex justify-content-center align-item-center flex-wrap p-2">
                <div class="alert alert-dark w-100" role="alert">
                    Spiacenti, Nessun Risultato.
                </div>
            </div>
        </div>

        <div class="_bg-wrapper" id="background-slayer">

            <img class="_primo" src="../../public/worksbg/1710300.svg" alt="">
            <img class="_secondo" src="../../public/worksbg/1456279642.svg" alt="">
            <img class="_terzo" src="../../public/worksbg/1419136.svg" alt="">
            <img class="_quarto" src="../../public/worksbg/tshirt_design_contest.svg" alt="">
        </div>
        <div class="_bg-wrapper _bg-secondo" id="background-slayer-2">

            <img class="_primo" src="../../public/worksbg/1710300.svg" alt="">
            <img class="_secondo" src="../../public/worksbg/1456279642.svg" alt="">
            <img class="_terzo" src="../../public/worksbg/1419136.svg" alt="">
            <img class="_quarto" src="../../public/worksbg/tshirt_design_contest.svg" alt="">
        </div>

    </div>
    <AppFooter class="mt-0"></AppFooter>
</template>

<style lang="scss" scoped>
#works {
    position: relative;
    overflow-y: hidden;
    padding-bottom: 4em;

    .container {
        position: relative;
        z-index: 2;
    }

    ._bg-wrapper {
        margin-top: 10em;
        width: 100%;
        height: 500vh;
        position: absolute;
        top: 0;
        left: 0;
        background: #00000000;

        overflow: hidden;
        z-index: 1;

        img {
            position: absolute;
            width: 70vw;
            filter: invert(.85);
            opacity: .2;

            @media screen and (max-width: 1000) {
                width: 120vw;
            }

            @media screen and (max-width: 800) {
                width: 160vw;
            }

            @media screen and (max-width: 600) {
                width: 200vw;
            }
        }

        img._primo {
            left: -35em;
            top: 20em;

            @media screen and (max-width: 1000px) {
                left: -20em
            }

            @media screen and (max-width: 772px) {
                left: -10em
            }
        }

        img._secondo {
            right: -35em;
            top: 50em;
            opacity: .1;

            @media screen and (max-width: 1000px) {
                right: -20em
            }

            @media screen and (max-width: 772px) {
                right: -10em
            }
        }

        img._terzo {
            left: -35em;
            top: 80em;

            @media screen and (max-width: 1000px) {
                left: -20em
            }

            @media screen and (max-width: 772px) {
                left: -10em
            }
        }

        img._quarto {
            right: -35em;
            top: 120em;

            @media screen and (max-width: 1000px) {
                right: -20em
            }

            @media screen and (max-width: 772px) {
                right: -10em
            }
        }
    }

    ._bg-secondo {
        display: none;
        top: 300vh;
        overflow: hidden;

        @media screen and (max-width:600px) {
            display: block;
        }
    }
}

._cards-container {

    ._mycard {
        position: relative;
        z-index: 2;
        width: 100%;
        padding: 4em 2em;
        //border-bottom: 1px solid rgb(42, 42, 42);
        //margin: 2em 0em;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 3em;
        //overflow: hidden;
        transition: all .5s;

        .img-wrapper {
            width: 35vw;
            height: 20vw;
            max-width: 450px;
            max-height: 300px;
            min-width: 250px;
            min-height: 200px;
            //border-radius: 50%;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid black;
            //background-color: white;


            //margin: 2em;
            aspect-ratio: 1 / 1;

            img {
                width: 100%;
                height: 100%;
                scale: 1;
                object-fit: cover;
                object-position: center;

            }
        }

        .text-info {
            width: calc(50% - 2em);
            height: 100%;
            margin-left: 2em;
            display: flex;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.8);

            gap: 1em;

            ._mycard-title {
                text-transform: uppercase;
                color: black;
                // font-size: 2.2em;
                border-bottom: 1px solid black;
                text-align: center;
                margin-top: 1em;
            }

            ._mycard-body {
                display: flex;
                flex-direction: column;
                gap: 1em;
            }

            ._mycard-text {
                color: rgb(64, 63, 63);
            }
        }

        @media screen and (max-width: 772px) {
            flex-direction: column;
            gap: 1em;
            border-bottom: 1px solid rgb(42, 42, 42);
            background-color: rgba(255, 255, 255, 0.6);

            .text-info {
                margin-left: 0em;
                width: 70vw;

                ._mycard-title {
                    margin-top: 2.5em;
                }
            }
        }
    }




    .bordo-bianco {
        text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,
            1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
    }

    .bordo-bianco-transparente {
        text-shadow: 2px 0 #ffffff38, -2px 0 #ffffff38, 0 2px #ffffff38, 0 -2px #ffffff38,
            1px 1px #ffffff38, -1px -1px #ffffff38, 1px -1px #ffffff38, -1px 1px #ffffff38;
    }


    @media screen and (min-width: 882px) {

        &:hover>._mycard {
            opacity: .7;


        }

        ._mycard:hover {
            opacity: 1;
            box-shadow: 5px 8px 10px #00000030;
            background-color: rgba(255, 255, 255, 0.699);
        }
    }
}

#loading-screen {
    height: 50vh;
    widows: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;

    .icon-wrapper {
        i {
            font-size: 2em;
            color: rgb(39, 39, 39);
            animation: loading 1s linear infinite;
        }
    }
}
</style>
