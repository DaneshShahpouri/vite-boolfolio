<script>
import { store } from '../store.js';
import axios from 'axios';
export default {
    name: 'AppHome',
    data() {
        return {
            store,
            prevProjects: [],

            //variabili globali
            precontatore: "",
            postcontatore: 1,
            precontatoreOrizzontale: "",
            postcontatoreOrizzontale: 1,

            isAnimated: false,
            contatoreProva: 0,
        }
    },


    methods: {
        //Chiamata  Axios
        getImpProjects() {
            axios.get('http://127.0.0.1:8000/api/home').then(response => {
                this.prevProjects = response.data.results;
                let newConf = [];


                newConf.push(this.store.newConfArray[0])
                newConf.push(this.store.newConfArray[1])

                this.prevProjects.forEach(project => {

                    let newEl = [
                        'projects',
                        project.description,
                        true,
                        [
                            project.title,
                            'http://127.0.0.1:8000/storage/' + project.cover_image,
                        ],
                        project.layout_color,

                    ];

                    let Eltechnologies = [];
                    //console.log(project)

                    project.technologies.forEach(technology => {
                        let singleTechnology = [
                            technology.name,
                            technology.color
                        ];
                        Eltechnologies.push(singleTechnology)
                    })

                    newEl.push(Eltechnologies),
                        newEl.push(project.type)
                    newEl.push(project.year)



                    newConf.push(newEl)

                });

                newConf.push(this.store.newConfArray[4])
                newConf.push(this.store.newConfArray[5])

                //console.log(newConf)
                this.store.confArray = newConf
            })
        },

        //Animazione Background
        //Gestisce le animazioni dello sfondo e alcuni caratteri estetici
        //Praticamente modulare, serve solo l'html di riferimento.
        backgroundAnimation() {
            if (this.store.currentPage == 'home') {

                let cerchioTop = document.getElementById('cerchio-top')
                let cerchioBottom = document.getElementById('cerchio-bottom')
                let cerchioHiddenTop = document.getElementById('cerchio-top-hidden')
                let cerchioHiddenBottom = document.getElementById('cerchio-bottom-hidden')
                let bg = document.getElementById('background')
                let layout = document.getElementById('layout')
                let layoutbg = document.getElementById('bottom-layer')
                let imgBg = document.getElementById('img-bg')


                switch (this.store.confArray[this.store.contatoreBackground][0]) {
                    case 'Welcome':
                        cerchioTop.style = "top:-30%; left:-20%;scale:3;"
                        cerchioBottom.style = "bottom:0%; right:0%; scale:2;"
                        break;
                    case 'works':
                        cerchioTop.style = "top:-10%; left:10%; scale:2.8;"
                        cerchioBottom.style = "bottom:-40%; right:20%; scale:2.4;"
                        break;
                    case 'contacts':
                        cerchioTop.style = "top:-10%; left:10%; scale:2.8;"
                        cerchioBottom.style = "bottom:-40%; right:20%; scale:2.4;"
                        break;
                    case 'extra':
                        cerchioTop.style = "top:-30%; left:50%;scale:2.4;"
                        cerchioBottom.style = "bottom:0%; right:40%; scale:2.3;"
                        break;
                }



                if (this.store.confArray[this.store.contatoreBackground][2] == true) {
                    // navbar.classList.add('navbar-dark')
                    //Cerchi nascossti
                    //console.log(this.store.contatoreBackgroundOrizzontale)
                    if (this.store.contatoreBackgroundOrizzontale == 0) {

                        cerchioHiddenBottom.style = "display:block; background-color:rgba(0, 0, 0, 0) ;bottom:-40%; right:20%; scale:2.4;border:1px solid white"
                        cerchioHiddenTop.style = "display:block; background-color:rgba(0, 0, 0, 0) ;top:-10%; left:10%; scale:2.8; border:1px solid white"
                        //---------------

                        cerchioTop.style = "top:-10%; left:10%; scale:2.8; border:1px solid white"

                        cerchioTop.classList.add('cerchio-top-animazione')
                        cerchioTop.style = "background-color:rgba(255, 255, 255, 0.1); border:none;"
                        cerchioBottom.classList.add('cerchio-bottom-animazione')
                        cerchioBottom.style = "background-color:rgba(255, 255, 255, 0.1);border:none; bottom:-40%; right:20%; scale:2.4;"
                        //img background works
                        bg.style = "background-color:" + this.store.confArray[this.store.contatoreBackground][4];
                        if (imgBg) {
                            imgBg.style = 'opacity:0'
                        }
                        // setTimeout(() => {
                        //     layoutbg.style = 'background: linear-gradient(#ffffff00 60%, ' + this.store.confArray[this.store.contatoreBackground][4] + ' 85%);opacity : 0';
                        // }, 100)
                        setTimeout(() => {
                            if (imgBg) {
                                imgBg.style = 'opacity:1'
                            }
                        }, 700)

                        setTimeout(() => {
                            layoutbg.style = 'background: linear-gradient(#ffffff00 60%, ' + this.store.confArray[this.store.contatoreBackground][4] + ' 85%);opacity : 1'
                        }, 200)



                    } else {
                        cerchioTop.style = 'opacity:0';
                        cerchioHiddenTop.style = 'opacity:0';
                        cerchioBottom.style = 'opacity:0; bottom:-40%; right:20%; scale:2.4;';
                        cerchioHiddenBottom.style = 'opacity:0';
                        bg.style = 'background-color:#05050a;'
                        layout.style = 'opacity:0; background-color:#05050a;';
                    }

                } else if (cerchioTop.classList.contains('cerchio-top-animazione')) {
                    // navbar.classList.remove('navbar-dark')
                    cerchioTop.classList.remove('cerchio-top-animazione')
                    cerchioBottom.classList.remove('cerchio-bottom-animazione')
                    //Cerchi nascossti
                    cerchioHiddenBottom.style = "display:block; background-color:rgba(160, 160, 160, 0.1) ;bottom:-40%; right:20%; scale:2.4;border:1px solid white; border:none"
                    cerchioHiddenTop.style = "display:block; background-color:rgba(160, 160, 160, 0.1) ;top:-10%; left:10%; scale:2.8; border:1px solid white; border:none"
                    cerchioHiddenTop.classList.add('cerchio-top-animazione-hidden')
                    cerchioHiddenBottom.classList.add('cerchio-bottom-animazione-hidden')
                    //---------------
                    bg.style = "background-color:white";

                    setTimeout(() => {
                        layoutbg.style = 'background: linear-gradient(#ffffff00 60%, ' + this.store.confArray[this.store.contatoreBackground][4] + ' 85%);opacity : 0';
                    }, 200)
                } else {
                    // navbar.classList.remove('navbar-dark')
                    //Cerchi nascossti
                    cerchioHiddenBottom.style = "display:block; background-color:rgba(160, 160, 160, 0.1) ;bottom:-40%; right:20%; scale:2.4;border:1px solid white; border:none"
                    cerchioHiddenTop.style = "display:block; background-color:rgba(160, 160, 160, 0.1) ;top:-10%; left:10%; scale:2.8; border:1px solid white; border:none"
                    cerchioHiddenTop.classList.add('cerchio-top-animazione-hidden')
                    cerchioHiddenBottom.classList.add('cerchio-bottom-animazione-hidden')
                    //---------------
                    bg.style = "background-color:white";

                    if (layoutbg) {
                        setTimeout(() => {
                            layoutbg.style = 'background: linear-gradient(#ffffff00 60%, ' + this.store.confArray[this.store.contatoreBackground][4] + ' 85%);opacity : 0';
                        }, 200)
                    }
                }

                if (this.store.confArray[this.store.contatoreBackground][0] == 'extra') {
                    cerchioHiddenBottom.style = "display:block; background-color:rgba(0, 0, 255, 0.3);bottom:-40%; right:20%; scale:2.4;border:1px solid white; border:none"
                    cerchioHiddenTop.style = "display:block; background-color:rgba(255, 0, 0, 0.3) ;top:-10%; left:10%; scale:2.8; border:1px solid white; border:none"
                }

            }
        },

        //Animazione Aggiungi classe
        //Scroll Verticale
        // Dal centro al basso
        scrollElCenterDown(elemento) {
            if (elemento) {
                elemento.classList.add('move-center-top');
                let disbandClass = setTimeout(() => {
                    elemento.classList.remove('move-center-top');
                }, 1200);
            }
        },
        // Dal centro al alto
        scrollElCenterUp(elemento) {
            if (elemento) {
                elemento.classList.add('move-center-bottom');
                let disbandClass = setTimeout(() => {
                    elemento.classList.remove('move-center-bottom');
                }, 1200);
            }
        },
        //Dall alto al centro
        scrollElTopCenter(elemento) {
            if (elemento) {
                elemento.classList.add('move-top-center');
                let disbandClass = setTimeout(() => {
                    elemento.classList.remove('move-top-center');
                }, 1200);
            }
        },
        //Dall basso al centro
        scrollElBottomCenter(elemento) {
            if (elemento) {
                elemento.classList.add('move-bottom-center');
                let disbandClass = setTimeout(() => {
                    elemento.classList.remove('move-bottom-center');
                }, 1200);
            }
        },
        //Scroll Orizzontale
        // Dal centro a sinistra
        scrollElCenterLeft(elemento) {
            elemento.classList.add('move-center-left');
            let disbandClass = setTimeout(() => {
                elemento.classList.remove('move-center-left');
            }, 1200);
        },
        // Dal centro a destra
        scrollElCenterRight(elemento) {
            elemento.classList.add('move-center-right');
            let disbandClass = setTimeout(() => {
                elemento.classList.remove('move-center-right');
            }, 1200);
        },
        // Dal  destra a centro
        scrollElRightCenter(elemento) {
            elemento.classList.add('move-right-center');
            let disbandClass = setTimeout(() => {
                elemento.classList.remove('move-right-center');
            }, 1200);
        },
        // Dal  destra a centro
        scrollElLeftCenter(elemento) {
            elemento.classList.add('move-left-center');
            let disbandClass = setTimeout(() => {
                elemento.classList.remove('move-left-center');
            }, 1200);
        },

        checkContatori() {
            this.postcontatore = this.store.contatore + 1;
            this.precontatore = this.store.contatore - 1;

            if (this.store.contatore == 0) {
                this.precontatore = this.store.confArray.length - 1
            } else if (this.store.contatore == this.store.confArray.length - 1) {
                this.postcontatore = 0
            }

        },

        checkContatoriOrizzontali() {
            if (this.store.confArray[this.store.contatore][2]) {
                this.postcontatoreOrizzontale = this.store.contatoreOrizzontale + 1;
                this.precontatoreOrizzontale = this.store.contatoreOrizzontale - 1;

                if (this.store.contatoreOrizzontale == 0) {
                    this.precontatoreOrizzontale = this.store.confArray[this.store.contatore][3].length - 1
                } else if (this.store.contatoreOrizzontale == this.store.confArray[this.store.contatore][3].length - 1) {
                    this.postcontatoreOrizzontale = 0
                }
            }

        },

        //setter
        setPrecontatore() {
            this.precontatore = parseInt(this.store.confArray.length - 1)
        },

        //Slide ORizzntale
        scrollLeftRight(index) {
            if (this.isAnimated == false && index >= 0 && index < this.store.confArray[this.store.contatore][3].length) {
                this.isAnimated = true;

                this.precontatoreOrizzontale = index;
                this.postcontatoreOrizzontale = index;

                if (index <= this.store.contatoreOrizzontale) {
                    let MainScrollableEl = document.getElementById('container-1');
                    let LeftScrollableEl = document.getElementById('container-left');

                    this.scrollElCenterRight(MainScrollableEl)
                    this.scrollElRightCenter(LeftScrollableEl);
                } else {
                    let MainScrollableEl = document.getElementById('container-1');
                    let RightScrollableEl = document.getElementById('container-right')


                    this.scrollElCenterLeft(MainScrollableEl)
                    this.scrollElLeftCenter(RightScrollableEl);

                }


                let timer = setTimeout(() => {
                    this.isAnimated = false
                    this.checkContatoriOrizzontali()
                }, 1000)

                let changeIndex = setTimeout(() => {
                    this.store.contatoreOrizzontale = index;
                }, 700)

                //this.checkContatoriOrizzontali()
                this.store.contatoreBackgroundOrizzontale = this.precontatoreOrizzontale
                this.backgroundAnimation();
            }
        },
        //scroll
        scrollTo(index) {
            if (this.isAnimated == false) {
                this.isAnimated = true;
                //animazione


                if (index < 0) {
                    this.precontatore = this.store.confArray.length - 1
                    this.postcontatore = 1;
                } else if (index == 0) {
                    this.precontatore = index
                    this.postcontatore = 1;
                } else if (index > this.store.confArray.length - 1) {
                    this.postcontatore = 0;
                    this.precontatore = index - 1
                } else if (index == this.store.confArray.length - 1) {
                    this.postcontatore = index;
                    this.precontatore = index - 1
                } else {
                    this.postcontatore = index;
                    this.precontatore = index;
                }


                if (index >= this.store.contatore) {

                    let MainScrollableEl = document.getElementById('container-1');
                    let BottomScrollableEl = document.getElementById('container-post');
                    this.scrollElCenterDown(MainScrollableEl);
                    this.scrollElBottomCenter(BottomScrollableEl);
                } else {

                    let MainScrollableEl = document.getElementById('container-1');
                    let TopScrollableEl = document.getElementById('container-pre');
                    this.scrollElCenterUp(MainScrollableEl)
                    this.scrollElTopCenter(TopScrollableEl);
                }

                if (index < 0) {
                    index = this.store.confArray.length - 1
                } else if (index > this.store.confArray.length - 1) {
                    index = 0
                }

                //reset della variabile is animated e check
                let timer = setTimeout(() => {
                    this.isAnimated = false
                    this.checkContatori()
                }, 1000)



                let changeIndex = setTimeout(() => {

                    this.store.contatore = index;

                    this.store.contatoreOrizzontale = 0
                }, 700)

                this.store.contatoreBackground = index
                this.store.contatoreBackgroundOrizzontale = 0;
                this.backgroundAnimation();

                // clearTimeout(timer);

            }
        },

    },

    created() {
        if (this.$route.name == 'home') {
            window.onwheel = event => {
                if (event.deltaY >= 90) {
                    this.scrollTo(this.store.contatore + 1)
                }
                else if (event.deltaY <= -90) {
                    this.scrollTo(this.store.contatore - 1)
                }
            }
        };

        this.getImpProjects();
        this.setPrecontatore();
    },

    mounted() {
        //Animazione Background
        this.store.contatore = 0;
        this.postcontatore = 1;
        this.precontatore = this.store.confArray.length - 1;
        this.store.contatoreBackground = 0;

        this.store.currentPage = 'home';
        this.backgroundAnimation();

        //Movimento frecce
        if (this.store.currentPage == 'home') {
            window.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case "ArrowLeft":
                        if (this.store.confArray[this.store.contatore][2]) {
                            this.scrollLeftRight(this.store.contatoreOrizzontale - 1)
                        }
                        break;

                    case "ArrowRight":
                        if (this.store.confArray[this.store.contatore][2]) {
                            this.scrollLeftRight(this.store.contatoreOrizzontale + 1)
                        }
                        break;

                    case "ArrowUp":
                        this.scrollTo(this.store.contatore - 1)
                        break

                    case "ArrowDown":
                        this.scrollTo(this.store.contatore + 1)
                        break;
                }
            });
        }
    },

    unmounted() {
        this.store.contatoreBackgroundOrizzontale = 0;
        this.store.contatoreBackground = 0;
        this.store.contatoreOrizzontale = 0;
        this.store.contatore = 0;

    }
}

</script>

<template>
    <div id="showroom">
        <!-- main -->
        <div class="_container-wrapper">
            <!-- minicounter -->
            <div class="counter-box hidden" id="mini-counter">
                <div v-for="(pic, index) in store.confArray[store.contatoreBackground][3]"
                    class="border-circle-mini-wrapper" @click="scrollLeftRight(index)">
                    <div class="border-circle-mini"
                        :class="this.store.contatoreBackgroundOrizzontale == index ? 'active' : ''"
                        :style="store.confArray[store.contatoreBackground][2] ? 'background-color:white' : ''"></div>
                </div>
            </div>
            <!-- Counter -->
            <div class="counter-box" id="counter">
                <div v-for="(page, index) in store.confArray" class="border-circle-wrapper" @click="scrollTo(index)">
                    <div class="border-circle" :class="this.store.contatoreBackground == index ? 'active' : ''"
                        :style="store.confArray[this.store.contatoreBackground][2] ? 'background-color:white' : ''"></div>
                    <span class="overspan" :style="store.confArray[this.store.contatoreBackground][2] ? 'color:white' : ''">
                        {{ (store.confArray[index][2] == false ? store.confArray[index][0] : store.confArray[index][3][0])
                        }}
                        <!-- {{ store.confArray[index][0] }} -->
                    </span>
                </div>
            </div>

            <!-- Bottoni -->
            <button v-if="store.confArray[store.contatore][2]" class="btn btn-arrow-left"
                @click="scrollLeftRight((store.contatoreOrizzontale - 1))"
                :style="store.contatoreOrizzontale > 0 ? 'transition: all 1s; opacity:1;' : 'transition: all 1s; opacity:0;cursor:auto; background:none'"><i
                    class="fa-solid fa-caret-left rounded-circle"></i></button>
            <button v-if="store.confArray[store.contatore][2]" class="btn btn-arrow-right"
                @click="scrollLeftRight((store.contatoreOrizzontale + 1))"
                :style="store.contatoreOrizzontale < store.confArray[store.contatore][3].length - 1 ? 'transition: all 1s; opacity:1;' : 'transition: all 1s; opacity:0;cursor:auto; background:none'"><i
                    class="fa-solid fa-caret-right rounded-circle"></i></button>

            <!-- screen -->
            <!-- sopra -->
            <div class="__container p-pre"
                :class="store.confArray[precontatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-pre">
                <h1 :style="store.confArray[this.precontatore][2] ? 'color:white' : ''"
                    :class="store.confArray[this.precontatore][2] ? '_my-title-works' : 'bordo-bianco title ombra-titolo'">
                    {{
                        this.store.confArray[this.precontatore][2] ?
                        this.store.confArray[this.precontatore][3][0] :
                        this.store.confArray[this.precontatore][0] }}</h1>
                <span
                    v-if="this.store.confArray[this.precontatore][0] != 'extra' && this.store.confArray[this.precontatore][0] != 'contacts'"
                    :style="store.confArray[this.precontatore][2] ? 'color:white' : 'width:70%; text-align:center'"
                    :class="store.confArray[this.precontatore][2] ? '_my-span-works' : '_my-span_title bordo-bianco'"
                    class="_my_container-main">{{
                        this.store.confArray[this.precontatore][1] }}</span>

                <a class="_youtube " target="_blank" href="https://www.youtube.com/channel/UC7aGxhtTV2eEZFpT2tlNFAA"
                    v-if="this.store.confArray[this.precontatore][0] == 'extra'"><i class="fa-brands fa-youtube"></i>
                    Youtube Channel</a>

                <div class="social-container" v-if="this.store.confArray[this.precontatore][0] == 'contacts'">
                    <a href="mailto:danesh.shahpouri@gmail.com" target="_blank" class="gmail bordo-bianco"><i
                            class="fa-regular fa-envelope"></i>
                        Danesh.Shahpouri@gmail.com</a>
                    <a href="https://github.com/DaneshShahpouri" target="_blank" class="github bordo-bianco">
                        <i class="fa-brands fa-github"></i>
                        Github/DaneshShahpouri</a>
                    <a href="https://www.linkedin.com/in/danesh-shahpouri/" target="_blank" class="linkedin bordo-bianco">
                        <i class="fa-brands fa-linkedin"></i>
                        linkedin/Danesh-shahpouri</a>
                </div>

                <div v-if="this.store.confArray[this.precontatore][2] && (this.store.contatoreOrizzontale == 0 || this.precontatoreOrizzontale == 0)"
                    class="_container" id="spansecondario">

                    <!-- Tecnologie -->
                    <div class="technologies d-flex mb-3">
                        <h4 class="text-light text-center mr-3">Technologies_</h4>
                        <div class="badge-wrapper text-center ml-3">
                            <span class="badge" v-for="element in this.store.confArray[this.precontatore][5]"
                                :style="'background-color: black;color:white'">{{
                                    element[0] }}</span>
                        </div>
                    </div>
                    <!-- Tipo -->
                    <div class="types d-flex mb-3">
                        <h4 class="text-light">Type_</h4>
                        <h3 class="text-light ms-3">{{ this.store.confArray[this.precontatore][6].name }}</h3>
                    </div>
                    <!-- Anno -->
                    <div class="_years d-flex align-items-center mb-3">
                        <h4 class="text-light">Year_</h4>
                        <h5 class="text-light ms-4">{{ this.store.confArray[this.precontatore][7] }}</h5>
                    </div>

                </div>
            </div>

            <!-- Centrale -->
            <div v-if="this.store.contatoreOrizzontale == 0" class="__container p-center"
                :class="store.confArray[store.contatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-1">
                <h1 :style="store.confArray[this.store.contatore][2] ? 'color:white' : ''"
                    :class="store.confArray[store.contatore][2] ? '_my-title-works' : 'bordo-bianco title'">
                    {{
                        this.store.confArray[this.store.contatore][2] ?
                        this.store.confArray[this.store.contatore][3][0] :
                        this.store.confArray[this.store.contatore][0] }}</h1>
                <span
                    v-if="this.store.confArray[this.store.contatore][0] != 'extra' && this.store.confArray[this.store.contatore][0] != 'contacts'"
                    :style="store.confArray[this.store.contatore][2] ? 'color:white' : 'width:70%; text-align:center'"
                    :class="store.confArray[this.store.contatore][2] ? '_my-span-works' : '_my-span_title bordo-bianco'"
                    class=" _my_container-main">{{
                        this.store.confArray[this.store.contatore][1] }}</span>

                <a class="_youtube " target="_blank" href="https://www.youtube.com/channel/UC7aGxhtTV2eEZFpT2tlNFAA"
                    v-if="this.store.confArray[this.store.contatore][0] == 'extra'"><i class="fa-brands fa-youtube"></i>
                    Youtube Channel</a>

                <div class="social-container" v-if="this.store.confArray[this.store.contatore][0] == 'contacts'">
                    <a href="mailto:danesh.shahpouri@gmail.com" class="gmail bordo-bianco"><i
                            class="fa-regular fa-envelope"></i>
                        Danesh.Shahpouri@gmail.com</a>
                    <a href="https://github.com/DaneshShahpouri" target="_blank" class="github bordo-bianco">
                        <i class="fa-brands fa-github"></i>
                        Github/DaneshShahpouri</a>
                    <a href="https://www.linkedin.com/in/danesh-shahpouri/" target="_blank" class="linkedin bordo-bianco">
                        <i class="fa-brands fa-linkedin"></i>
                        linkedin/Danesh-shahpouri</a>
                </div>


                <div v-if="this.store.confArray[this.store.contatore][2] && this.store.contatoreOrizzontale == 0"
                    class="_container" id="spansecondario">
                    <!-- Tecnologie -->
                    <div class="technologies d-flex mb-3">
                        <h4 class="text-light text-center mr-3">Technologies_</h4>
                        <div class="badge-wrapper text-center ml-3">
                            <span class="badge" v-for="element in this.store.confArray[this.store.contatore][5]"
                                :style="'background-color: black;color:white'">{{
                                    element[0] }}</span>
                        </div>
                    </div>
                    <!-- Tipo -->
                    <div class="types d-flex mb-3">
                        <h4 class="text-light">Type_</h4>
                        <h3 class="text-light ms-3">{{ this.store.confArray[this.store.contatore][6].name }}</h3>
                    </div>
                    <!-- Anno -->
                    <div class="_years d-flex align-items-center mb-3">
                        <h4 class="text-light">Year_</h4>
                        <h5 class="text-light ms-4">{{ this.store.confArray[this.store.contatore][7] }}</h5>
                    </div>



                </div>

            </div>
            <div v-else class="__container p-center 'justify-content-center align-items-center p-0" id="container-1">
                <div class="container img-wrapper">
                    <img :src="store.confArray[store.contatore][3][store.contatoreOrizzontale]" alt="prova">
                </div>
            </div>

            <!-- Sotto -->
            <div class="__container p-post"
                :class="store.confArray[postcontatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-post">
                <h1 :style="store.confArray[this.postcontatore][2] ? 'color:white' : ''"
                    :class="store.confArray[postcontatore][2] ? '_my-title-works' : 'bordo-bianco title'">
                    {{
                        this.store.confArray[this.postcontatore][2] ?
                        this.store.confArray[this.postcontatore][3][0] :
                        this.store.confArray[this.postcontatore][0] }}</h1>
                <span
                    v-if="this.store.confArray[this.postcontatore][0] != 'extra' && this.store.confArray[this.postcontatore][0] != 'contacts'"
                    :style="store.confArray[this.postcontatore][2] ? 'color:white' : 'width:70%; text-align:center'"
                    :class="store.confArray[this.postcontatore][2] ? '_my-span-works' : '_my-span_title bordo-bianco'"
                    class="_my_container-main">{{
                        this.store.confArray[this.postcontatore][1] }}</span>

                <a class="_youtube " target="_blank" href="https://www.youtube.com/channel/UC7aGxhtTV2eEZFpT2tlNFAA"
                    v-if="this.store.confArray[this.postcontatore][0] == 'extra'"><i class="fa-brands fa-youtube"></i>
                    Youtube Channel</a>

                <div class="social-container" v-if="this.store.confArray[this.postcontatore][0] == 'contacts'">
                    <a href="mailto:danesh.shahpouri@gmail.com" target="_blank" class="gmail bordo-bianco"><i
                            class="fa-regular fa-envelope"></i>
                        Danesh.Shahpouri@gmail.com</a>
                    <a href="https://github.com/DaneshShahpouri" target="_blank" class="github bordo-bianco">
                        <i class="fa-brands fa-github"></i>
                        Github/DaneshShahpouri</a>
                    <a href="https://www.linkedin.com/in/danesh-shahpouri/" target="_blank" class="linkedin bordo-bianco">
                        <i class="fa-brands fa-linkedin"></i>
                        linkedin/Danesh-shahpouri</a>
                </div>

                <div v-if="this.store.confArray[this.postcontatore][2] && (this.store.contatoreOrizzontale == 0 || this.precontatoreOrizzontale == 0)"
                    class="_container" id="spansecondario">
                    <!-- Tecnologie -->
                    <div class="technologies d-flex mb-3">
                        <h4 class="text-light text-center mr-3">Technologies_</h4>
                        <div class="badge-wrapper text-center ml-3">
                            <span class="badge" v-for="element in this.store.confArray[this.postcontatore][5]"
                                :style="'background-color: black;color:white'">{{
                                    element[0] }}</span>
                        </div>
                    </div>

                    <!-- Tipo -->
                    <div class="types d-flex mb-3">
                        <h4 class="text-light">Type_</h4>
                        <h3 class="text-light ms-3">{{ this.store.confArray[this.postcontatore][6].name }}</h3>
                    </div>

                    <!-- Anno -->
                    <div class="_years d-flex align-items-center mb-3">
                        <h4 class="text-light">Year_</h4>
                        <h5 class="text-light ms-4">{{ this.store.confArray[this.postcontatore][7] }}</h5>
                    </div>
                </div>
            </div>

            <!-- Sinistra -->
            <div v-if="this.store.confArray[this.store.contatore][3]">
                <div v-if="this.precontatoreOrizzontale > 0"
                    class="__container p-left 'justify-content-center align-items-center" id="container-left">
                    <div class="container img-wrapper">
                        <img :src="this.store.confArray[this.store.contatore][3][this.precontatoreOrizzontale]" alt="prova">
                    </div>
                </div>
                <div v-else class="__container p-left"
                    :class="store.confArray[store.contatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                    id="container-left">
                    <h1 :style="store.confArray[this.store.contatore][2] ? 'color:white' : ''"
                        :class="store.confArray[store.contatore][2] ? '_my-title-works' : 'bordo-bianco title'">
                        {{
                            this.store.confArray[this.store.contatore][2] ?
                            this.store.confArray[this.store.contatore][3][0] :
                            this.store.confArray[this.store.contatore][0] }}</h1>
                    <span
                        v-if="this.store.confArray[this.store.contatore][0] != 'extra' && this.store.confArray[this.store.contatore][0] != 'contacts'"
                        :style="store.confArray[this.store.contatore][2] ? 'color:white' : 'width:70%; text-align:center'"
                        :class="store.confArray[this.store.contatore][2] ? '_my-span-works' : '_my-span_title bordo-bianco'"
                        class=" _my_container-main">{{
                            this.store.confArray[this.store.contatore][1] }}</span>

                    <a class="_youtube " target="_blank" href="https://www.youtube.com/channel/UC7aGxhtTV2eEZFpT2tlNFAA"
                        v-if="this.store.confArray[this.store.contatore][0] == 'extra'"><i class="fa-brands fa-youtube"></i>
                        Youtube Channel</a>

                    <div class="social-container" v-if="this.store.confArray[this.store.contatore][0] == 'contacts'">
                        <a href="https://www.google.com/intl/it/gmail/about" target="_blank" class="gmail bordo-bianco"><i
                                class="fa-regular fa-envelope"></i>
                            Danesh.Shahpouri@gmail.com</a>
                        <a href="https://github.com/DaneshShahpouri" target="_blank" class="github bordo-bianco">
                            <i class="fa-brands fa-github"></i>
                            Github/DaneshShahpouri</a>
                        <a href="https://www.linkedin.com/in/danesh-shahpouri/" target="_blank"
                            class="linkedin bordo-bianco">
                            <i class="fa-brands fa-linkedin"></i>
                            linkedin/Danesh-shahpouri</a>
                    </div>

                    <div v-if="this.store.confArray[this.store.contatore][2] && this.precontatoreOrizzontale == 0"
                        class="_container" id="spansecondario">
                        <!-- Tecnologie -->
                        <div class="technologies d-flex mb-3">
                            <h4 class="text-light text-center mr-3">Technologies_</h4>
                            <div class="badge-wrapper text-center ml-3">
                                <span class="badge" v-for="element in this.store.confArray[this.store.contatore][5]"
                                    :style="'background-color: black;color:white'">{{
                                        element[0] }}</span>
                            </div>
                        </div>

                        <!-- Tipo -->
                        <div class="types d-flex mb-3">
                            <h4 class="text-light">Type_</h4>
                            <h3 class="text-light ms-3">{{ this.store.confArray[this.store.contatore][6].name }}
                            </h3>
                        </div>

                        <!-- Anno -->
                        <div class="_years d-flex align-items-center mb-3">
                            <h4 class="text-light">Year_</h4>
                            <h5 class="text-light ms-4">{{ this.store.confArray[this.store.contatore][7] }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="__container p-left"
                :class="store.confArray[store.contatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-left">
                <h1 :style="store.confArray[this.store.contatore][2] ? 'color:white' : ''"
                    :class="store.confArray[store.contatore][2] ? '_my-title-works' : 'bordo-bianco title'">
                    {{
                        this.store.confArray[this.store.contatore][2] ?
                        this.store.confArray[this.store.contatore][3][0] :
                        this.store.confArray[this.store.contatore][0] }}</h1>
                <span
                    v-if="this.store.confArray[this.store.contatore][0] != 'extra' && this.store.confArray[this.store.contatore][0] != 'contacts'"
                    :style="store.confArray[this.store.contatore][2] ? 'color:white' : 'width:70%; text-align:center'"
                    :class="store.confArray[this.postcontatore][2] ? '_my-span-works' : '_my-span_title bordo-bianco'"
                    class=" _my_container-main">{{
                        this.store.confArray[this.store.contatore][1] }}</span>

                <a class="_youtube " target="_blank" href="https://www.youtube.com/channel/UC7aGxhtTV2eEZFpT2tlNFAA"
                    v-if="this.store.confArray[this.store.contatore][0] == 'extra'"><i class="fa-brands fa-youtube"></i>
                    Youtube Channel</a>

                <div class="social-container" v-if="this.store.confArray[this.store.contatore][0] == 'contacts'">
                    <a href="https://www.google.com/intl/it/gmail/about" target="_blank" class="gmail bordo-bianco"><i
                            class="fa-regular fa-envelope"></i>
                        Danesh.Shahpouri@gmail.com</a>
                    <a href="https://github.com/DaneshShahpouri" target="_blank" class="github bordo-bianco">
                        <i class="fa-brands fa-github"></i>
                        Github/DaneshShahpouri</a>
                    <a href="https://www.linkedin.com/in/danesh-shahpouri/" target="_blank" class="linkedin bordo-bianco">
                        <i class="fa-brands fa-linkedin"></i>
                        linkedin/Danesh-shahpouri</a>
                </div>
            </div>


            <!-- Destra -->
            <div v-if="this.store.confArray[this.store.contatore][3]"
                class="__container p-right 'justify-content-center align-items-center p-0" id="container-right">
                <div class="container img-wrapper">
                    <img :src="this.store.confArray[this.store.contatore][3][this.postcontatoreOrizzontale]" alt="prova">
                </div>
            </div>
            <div v-else class="__container p-right"
                :class="store.confArray[store.contatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-right">
                <h1 :style="store.confArray[this.store.contatore][2] ? 'color:white' : ''"
                    :class="store.confArray[store.contatore][2] ? 'bordo-nero ombra-titolo _my-title-works' : 'bordo-bianco title'">
                    {{
                        this.store.confArray[this.store.contatore][2] ?
                        this.store.confArray[this.store.contatore][3][0] :
                        this.store.confArray[this.store.contatore][0] }}</h1>
                <span v-if="this.store.confArray[this.store.contatore][0] != 'extra'"
                    :style="store.confArray[this.store.contatore][2] ? 'width:45%;color:white;margin:4em; padding:1em;' : 'width:70%; text-align:center'"
                    class=" _my_container-main">{{
                        this.store.confArray[this.store.contatore][1] }}</span>

                <a class="_youtube " target="_blank" href="https://www.youtube.com/channel/UC7aGxhtTV2eEZFpT2tlNFAA"
                    v-else><i class="fa-brands fa-youtube"></i> Youtube Channel</a>
            </div>
            <!-- screen -->

            <!-- Background -->
            <div class="background" id="background">
                <div class="background layout-black bg-dark" id="layout"
                    :style="this.store.contatoreBackgroundOrizzontale != 0 ? 'opacity:0.2; transition:all 1s' : 'opacity:0;transition:all 1s'">
                </div>
                <div class="cerchio hidden top-showroom" id="cerchio-top-hidden"></div>
                <div class="cerchio hidden bottom-showroom" id="cerchio-bottom-hidden"></div>
                <div class="cerchio top-showroom" id="cerchio-top"></div>
                <div class="cerchio bottom-showroom" id="cerchio-bottom">
                    <div class="_bottom-slayer" id="bottom-layer"
                        v-if="this.store.contatoreBackground != 0 && this.store.contatoreBackground != (this.store.confArray.length - 1)">
                    </div>
                    <div class="_bottom-slayer-bottom"
                        :style="this.store.confArray[this.store.contatoreBackground][4] ? 'background-color:' + this.store.confArray[this.store.contatoreBackground][4] : 'background-color:rgb(0,0,0,0)'"
                        v-if="this.store.contatoreBackground != 0 && this.store.contatoreBackground != (this.store.confArray.length - 1)">

                    </div>
                    <img id="img-bg"
                        :src="this.store.confArray[this.store.contatore][3] ? this.store.confArray[this.store.contatore][3][1] : ''"
                        alt="" :style="this.store.confArray[this.store.contatoreBackground][2] ? 'opacity:1' : 'opacity:0'"
                        v-if="this.store.contatoreBackground != 0 && this.store.contatoreBackground != (this.store.confArray.length - 1)">
                </div>
                <!-- <div class="cerchio cerchio-centro" id="cerchio-nav"></div> -->
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.navbar {
    position: absolute;
    top: 0%;
    left: 0;
    z-index: 2;
    width: 100vw;
    background: transparent;
}

#showroom {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .title {
        text-transform: uppercase;
        text-transform: capitalize;
    }

    ._my-title-works {
        margin-left: 2.2em;
        margin-top: .4em;
        margin-bottom: 0;
        text-shadow: 1px 1px 2px rgb(0, 0, 0, .2);
        //text-transform: uppercase;

        @media screen and (max-width: 991px) {
            text-align: center;
            margin-left: 0.2em;
            margin-top: 0.3em;
        }

        @media screen and (max-width: 492px) {
            margin-top: 1em;
        }
    }

    ._my-span_title {
        text-shadow: 1px 1px 2px white;
        position: relative;
        z-index: 2;
    }

    ._my-span-works {
        width: 45%;
        margin: 1em 3em;
        margin-top: 0;
        padding: 1em;
        text-align: center;
        border-bottom: 1px solid white;
        text-shadow: 1px 1px 2px rgb(0, 0, 0, .2);

        @media screen and (max-width: 991px) {
            width: auto;
            margin: 1em 1em;
            padding: 1em;
        }

        @media screen and (max-width: 562px) {
            padding: .5em;
            margin: .5em;
            font-size: .9em;
        }
    }

    .img-wrapper {
        height: 100%;
        height: 75vh;
        display: flex;
        padding: 0em;
        //padding-top: 1em;
        margin-top: 110px;
        //background-color: #000;
        border-radius: 10px;
        //border: 1px solid white;

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }

        @media screen and (max-width: 652px) {
            height: 100vh;
            margin-top: 0em;
        }
    }

    // CounterIndexPrincipale
    .counter-box {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 5;
        height: 30px;

        &:hover .border-circle-wrapper .overspan {
            opacity: .6;
        }

        &:hover .border-circle.active+.overspan {
            opacity: 1;
        }

        &#mini-counter {
            display: flex;
            justify-content: center;
            align-items: center;
            top: 70px;

            .border-circle-mini-wrapper {
                cursor: pointer;
                z-index: 6;
                transition: all .4s;

                padding: 1.2em 1.7em;

                .border-circle-mini {
                    background: #252525;
                    border-radius: 0%;
                    width: 4px;
                    height: 4px;
                    transition: all 1s;
                    opacity: .2;
                }

                &:hover {

                    .border-circle-mini {
                        scale: 1.5;
                        background: #00000093;
                        border-radius: 20%;
                        opacity: 1;
                    }
                }
            }

            .border-circle-mini.active {
                border-radius: 50%;
                width: 7px;
                height: 7px;
                box-shadow: 0px 0px 6px white;
                opacity: 1;
            }

            @media screen and (max-width: 652px) {
                display: none;
            }
        }

        .border-circle-wrapper {
            cursor: pointer;
            z-index: 6;
            transition: all .4s;
            padding: 1.2em 1.7em;
            rotate: 45deg;
            position: relative;


            .border-circle {
                border-radius: 50%;
                width: 7px;
                height: 7px;
                background: #000;
                transition: all 1s;
                opacity: .2;
            }

            .overspan {
                position: absolute;
                display: inline;
                text-align: center;
                text-transform: capitalize;
                font-size: 1npem;
                transition: all .7s;
                opacity: 0;
                transform: translateX(-50%);

                font-size: 0.65em;

                @media screen and (max-width:1200px) {
                    opacity: .7
                }
            }

            &:hover {
                scale: 1.3;

                .overspan {
                    opacity: .7;
                }

                .border-circle {
                    border-radius: 20%;
                    background: #00000093;
                    opacity: 1;
                }
            }
        }

        .border-circle.active {
            width: 10px;
            height: 10px;
            border-radius: 0%;
            opacity: 1;
        }

        @media screen and (max-width: 652px) {
            display: none;
        }
    }

    // fine CounterIndexPrincipale
    // Schermi
    .__container {
        position: absolute;
        z-index: 1;
        width: 100vw;
        height: 100vh;
        border-radius: 10px;
        padding: 6em 3em;
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 1em;

        @media screen and (max-width: 991px) {
            gap: .5em
        }

        @media screen and (max-width: 492px) {
            display: flex;
            justify-content: start;
            flex-direction: column;
            padding-top: 5em;
            padding: 3em 1.5em;
        }
    }

    // Posizioni
    .p-pre {
        bottom: 100vh;
        left: 0vw;
        // background-color: #1dd12353;
    }

    .p-center {
        bottom: 0vh;
        left: 0vw;
        // background-color: #d2111153;
    }

    .p-post {
        bottom: -100vh;
        left: 0vw;
        // background-color: #1dd12353;
    }

    .p-left {
        left: -100vw;
        bottom: 0vh;
    }

    .p-right {
        left: 100vw;
        bottom: 0vh;
    }

    #layout {
        opacity: 0;
        transition: all 1s;
    }

    .ombra-titolo {
        text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
    }

    .bordo-bianco {
        text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,
            1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
    }

    .bordo-nero {
        text-shadow: 2px 0 black, -2px 0 black, 0 2px black, 0 -2px black,
            1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black;
    }

    .bordo-bianco-transparente {
        text-shadow: 2px 0 #ffffff38, -2px 0 #ffffff38, 0 2px #ffffff38, 0 -2px #ffffff38,
            1px 1px #ffffff38, -1px -1px #ffffff38, 1px -1px #ffffff38, -1px 1px #ffffff38;
    }

    //-------------------------------------------------
    //Background

    .background {
        position: absolute;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(0, 9, 0, 0);
        transition: all .8s;

        .cerchio {
            position: absolute;
            border: 1px solid black;
            border-radius: 50%;

            scale: 2;
            background: transparent;

            width: 400px;
            height: 400px;
            transition: all .8s;
        }

        .cerchio-centro {
            width: 400px;
            height: 300px;
            top: -25%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #000000;
            scale: 1;
            transition: all .5s;
        }

        #cerchio-bottom {
            overflow: hidden;
            -webkit-mask-image: -webkit-radial-gradient(50% 50%, 280px 280px, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));

            @media screen and (max-width: 652px) {
                -webkit-mask-image: -webkit-radial-gradient(50% 65%, 270px 250px, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2));

                img {
                    object-position: 20px 15px;
                }
            }

            ._bottom-slayer {
                position: absolute;
                bottom: 250px;
                width: 100vh;
                height: 240px;
                z-index: 1;
                opacity: 1;
                transition: all .5s;

                @media screen and (max-width: 652px) {
                    display: none;
                }
            }

            ._bottom-slayer-bottom {
                position: absolute;
                bottom: 24px;
                width: 100vh;
                height: 226px;
                z-index: 1;
                opacity: 1;
                transition: all .5s;

                @media screen and (max-width: 652px) {
                    display: none;
                }
            }

            img {
                opacity: 1;
                object-fit: cover;
                width: 100%;
                animation: appear-bg .7s;
                transition: all 1.2s;
                scale: 1;

            }
        }

    }

    .cerchio-top-animazione {
        animation: cerchio-top 18s infinite;
    }

    .cerchio-bottom-animazione {
        animation: cerchio-bottom 15s infinite;
    }

    .cerchio-top-animazione-hidden {
        animation: cerchio-top-hidden 20s infinite;
    }

    .cerchio-bottom-animazione-hidden {
        animation: cerchio-bottom-hidden 20s infinite;
    }

    //-------------------------------------------------

    // Classi animazioni Verticali
    .move-center-top {
        animation: .8s moveCenterTop;
    }

    .move-center-bottom {
        animation: .8s moveCenterBottom;
    }

    .move-bottom-center {
        animation: .8s moveBottomCenter;
    }

    .move-top-center {
        animation: .8s moveTopCenter;
    }

    // Classi animazioni Orizzontali
    .move-center-left {
        animation: .8s moveCenterLeft;
    }

    .move-center-right {
        animation: .8s moveCenterRight;
    }

    .move-right-center {
        animation: .8s moveRightCenter;
    }

    .move-left-center {
        animation: .8s moveLeftCenter;
    }

}

#spansecondario {
    position: relative;
    width: 100%;
    padding: .5em 5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    h3,
    h4,
    h5 {
        text-shadow: 1px 1px 2px rgb(0, 0, 0, .2);
    }

    .badge-wrapper {
        width: 50%;
    }

    @media screen and (max-width: 992px) {
        align-items: flex-start;
        display: flex;
        flex-direction: row;
        gap: 2em;

        .badge-wrapper {
            width: 100%;
        }

        h4 {
            font-size: 1.3em;
        }

        h3 {
            font-size: 1.3em;
        }
    }

    @media screen and (max-width: 552px) {

        padding: 1em 1em;
        margin-top: .5em;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0em;

        h4 {
            font-size: 1.2em;
        }

        h3 {
            font-size: 1.2em;
        }
    }
}

.technologies {
    gap: 1em;


    span {
        //border: 1px solid white;
        margin: 0em .3em;
    }

    @media screen and (max-width: 991px) {
        flex-direction: column;
        gap: .3em;

    }
}

.router-link-exact-active {
    color: red;
}

//Btn
//btn arrow
.btn-arrow-left {
    position: absolute;
    left: 0%;
    top: 50%;
    width: 40px;
    height: 40px;
    margin-left: 1em;
    border: none;
    color: rgb(232, 226, 226);
    background-color: rgba(0, 0, 0, 0);
    z-index: 3;
    border-radius: 50%;
    scale: 1.5;

    &:hover {
        background-color: rgba(0, 0, 0, 0.9);
        color: rgba(255, 255, 255);
    }

    &:active {
        background-color: rgba(173, 173, 173);
        color: rgba(255, 255, 255);
    }
}


.btn-arrow-right {
    position: absolute;
    right: 0%;
    top: 50%;
    width: 40px;
    height: 40px;
    margin-right: 1em;
    border: none;
    color: rgb(232, 226, 226);
    background-color: rgba(0, 0, 0, 0);
    z-index: 3;
    border-radius: 50%;
    scale: 1.5;

    &:hover {
        background-color: rgba(0, 0, 0, 0.9);
        color: rgba(255, 255, 255);
    }

    &:active {
        background-color: rgba(173, 173, 173);
        color: rgba(255, 255, 255);
    }

    // transform: translateX(-100%);

}

._youtube {
    text-decoration: none;
    color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    text-shadow: -1px 1px 2px black;
    transition: all .4s;

    i {
        font-size: 2em;
        margin-right: .5em;
    }

    &:hover {
        text-shadow: -1px 1px 2px white;
        color: red;
    }
}

.social-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;

    a {
        text-decoration: none;
        color: black;
        padding: .2em 1em;
        border-radius: 15px;
        transition: all .3s;

        i {
            font-size: 1.5em;
            margin-right: .5em;
        }

        @media screen and (max-width:480px) {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }

    .gmail {
        &:hover {
            font-weight: 600;
            color: rgb(255, 81, 0);
        }
    }

    .github {
        &:hover {
            font-weight: 600;
            color: rgb(195, 0, 255);
        }
    }

    .linkedin {
        &:hover {
            font-weight: 600;
            color: rgb(0, 81, 255)
        }
    }
}
</style>
