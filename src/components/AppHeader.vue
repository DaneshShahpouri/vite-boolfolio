<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <div class="navbar-wrapper">
        <nav class="navbar navbar-expand-lg"
            :class="this.store.confArray[this.store.contatoreBackground][2] ? 'navbar-dark' : 'navbar-light'">
            <div class="container-fluid">
                <a id="logo"
                    :style="this.store.confArray[this.store.contatoreBackground][2] == true && this.store.contatoreBackgroundOrizzontale == 0 ? 'background-color:white;color:' + this.store.confArray[this.store.contatoreBackground][4] : 'background-color:black;color:white'"
                    href="#">DS</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                </div>
            </div>
        </nav>
    </div>
</template>

<style  lang="scss" scoped>
.navbar-wrapper {
    position: absolute;
    width: 100vw;
    margin: 0 auto;

    nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        z-index: 2;

        #logo {
            padding: 0.2em 0.35em;
            margin: 0 1.5em;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 400;
            font-size: 1.13em;
            transition: all 1s;
        }
    }

    #form-search {


        #search {
            width: 80px;
            border: none;
            border-bottom: 1px solid grey;
            background-color: transparent;
        }
    }
}
</style>
