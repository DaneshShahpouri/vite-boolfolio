<script>
import { store } from '../store';
import AppFooter from '../components/AppFooter.vue';

export default {
    name: 'AppAbout',
    data() {
        return {
            store
        }
    },

    components: {
        AppFooter
    },

    methods: {
        animationTextAppear() {
            let textWrapper = document.querySelector('.ml3');
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


            anime.timeline({ loop: false })
                .add({
                    targets: '.ml3 .letter',
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: 2250,
                    delay: (el, i) => 20 * (i + 1)
                }).add({
                    targets: '.ml3',
                    opacity: 1,
                    duration: 1000,
                    easing: "easeOutExpo",
                    delay: 1000
                });

        },
        animationIcon() {
            if (this.store.currentPage == 'about') {

                let iconsArray = document.querySelectorAll('._animation-icons');
                let contatore = 0;
                let time = 200;

                let iconPos = iconsArray[0].getBoundingClientRect();

                if (iconPos.top < 700) {

                    function contatoreFun() {

                        setTimeout(() => {
                            if (contatore <= iconsArray.length - 1) {
                                iconsArray[contatore].style = 'bottom:0; opacity:1';
                                contatore++
                                //time += 100;
                                contatoreFun();
                            }
                        }, time)
                    };

                    contatoreFun()
                }

            }
        }
    },

    mounted() {
        this.store.currentPage = 'about';
        console.log(this.store.currentPage)
        this.animationIcon()
        this.animationTextAppear()
        window.addEventListener('scroll', this.animationIcon);
    },
}
</script>

<template>
    <div class="container p-5 mt-5">
        <h1 class="text-center mt-5 text-uppercase">About_</h1>
    </div>

    <div class="container d-flex justify-content-center align-item-center flex-wrap p-2 mb-4">

        <div class="_about-container">
            <div class="img-wrapper">
                <img src="../../public/foto profilo.png" alt="">
            </div>

            <!-- CerchioFoto -->
            <div class="_cerchio-img"></div>
            <div class="_cerchio-img-2"></div>


            <div class="_info-wrapper">
                <div class="_section-info mb-4">
                    <h2>Chi sono?</h2>
                    <span id="animation-text-appear" class="ml3">Ho percorso un sentiero ibrido tra informatica e arte,
                        fisiologicamente
                        sfociato nella programmazione. Mi definisco una persona calma e
                        riflessiva e sono cresciuto in mezzo ai computer. Suono la chitarra e
                        quando non scrivo codice, scrivo canzoni.
                    </span>
                </div>
                <div class="_section-info">
                    <h2>Le mie Skills</h2>
                    <div class="skills">

                        <i class="_animation-icons fa-brands fa-html5"></i>
                        <i class="_animation-icons fa-brands fa-css3-alt"></i>
                        <i class="_animation-icons fa-brands fa-square-js"></i>
                        <i class="_animation-icons fa-brands fa-bootstrap"></i>
                        <i class="_animation-icons fa-brands fa-sass"></i>
                        <i class="_animation-icons fa-brands fa-vuejs"></i>
                        <i class="_animation-icons fa-brands fa-php"></i>
                        <i class="_animation-icons fa-brands fa-laravel"></i>

                    </div>
                </div>

            </div>
        </div>

        <div class="button-wrapper text-center m-5">
            <router-link class="btn btn-outline-dark mx-3" :to="{ name: 'home' }">Home</router-link>
            <router-link class="btn btn-outline-dark mx-3" :to="{ name: 'works' }">Works</router-link>
        </div>

    </div>

    <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>
.container {
    min-height: 200px;

    ._about-container {
        display: flex;
        gap: 4em;
        justify-content: center;
        align-items: center;
        padding: 2em;
        margin-bottom: 5em;
        position: relative;

        ._cerchio-img {
            position: absolute;
            left: 2em;
            top: 1em;
            scale: .95;
            transition: all 1s;

            width: 22vw;
            height: 22vw;
            border-radius: 50%;
            border: 1px solid rgb(215, 215, 215);
            z-index: 1;

            animation: cerchio-img-rotate 20s infinite;

            @media screen and (max-width:1000px) {
                transform: translateX(calc(50% + 5vw));
                width: 30vw;
                height: 30vw;
            }

            @media screen and (max-width:750px) {
                transform: translateX(calc(25% + 5vw));
                width: 35vw;
                height: 35vw;
            }

            @media screen and (max-width:600px) {
                transform: translateX(calc(45% + 5vw));
                width: 40vw;
                height: 40vw;
            }

            @media screen and (max-width:500px) {
                transform: translateX(calc(25% + 5vw));
                width: 50vw;
                height: 50vw;
            }

            @media screen and (max-width:400px) {
                transform: translateX(calc(5% + 5vw));
                width: 60vw;
                height: 60vw;
            }
        }

        ._cerchio-img-2 {
            position: absolute;
            left: 2em;
            top: 1em;
            scale: .95;
            transition: all 1s;

            width: 23vw;
            height: 23vw;
            border-radius: 50%;
            border: 1px solid rgb(167, 167, 167);
            z-index: 1;

            animation: cerchio-img-rotate 20s 2s infinite;

            @media screen and (max-width:1000px) {
                transform: translateX(calc(50% + 5vw));
                width: 30vw;
                height: 30vw;
            }

            @media screen and (max-width:750px) {
                transform: translateX(calc(25% + 5vw));
                width: 35vw;
                height: 35vw;
            }

            @media screen and (max-width:600px) {
                transform: translateX(calc(45% + 5vw));
                width: 40vw;
                height: 40vw;
            }

            @media screen and (max-width:500px) {
                transform: translateX(calc(25% + 5vw));
                width: 50vw;
                height: 50vw;
            }

            @media screen and (max-width:400px) {
                transform: translateX(calc(5% + 5vw));
                width: 60vw;
                height: 60vw;
            }
        }

        .img-wrapper {
            position: relative;
            z-index: 3;
            width: 20vw;
            height: 20vw;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid rgb(120, 120, 120);

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                object-position: center;

                animation: appearimg 3s;
            }
        }

        ._info-wrapper {
            width: calc(100% - 20vw - 4em - 2em);

            ._section-info {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: .5em;

                .skills {
                    display: flex;
                    flex-flow: row wrap;
                    gap: 2em;

                    i {
                        font-size: 2em;
                        position: relative;
                        bottom: 10px;
                        opacity: 0;
                        transition: all 1s;
                    }
                }

            }


        }

        @media screen and (max-width:1000px) {
            flex-direction: column;

            .img-wrapper {
                width: 30vw;
                height: 30vw;
            }

            ._info-wrapper {
                width: 100%;

                span,
                h2 {
                    text-align: center;
                }

                .skills {
                    justify-content: center;
                }
            }

        }

        @media screen and (max-width:600px) {
            flex-direction: column;

            .img-wrapper {
                width: 40vw;
                height: 40vw;
            }
        }

        @media screen and (max-width:500px) {
            flex-direction: column;

            .img-wrapper {
                width: 45vw;
                height: 45vw;
            }
        }

        @media screen and (max-width:400px) {
            flex-direction: column;

            .img-wrapper {
                width: 55vw;
                height: 55vw;
            }
        }
    }
}

@keyframes appearimg {
    0% {
        filter: blur(5px);
    }

    100% {
        filter: blur(0px);
    }
}

@keyframes cerchio-img-rotate {
    0% {
        left: 2em;
        top: .8em;
        scale: .95;
    }

    20% {
        left: 2.2em;
        top: 2em;
        scale: .9;
    }

    50% {
        left: 1em;
        top: .8em;
        scale: 1.1;
    }

    80% {
        left: 2.1em;
        top: 2em;
        scale: .95;
    }

    100% {
        left: 2em;
        top: .8em;
        scale: .95;
    }
}
</style>
