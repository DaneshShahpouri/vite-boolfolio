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
                        project.layout_color
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
            let cerchioTop = document.getElementById('cerchio-top')
            let cerchioBottom = document.getElementById('cerchio-bottom')
            let cerchioHiddenTop = document.getElementById('cerchio-top-hidden')
            let cerchioHiddenBottom = document.getElementById('cerchio-bottom-hidden')
            let bg = document.getElementById('background')


            switch (this.store.confArray[this.store.contatoreBackground][0]) {
                case 'showroom':
                    cerchioTop.style = "top:-30%; left:-20%;scale:3;"
                    cerchioBottom.style = "bottom:0%; right:0%; scale:2;"
                    break;
                case 'projects':
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
                cerchioHiddenBottom.style = "display:block; background-color:rgba(0, 0, 0, 0) ;bottom:-40%; right:20%; scale:2.4;border:1px solid white"
                cerchioHiddenTop.style = "display:block; background-color:rgba(0, 0, 0, 0) ;top:-10%; left:10%; scale:2.8; border:1px solid white"
                //---------------

                cerchioTop.style = "top:-10%; left:10%; scale:2.8; border:1px solid white"
                cerchioBottom.style = "bottom:-40%; right:20%; scale:2.4;border:1px solid white"
                cerchioTop.classList.add('cerchio-top-animazione')
                cerchioTop.style = "background-color:rgba(255, 255, 255, 0.1); border:none;"
                cerchioBottom.style = "background-color:rgba(255, 255, 255, 0.1);border:none;"
                cerchioBottom.classList.add('cerchio-bottom-animazione')
                bg.style = "background-color:" + this.store.confArray[this.store.contatoreBackground][4];

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
            } else {
                // navbar.classList.remove('navbar-dark')
                //Cerchi nascossti
                cerchioHiddenBottom.style = "display:block; background-color:rgba(160, 160, 160, 0.1) ;bottom:-40%; right:20%; scale:2.4;border:1px solid white; border:none"
                cerchioHiddenTop.style = "display:block; background-color:rgba(160, 160, 160, 0.1) ;top:-10%; left:10%; scale:2.8; border:1px solid white; border:none"
                cerchioHiddenTop.classList.add('cerchio-top-animazione-hidden')
                cerchioHiddenBottom.classList.add('cerchio-bottom-animazione-hidden')
                //---------------
                bg.style = "background-color:white";
            }

            if (this.store.confArray[this.store.contatoreBackground][0] == 'extra') {
                cerchioHiddenBottom.style = "display:block; background-color:rgba(0, 0, 255, 0.3);bottom:-40%; right:20%; scale:2.4;border:1px solid white; border:none"
                cerchioHiddenTop.style = "display:block; background-color:rgba(255, 0, 0, 0.3) ;top:-10%; left:10%; scale:2.8; border:1px solid white; border:none"
            }
        },

        //Animazione Aggiungi classe
        //Scroll Verticale
        // Dal centro al basso
        scrollElCenterDown(elemento) {
            elemento.classList.add('move-center-top');
            let disbandClass = setTimeout(() => {
                elemento.classList.remove('move-center-top');
            }, 1200);
        },
        // Dal centro al alto
        scrollElCenterUp(elemento) {
            elemento.classList.add('move-center-bottom');
            let disbandClass = setTimeout(() => {
                elemento.classList.remove('move-center-bottom');
            }, 1200);
        },
        //Dall alto al centro
        scrollElTopCenter(elemento) {
            elemento.classList.add('move-top-center');
            let disbandClass = setTimeout(() => {
                elemento.classList.remove('move-top-center');
            }, 1200);
        },
        //Dall basso al centro
        scrollElBottomCenter(elemento) {
            elemento.classList.add('move-bottom-center');
            let disbandClass = setTimeout(() => {
                elemento.classList.remove('move-bottom-center');
            }, 1200);
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
                }, 1900)

                let changeIndex = setTimeout(() => {
                    this.store.contatoreOrizzontale = index;
                }, 900)

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
                }, 2200)

                let changeIndex = setTimeout(() => {

                    this.store.contatore = index;

                    this.store.contatoreOrizzontale = 0
                }, 900)

                this.store.contatoreBackground = index
                this.backgroundAnimation();
                this.store.contatoreBackgroundOrizzontale = 0;
            }
        },


    },

    created() {
        window.onwheel = event => {
            if (event.deltaY >= 0) {
                this.scrollTo(this.store.contatore + 1)

            } else {
                //
                this.scrollTo(this.store.contatore - 1)
            }
        },

            this.getImpProjects(),
            this.setPrecontatore();
    },

    mounted() {
        //Animazione Background
        this.backgroundAnimation();
        this.store.contatore = 0;
        this.postcontatore = 1;
        this.precontatore = this.store.confArray.length - 1;
        this.store.contatoreBackground = 0;
        this.backgroundAnimation()
        //console.log('mounted fatto')
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
            <div class="counter-box hidden d-flex justify-content-center align-item-center" id="mini-counter">
                <div v-for="(pic, index) in store.confArray[store.contatoreBackground][3]"
                    class="border-circle-mini-wrapper" @click="scrollLeftRight(index)">
                    <div class="border-circle-mini"
                        :class="this.store.contatoreBackgroundOrizzontale == index ? 'active' : ''"
                        :style="store.confArray[store.contatoreBackground][2] ? 'background-color:white' : ''"></div>
                </div>
            </div>
            <!-- Counter -->
            <div class="counter-box d-flex justify-content-center align-item-center" id="counter">
                <div v-for="(page, index) in store.confArray" class="border-circle-wrapper" @click="scrollTo(index)">
                    <div class="border-circle" :class="this.store.contatoreBackground == index ? 'active' : ''"
                        :style="store.confArray[this.store.contatoreBackground][2] ? 'background-color:white' : ''"></div>
                </div>
            </div>

            <!-- Bottoni -->
            <button v-if="store.confArray[store.contatore][2]" class="btn btn-arrow-left"
                @click="scrollLeftRight((store.contatoreOrizzontale - 1))"
                :style="store.contatoreOrizzontale > 0 ? 'transition: all 1s; opacity:1;' : 'transition: all 1s; opacity:.3;cursor:auto'"><i
                    class="fa-solid fa-caret-left rounded-circle"></i></button>
            <button v-if="store.confArray[store.contatore][2]" class="btn btn-arrow-right"
                @click="scrollLeftRight((store.contatoreOrizzontale + 1))"
                :style="store.contatoreOrizzontale < store.confArray[store.contatore][3].length - 1 ? 'transition: all 1s; opacity:1;' : 'transition: all 1s; opacity:.3;cursor:auto'"><i
                    class="fa-solid fa-caret-right rounded-circle"></i></button>

            <!-- screen -->
            <!-- sopra -->
            <div class="__container p-pre"
                :class="store.confArray[precontatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-pre">
                <h1 :style="store.confArray[this.precontatore][2] ? 'color:white' : ''"
                    :class="store.confArray[this.precontatore][2] ? 'ombra-titolo' : 'bordo-bianco title ombra-titolo'">{{
                        this.store.confArray[this.precontatore][2] ?
                        this.store.confArray[this.precontatore][3][0] :
                        this.store.confArray[this.precontatore][0] }}</h1>
                <span :style="store.confArray[this.precontatore][2] ? 'width:55%;color:white' : 'width:auto'"
                    class="_my_container-main">{{
                        this.store.confArray[this.precontatore][1] }}</span>

                <div v-if="this.store.confArray[this.precontatore][2] && this.store.contatoreOrizzontale == 0"
                    class="container w-50 d-flex flex-column align-items-center justify-content-center" id="spansecondario">
                    <!-- Tipo -->
                    <div class="types d-flex">
                        <h5 class="text-white">Tipologia_</h5>
                        <h5 class="text-white">{{ this.store.confArray[this.precontatore][6].name }}</h5>
                    </div>

                    <!-- Tecnologie -->
                    <div class="technologies d-flex">
                        <h4 class="text-white mr-3">Tecnologie_</h4>
                        <div class="badge-wrapper ml-3">
                            <span class="badge" v-for="element in this.store.confArray[this.precontatore][5]"
                                :style="'background-color:rgb(50, 50, 50); border: 1px solid' + element[1] + ';color:' + element[1]">{{
                                    element[0] }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Centrale -->
            <div v-if="this.store.contatoreOrizzontale == 0" class="__container p-center"
                :class="store.confArray[store.contatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-1">
                <h1 :style="store.confArray[this.store.contatore][2] ? 'color:white;' : ''"
                    :class="store.confArray[store.contatore][2] ? 'ombra-titolo' : 'bordo-bianco title'">{{
                        this.store.confArray[this.store.contatore][2] ?
                        this.store.confArray[this.store.contatore][3][0] :
                        this.store.confArray[this.store.contatore][0] }}</h1>
                <span :style="store.confArray[this.store.contatore][2] ? 'width:55%;color:white' : 'width:auto'"
                    class=" _my_container-main">{{
                        this.store.confArray[this.store.contatore][1] }}</span>


                <div v-if="this.store.confArray[this.store.contatore][2] && this.store.contatoreOrizzontale == 0"
                    class="container w-50 d-flex flex-column align-items-center justify-content-center" id="spansecondario">
                    <!-- Tipo -->
                    <div class="types d-flex">
                        <h5 class="text-white">Tipologia_</h5>
                        <h5 class="text-white">{{ this.store.confArray[this.store.contatore][6].name }}</h5>
                    </div>

                    <!-- Tecnologie -->
                    <div class="technologies d-flex">
                        <h4 class="text-white mr-3">Tecnologie_</h4>
                        <div class="badge-wrapper ml-3">
                            <span class="badge" v-for="element in this.store.confArray[this.store.contatore][5]"
                                :style="'background-color:rgb(50, 50, 50); border: 1px solid' + element[1] + ';color:' + element[1]">{{
                                    element[0] }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="__container p-center 'justify-content-center align-items-center" id="container-1">
                <div class="container img-wrapper">
                    <img :src="store.confArray[store.contatore][3][store.contatoreOrizzontale]" alt="prova">
                </div>
            </div>

            <!-- Sotto -->
            <div class="__container p-post"
                :class="store.confArray[postcontatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-post">
                <h1 :style="store.confArray[this.postcontatore][2] ? 'color:white' : ''"
                    :class="store.confArray[postcontatore][2] ? 'ombra-titolo' : 'bordo-bianco title'">{{
                        this.store.confArray[this.postcontatore][2] ?
                        this.store.confArray[this.postcontatore][3][0] :
                        this.store.confArray[this.postcontatore][0] }}</h1>
                <span :style="store.confArray[this.postcontatore][2] ? 'width:55%;color:white' : 'width:auto'"
                    class="_my_container-main">{{
                        this.store.confArray[this.postcontatore][1] }}</span>

                <div v-if="this.store.confArray[this.postcontatore][2] && this.store.contatoreOrizzontale == 0"
                    class="container w-50 d-flex flex-column align-items-center justify-content-center" id="spansecondario">
                    <!-- Tipo -->
                    <div class="types d-flex">
                        <h5 class="text-white">Tipologia_</h5>
                        <h5 class="text-white">{{ this.store.confArray[this.postcontatore][6].name }}</h5>
                    </div>

                    <!-- Tecnologie -->
                    <div class="technologies d-flex">
                        <h4 class="text-white ml-3">Tecnologie_</h4>
                        <div class="badge-wrapper ml-3">
                            <span class="badge" v-for="element in this.store.confArray[this.postcontatore][5]"
                                :style="'background-color:rgb(50, 50, 50); border: 1px solid' + element[1] + ';color:' + element[1]">{{
                                    element[0] }}</span>
                        </div>
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
                        :class="store.confArray[store.contatore][2] ? 'ombra-titolo' : 'bordo-bianco title'">{{
                            this.store.confArray[this.store.contatore][2] ?
                            this.store.confArray[this.store.contatore][3][0] :
                            this.store.confArray[this.store.contatore][0] }}</h1>
                    <span :style="store.confArray[this.store.contatore][2] ? 'width:55%;color:white' : 'width:auto'"
                        class=" _my_container-main">{{
                            this.store.confArray[this.store.contatore][1] }}</span>

                    <div v-if="this.store.confArray[this.store.contatore][2] && this.precontatoreOrizzontale == 0"
                        class="container w-50 d-flex flex-column align-items-center justify-content-center"
                        id="spansecondario">
                        <!-- Tipo -->
                        <div class="types d-flex">
                            <h5 class="text-white">Tipologia_</h5>
                            <h5 class="text-white">{{ this.store.confArray[this.store.contatore][6].name }}</h5>
                        </div>

                        <!-- Tecnologie -->
                        <div class="technologies d-flex">
                            <h4 class="text-white mr-3">Tecnologie_</h4>
                            <div class="badge-wrapper ml-3">
                                <span class="badge" v-for="element in this.store.confArray[this.store.contatore][5]"
                                    :style="'background-color:rgb(50, 50, 50); border: 1px solid' + element[1] + ';color:' + element[1]">{{
                                        element[0] }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="__container p-left"
                :class="store.confArray[store.contatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-left">
                <h1 :style="store.confArray[this.store.contatore][2] ? 'color:white' : ''"
                    :class="store.confArray[store.contatore][2] ? 'ombra-titolo' : 'bordo-bianco title'">{{
                        this.store.confArray[this.store.contatore][2] ?
                        this.store.confArray[this.store.contatore][3][0] :
                        this.store.confArray[this.store.contatore][0] }}</h1>
                <span :style="store.confArray[this.store.contatore][2] ? 'width:55%;color:white' : 'width:auto'"
                    class=" _my_container-main">{{
                        this.store.confArray[this.store.contatore][1] }}</span>
            </div>


            <!-- Destra -->
            <div v-if="this.store.confArray[this.store.contatore][3]"
                class="__container p-right 'justify-content-center align-items-center" id="container-right">
                <div class="container img-wrapper">
                    <img :src="this.store.confArray[this.store.contatore][3][this.postcontatoreOrizzontale]" alt="prova">
                </div>
            </div>
            <div v-else class="__container p-right"
                :class="store.confArray[store.contatore][2] ? '' : 'justify-content-center align-items-center p-5'"
                id="container-right">
                <h1 :style="store.confArray[this.store.contatore][2] ? 'color:white' : ''"
                    :class="store.confArray[store.contatore][2] ? 'ombra-titolo' : 'bordo-bianco title'">{{
                        this.store.confArray[this.store.contatore][2] ?
                        this.store.confArray[this.store.contatore][3][0] :
                        this.store.confArray[this.store.contatore][0] }}</h1>
                <span :style="store.confArray[this.store.contatore][2] ? 'width:55%;color:white' : 'width:auto'"
                    class=" _my_container-main">{{
                        this.store.confArray[this.store.contatore][1] }}</span>
            </div>
            <!-- screen -->

            <!-- Background -->
            <div class="background" id="background">
                <div class="background layout-black bg-dark" id="layout"
                    :style="this.store.contatoreBackgroundOrizzontale != 0 ? 'opacity:1; transition:all 1s' : 'opacity:0;transition:all 1s'">
                </div>
                <div class="cerchio hidden top-showroom" id="cerchio-top-hidden"></div>
                <div class="cerchio hidden bottom-showroom" id="cerchio-bottom-hidden"></div>
                <div class="cerchio top-showroom" id="cerchio-top"></div>
                <div class="cerchio bottom-showroom" id="cerchio-bottom"></div>
                <div class="cerchio cerchio-centro" id="cerchio-nav"></div>
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
    }

    .img-wrapper {
        height: 100%;
        height: 80vh;
        display: flex;
        padding: 0em;
        //padding-top: 1em;
        background-color: #000;
        border-radius: 10px;
        //border: 1px solid white;

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }

    // CounterIndexPrincipale
    .counter-box {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
        height: 30px;

        &#mini-counter {
            top: 6%;

            .border-circle-mini-wrapper {
                cursor: pointer;
                z-index: 4;
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
        }

        .border-circle-wrapper {
            cursor: pointer;
            z-index: 4;
            transition: all .4s;
            padding: 1.2em 1.7em;
            rotate: 45deg;

            .border-circle {
                border-radius: 50%;
                width: 7px;
                height: 7px;
                background: #000;
                transition: all 1s;
                opacity: .2;

            }

            &:hover {
                scale: 1.3;

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
        flex-direction: column;
        gap: 1em;

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
        animation: 1s moveCenterTop;
    }

    .move-center-bottom {
        animation: 1s moveCenterBottom;
    }

    .move-bottom-center {
        animation: 1s moveBottomCenter;
    }

    .move-top-center {
        animation: 1s moveTopCenter;
    }

    // Classi animazioni Orizzontali
    .move-center-left {
        animation: 1s moveCenterLeft;
    }

    .move-center-right {
        animation: 1s moveCenterRight;
    }

    .move-right-center {
        animation: 1s moveRightCenter;
    }

    .move-left-center {
        animation: 1s moveLeftCenter;
    }

}

#spansecondario {
    position: absolute;
    bottom: 25%;
    right: 10%;
}

.technologies {
    gap: 1em;

    span {
        margin: 0em .3em;
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

    &:hover {
        background-color: rgba(0, 0, 0, 0.135);
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

    &:hover {
        background-color: rgba(0, 0, 0, 0.135);
        color: rgba(255, 255, 255);
    }

    // transform: translateX(-100%);

}
</style>
