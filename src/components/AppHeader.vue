<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            openSearchBar: false,
            tempProjects: [],
        }
    },
    methods: {
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

        search() {
            this.store.isLoading = true;
            this.getTempProjects();
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
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'projects' }">Projects</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
                        </li>
                    </ul>
                    <div class="cerchio" id="cerchio-nav"
                        :class="this.$route.name == 'home' ? 'cerchio-centro' : ' cerchio-centro-pr'"
                        :style="this.$route.name == 'home' ? 'width: 400px;height: 300px;top: -315%;left: 50%;' : 'width: 400px;height: 300px;top: -345%;left: 50%;'">
                    </div>
                    <div class="layout-black" :style="this.$route.name == 'home' ? '' : ''"></div>
                </div>

                <form v-if="this.$route.name == 'projects'" class="btn-wrapper" action="" @submit.prevent=" search()">
                    <button class="btn btn-search" type="submit"
                        :class="store.confArray[store.contatoreBackground][2] || store.searchInput != '' ? 'btn-dark' : 'btn-light'"
                        :style="store.confArray[store.contatoreBackground][2] || store.searchInput != '' ? 'border:1px solid white' : ''">
                        <i class="fa-solid fa-magnifying-glass"></i></button>
                    <div class="btn-filler" :style="this.store.searchInput != '' ? 'height: 50px;' : ''"></div>
                    <div class="modulo-search">
                        <input v-model="store.searchInput" class="form-control me-2" type="search" placeholder="Search"
                            aria-label="Search" :class="this.store.confArray[2] ? 'input-light' : 'input-dark'"
                            :style="store.searchInput == '' ? '' : 'opacity:1'">
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

.navbar-wrapper {
    top: 0;
    width: 100%;
    margin: 0 auto;

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

        }

        .navbar-nav {
            position: relative;
            z-index: 2
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

        }

        .cerchio-centro-pr {
            width: 400px;
            height: 300px;
            top: -305%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #ffffffe4;
            border: 1px solid black;
            scale: 1;
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
            font-weight: 500;
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
            background: rgb(2, 143, 198);
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

        border: none;

        &:focus {
            opacity: 1;
            box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.126);
            outline: none
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
</style>
