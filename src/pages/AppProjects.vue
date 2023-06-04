<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: 'AppProjects',
    data() {
        return {
            store,

            tempProjects: [],
            urlImg: 'http://127.0.0.1:8000' + '/storage/',
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


    },

    created() {
        this.store.isLoading = true,
            this.store.searchInput = '',
            this.getTempProjects()
    },

    mounted() {
        // console.log(this.$router.currentRoute.value.name)
        //console.log(this.urlImg + ptoject.cover_image)
        //console.log(this.tempProjects)
    },

    updated() {
    }
}
</script>

<template>
    <div class="container p-5 mt-5">
        <h1>Progetti</h1>
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

        <div class="container d-flex justify-content-start align-item-center flex-column flex-wrap p-2">

            <div class="_mycard m-4" v-for="project in this.store.projects">

                <div class="img-wrapper">
                    <img :src="project.cover_image == null ? 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image' : (this.urlImg + project.cover_image)"
                        class="_mycard-img-top h-100" alt="...">
                </div>
                <div class="text-info">
                    <h4 class="_mycard-title ">{{ project.title }}</h4>
                    <div class="_mycard-body">
                        <p class="_mycard-text">{{ project.description }}</p>
                        <router-link :to="{ name: 'projects/show', params: { slug: project.slug } }"
                            class="btn btn-outline-primary">Vedi
                            Dettagli</router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- Nessun Risultato -->
    <div v-if="this.store.isLoading == false && this.store.isSuccess == false">
        <div class="container d-flex justify-content-center align-item-center flex-wrap p-2">
            <div class="alert alert-danger w-100" role="alert">
                Spiacenti, Nessun Risultato.
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
._mycard {
    width: 100%;
    padding: 2em;
    border-bottom: 1px solid rgb(42, 42, 42);

    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4em;

    .img-wrapper {
        width: 25vw;
        height: 25vw;
        max-width: 400px;
        max-height: 400px;
        min-width: 250px;
        min-height: 250px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid black;

        img {
            width: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    .text-info {
        width: 40vw;
        height: 100%;
        margin-left: 2em;
        display: flex;
        flex-direction: column;
        justify-content: s;
        gap: 1em;

        ._mycard-title {
            text-transform: uppercase;
            color: black;
            font-size: 2.5em;
            border-bottom: 1px solid black;
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
}


#loading-screen {
    height: 100vh;
    widows: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon-wrapper {
        i {
            font-size: 2em;
            color: rgb(39, 39, 39);
            animation: loading 1s linear infinite;
        }
    }
}
</style>
