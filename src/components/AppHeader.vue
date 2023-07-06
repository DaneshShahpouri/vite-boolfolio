<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            openSearchBar: false,
            tempProjects: [],
            openByugerMenu: false,
            isAwait: false,
        }
    },
    methods: {
        getTempProjects() {
            if (this.isAwait == false) {
                this.isAwait = true
                axios.get('http://127.0.0.1:8000/api/projects').then(response => {
                    this.store.projects = [];

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
                    this.isAwait = false

                });
            }

        },

        search() {
            this.store.isLoading = true;
            this.getTempProjects();
        },

        openMenu() {
            if (this.openByugerMenu) {
                this.openByugerMenu = false
            } else {
                this.openByugerMenu = true
            }
        }


    },
    mounted() {

    }
}
</script>

<template>
    <div class="navbar-wrapper d-flex justify-content-space-around"
        :class="this.$route.name == projects ? '_fixed' : '_absolute'">

        <nav class="navbar navbar-expand-lg "
            :class="this.$route.name == 'home' ? '_fixed navbar-dark' : '_fixed navbar-light'">
            <div class="container-fluid d-flex justify-content-space-around">

                <div class="logo-wrapper">
                    <h5 id="logo"
                        :style="store.confArray[store.contatoreBackground][2] ? 'color: white;' : 'color: black;'">DS</h5>
                    <div class="rombo"
                        :style="store.confArray[store.contatoreBackground][2] ? 'border: 1px solid white;' : 'border: 1px solid black;'">
                    </div>
                </div>

                <div id="navbarSupportedContent">
                    <div class="_burger-menu">
                        <i class="fa-solid fa-bars" v-if="this.openByugerMenu == false" @click="this.openMenu()"
                            :style="this.store.currentPage == 'home' ? 'color:white' : 'color:black'"></i>
                        <i class="fa-solid fa-xmark" v-else @click="this.openMenu()"
                            :style="this.store.currentPage == 'home' ? 'color:white' : 'color:black'"></i>
                    </div>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0"
                        :style="this.openByugerMenu ? (this.store.currentPage != 'home' ? 'display:flex; background-color:rgb(242, 242, 242)' : 'display:flex; background-color:black') : ''">
                        <li class="nav-item" @click="this.openByugerMenu = false">
                            <router-link class="nav-link text-center" :to="{ name: 'home' }"
                                :style="this.store.currentPage == 'home' ? 'color:white' : 'color:rgb(100, 100, 100)'">Home</router-link>
                        </li>
                        <li class="nav-item" @click="this.openByugerMenu = false">
                            <router-link class="nav-link text-center" :to="{ name: 'works' }"
                                :style="this.store.currentPage == 'projects' ? 'color:black' : 'color:rgb(100, 100, 100)'"
                                :class="this.store.currentPage == 'projects' ? 'router-link-active router-link-exact-active' : ''">Works</router-link>
                        </li>
                        <li class="nav-item" @click="this.openByugerMenu = false">
                            <router-link class="nav-link text-center" :to="{ name: 'about' }"
                                :style="this.store.currentPage == 'about' ? 'color:black' : 'color:rgb(100, 100, 100)'">About</router-link>
                        </li>
                    </ul>
                    <div class="cerchio" id="cerchio-nav"
                        :class="this.$route.name == 'home' ? 'cerchio-centro' : ' cerchio-centro-pr'">
                    </div>
                    <div class="layout-black" :style="this.$route.name == 'home' ? '' : ''"></div>
                </div>

                <form v-if="this.$route.name == 'works'" class="btn-wrapper" action="" @submit.prevent=" false">
                    <button class="btn btn-search" type="submit"
                        :class="store.confArray[store.contatoreBackground][2] || store.searchInput != '' ? 'btn-dark' : 'btn-light'"
                        :style="store.confArray[store.contatoreBackground][2] || store.searchInput != '' ? 'border:1px solid white' : ''">
                        <i class="fa-solid fa-magnifying-glass"></i></button>
                    <div class="btn-filler" :style="this.store.searchInput != '' ? 'height: 50px;' : ''"></div>
                    <div class="modulo-search">
                        <input v-model="store.searchInput" class="form-control" type="search" placeholder="Search"
                            aria-label="Search" :class="this.store.confArray[2] ? 'input-light' : 'input-dark'"
                            :style="store.searchInput == '' ? '' : 'opacity:1'" @change="search()">
                    </div>
                </form>
                <div v-else class="btn-wrapper"></div>
            </div>
        </nav>
    </div>
    <!-- Modulo Ricerca -->
</template>

<style  lang="scss" scoped>
._absolute {
    position: absolute;
}

._fixed {
    position: fixed;
}

._burger-menu {
    display: none;
    position: relative;
    z-index: 3;

    i {
        font-size: 2em;
        cursor: pointer;
        transition: all .5s;
    }

    @media screen and (max-width: 550px) {

        display: flex;
    }
}

.navbar-wrapper {
    top: 0;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(white 30%, transparent);

    nav {
        left: 0%;
        width: 100%;
        top: 0;
        z-index: 2;

        .logo-wrapper {
            width: 50px;
            height: 50px;
            position: relative;


            #logo {
                padding: 0.2em 0.35em;
                margin: 0 1.5em;
                border-radius: 20px;
                text-decoration: none;
                font-weight: 300;
                transition: all 1s;
                color: white;
                position: relative;
                left: -9px;
                top: 2px;
                z-index: 2;
            }

            .rombo {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                background-color: rgba(0, 0, 0, 0);

                width: 35px;
                height: 35px;

                rotate: 45deg;
                z-index: 1;
                animation: logoanimation 20s infinite;
            }

            @media screen and (max-width: 510px) {
                left: -25px
            }

        }

        .navbar-nav {
            position: relative;
            flex-flow: row;
            z-index: 3;


            @media screen and (max-width: 550px) {
                display: none;
                flex-direction: column;
                //gap: 1em;
                position: absolute;
                background-color: #000000;
                //padding: 1em;
                border-radius: 8px;
                font-size: 1.1em;
                left: 50%;
                top: 90%;
                transform: translateX(-50%);
                overflow: hidden;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

                animation: appear-burger .5s;

                li {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 60vw;
                    height: 8.5vh;
                    //padding: 1em 7.5em;

                    //border: 1px solid rgb(224, 224, 224);
                    //border-collapse: collapse;
                    cursor: pointer;

                    &:active {
                        background-color: rgb(72, 72, 72);
                    }

                    a {
                        color: rgb(229, 229, 229);
                        font-size: 1.4em;
                    }
                }
            }
        }

        .cerchio {
            position: absolute;
            border: 1px solid black;
            border-radius: 50%;
            z-index: 1;
            scale: 2;
            background: transparent;

            width: 400px;
            height: 400px;
            transition: all .8s;
        }

        .cerchio-centro {
            width: 400px;
            height: 300px;
            top: -305%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #000000;
            scale: 1;

            @media screen and (max-width: 652px) {
                top: -330%
            }

            @media screen and (max-width: 522px) {
                width: 310px;
                height: 280px;
            }

            @media screen and (max-width: 410px) {
                width: 300px;
                height: 270px;
            }

        }

        .cerchio-centro-pr {
            width: 400px;
            height: 300px;
            top: -345%;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgb(242 242 242);
            border: 1px solid rgb(255, 255, 255);
            scale: 1;

            @media screen and (max-width: 522px) {
                top: -330%;
                width: 310px;
                height: 280px;
            }

            @media screen and (max-width: 410px) {
                top: -330%;
                width: 280px;
                height: 270px;
            }
        }


        .layout-black {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            height: 100px;
            width: 100vw;
            background: rgb(63, 94, 251);
            background: linear-gradient(0deg, rgba(63, 94, 251, 0) 80%, rgba(0, 0, 0, 0.3) 100%);
        }

        .nav-item {

            .nav-link {
                font-weight: 400;
                margin: 0em .4em;
                padding: 0.2em 0.4em;
                transition: all .2s;
                scale: 1;
                transition: all .5s;

                &:hover {
                    scale: 1.02
                }
            }

        }


        .nav-link.router-link-active {
            font-weight: 800;
            position: relative;

            // &:after {
            //     content: '';
            //     position: absolute;
            //     bottom: -5px;
            //     left: 50%;

            //     width: 5px;
            //     height: 5px;
            //     border: 1px solid black;
            //     background-color: rgb(255, 255, 255);
            //     rotate: 45deg;
            //}

        }

    }



    .btn-wrapper {
        width: 50px;
        height: 50px;
        position: relative;
        left: 0;

        .btn-search {
            border: 1px solid black;
            background-color: rgba(255, 255, 255, 0.1);
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 2;
            transition: all 1s;

        }


        &:hover .btn-search {
            border-color: white;
            color: white;
        }

        &:hover .btn-filler {
            height: 50px;
        }

        &:hover .modulo-search .input-light {
            opacity: 1;
        }

        .btn-filler {
            position: absolute;
            left: 0;
            bottom: 0;
            background: rgb(3, 3, 3);
            width: 50px;
            height: 0px;
            border-radius: 8px;
            z-index: 1;
            transition: all 1s;
            animation: 1s appear;
        }


    }
}

.modulo-search {
    width: 230px;
    position: absolute;
    top: 7px;
    right: 0;
    transform: translateX(-60px);
    transition: all 1s;

    z-index: 2;

    .input-light {
        background-color: rgba(245, 245, 245, 0.598);
        color: rgb(20, 2, 2);
        opacity: 0;
        transition: all 1s;
        margin-right: 2em;

        border: 1px solid black;

        &:focus {
            opacity: 1;
            box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.126);
            outline: none
        }
    }

    @media screen and (max-width: 900px) {
        width: calc(100vw - 35px);
        position: absolute;
        top: 70px;
        right: -55px;

        .input-light {
            background-color: rgba(255, 255, 255, 0.813);
            margin-right: 0;
        }
    }

    @media screen and (max-width: 900px) {

        .input-light {
            opacity: 1;
        }
    }
}

.hidden {
    display: none;
}

@keyframes appear {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes appear-burger {
    0% {
        opacity: 0;
        height: 0vh
    }

    100% {
        opacity: 1;
        height: 25.5vh
    }
}
</style>
