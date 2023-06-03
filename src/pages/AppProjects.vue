<script>
import axios from 'axios';
export default {
    name: 'AppProjects',
    data() {
        return {
            projects: [],
            urlImg: 'http://127.0.0.1:8000' + '/storage/',
        }
    },

    methods: {

        getProjects() {
            axios.get('http://127.0.0.1:8000/api/projects').then(response => {
                // console.log(response.data.results)
                this.projects = response.data.results;
            });
        },
    },

    created() {
        this.getProjects()
    },

    mounted() {
        // console.log(this.$router.currentRoute.value.name)
        //console.log(this.urlImg + ptoject.cover_image)
    }


}
</script>

<template>
    <div v-if="this.projects.length == 0" class="container" id="loading-screen">
        <div class="icon-wrapper">
            <i class="fa-solid fa-circle-notch"></i>
        </div>
        <span>Loading..</span>
    </div>
    <div v-else>
        <div class="container p-5 mt-5">
            <h1>Progetti</h1>
        </div>

        <div class="container d-flex justify-content-center align-item-center flex-wrap p-2">

            <div class="card m-4" style="width: 22rem;" v-for="project in projects">

                <img :src="project.cover_image == null ? 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image' : (this.urlImg + project.cover_image)"
                    class="card-img-top h-100" alt="...">
                <h4 class="card-title px-3 pt-2 ">{{ project.title }}</h4>
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <p class="card-text">{{ project.description.substring(1, 60) + '..' }}</p>
                    <router-link :to="{ name: 'projects/show', params: { slug: project.slug } }"
                        class="btn btn-outline-primary">Vedi
                        Dettagli</router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    img {
        height: 100%;
        object-fit: cover;
        object-position: center;
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
