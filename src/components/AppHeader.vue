<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            openSearchBar: false,
        }
    }
}
</script>

<template>
    <div class="navbar-wrapper d-flex justify-content-space-around">

        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid d-flex justify-content-space-around">

                <div class="logo-wrapper">
                    <h5 id="logo" href="#"
                        :style="store.confArray[store.contatoreBackground][2] ? 'color: white;' : 'color: black;'">DS</h5>
                    <div class="rombo"
                        :style="store.confArray[store.contatoreBackground][2] ? 'border: 1px solid white;' : 'border: 1px solid black;'">
                    </div>
                </div>

                <div id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link :active="isActive" class="nav-link" :to="{ name: 'home' }">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :active="isActive" class="nav-link"
                                :to="{ name: 'projects' }">Projects</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :active="isActive" class="nav-link" :to="{ name: 'about' }">About</router-link>
                        </li>
                    </ul>
                </div>

                <form class="btn-wrapper" action="">
                    <button class="btn btn-search" type="submit"
                        :class="store.confArray[store.contatoreBackground][2] ? 'btn-dark' : 'btn-light'"
                        :style="store.confArray[store.contatoreBackground][2] ? 'border:1px solid white' : ''">
                        <i class="fa-solid fa-magnifying-glass"></i></button>
                    <div class="btn-filler"></div>
                    <div role="search" class="modulo-search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            :class="this.store.confArray[2] ? 'input-light' : 'input-dark'">
                    </div>
                </form>
            </div>
        </nav>
    </div>
    <!-- Modulo Ricerca -->
</template>

<style  lang="scss" scoped>
.navbar-wrapper {
    position: absolute;
    top: 0;
    width: 100vw;
    margin: 0 auto;


    nav {
        position: absolute;
        left: 0%;
        width: 100vw;
        //transform: translateX(-50%);
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
                font-weight: 100;
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

        .nav-item {

            .nav-link {
                font-weight: 200;
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
            color: white;
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

            &:hover+.btn-filler {
                height: 50px;
            }

            &:hover {
                border-color: white;
                color: white;
            }
        }

        .btn-filler {
            position: absolute;
            left: 0;
            bottom: 0;
            background: #059a8e;
            width: 50px;
            height: 0px;
            border-radius: 8px;
            z-index: 1;
            transition: all 1s;
            animation: 1s appear;
        }
    }

    .modulo-search {
        width: 230px;
        position: absolute;
        top: 7px;
        right: 0;
        transform: translateX(-60px);
        transition: all 1s;

        .input-light {
            background-color: rgba(0, 0, 0, 0.235);
            color: white
        }

        .input-dark {
            background-color: rgba(245, 245, 245, 0.235);
            color: rgb(26, 25, 25)
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
