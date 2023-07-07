
<script>
import axios from 'axios';
import { store } from '../store.js';
import AppFooter from '../components/AppFooter.vue';
export default {
    name: "singleProject",
    data() {
        return {
            store,
            PostSlug: '',
            urlImg: 'http://127.0.0.1:8000' + '/storage/',
            singleProject: '',
        }
    },

    components: {
        AppFooter
    },

    created() {
        this.PostSlug = this.$route.params.slug,
            this.getProject(),
            this.store.currentPage = 'projects';
        console.log(this.PostSlug)
    },

    methods: {
        getProject() {
            axios.get('http://127.0.0.1:8000/api/projects/' + this.PostSlug).then(response => {
                console.log(response.data.results)
                this.singleProject = response.data.results;

            })
        }

    }
}
</script>

<template>
    <div class="_single-project-wrapper" v-if="this.singleProject != ''">

        <div class="_single-project">
            <h1 class="">{{ singleProject.title }}</h1>
            <div class="img-wrapper">
                <img :src="singleProject.cover_image == null ? 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image' : (this.urlImg + singleProject.cover_image)"
                    class="_mycard-img-top h-100" alt="...">
            </div>

            <div class="_text-info my-4">
                <div class="_info-section">
                    <div class="_single-info-wrapper _info-big">
                        <h2>Description_</h2>
                        <p>{{ singleProject.description }}</p>
                    </div>

                    <div class="_single-info-wrapper _info-small">
                        <h2>Year_</h2>
                        <span>{{ singleProject.year }}</span>
                        <h2>Slug_</h2>
                        <span>{{ singleProject.slug }}</span>
                    </div>

                </div>
                <div class="_info-section">

                    <div class="_single-info-wrapper _info-medium">
                        <h2>Type_</h2>
                        <strong>{{ singleProject.type.name }}</strong>
                        <span>{{ singleProject.type.description }}</span>
                    </div>

                    <div class="_single-info-wrapper _info-medium">
                        <h2>Technologies_</h2>
                        <div class="_technologies-single">
                            <span class=" badge bg-white text-dark border m-1" v-for="tech in singleProject.technologies">{{
                                tech.name
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="button-wrapper text-center m-5">
            <router-link class="btn btn-outline-dark" :to="{ name: 'works' }">Go back</router-link>
        </div>

    </div>
    <div v-else class="container" id="loading-screen">
        <div class="icon-wrapper">
            <i class="fa-solid fa-circle-notch"></i>
        </div>
        <span>Loading..</span>
    </div>
    <AppFooter></AppFooter>
</template>

<style  lang="scss" scoped>
._single-project-wrapper {
    width: 100%;
    padding-top: 5em;

    ._single-project {
        max-width: 1200px;
        margin: auto;
        margin-top: 5em;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;

        h1 {
            width: calc(100% - 3em);
            margin-left: 3em;

            @media screen and (max-width: 772px) {
                margin-left: 0;
                text-align: center;
            }
        }

        .img-wrapper {
            width: 100%;
            height: 80vh;
            padding: 1em 0em;
            border-top: 1px solid black;
            border-bottom: 1px solid black;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top;
            }
        }

        ._text-info {
            width: calc(100% - 3em);
            color: black;
            margin: 1em 3em;

            ._info-section {
                display: flex;
                justify-content: center;
                margin: 1em;
                gap: 2em;

                ._single-info-wrapper {
                    display: flex;
                    flex-direction: column;

                    ._technologies-single {
                        width: 75%;
                        display: flex;
                        flex-flow: wrap;
                        justify-content: center;
                    }
                }

                ._info-small {
                    width: calc(100% / 4 - 1em);
                }

                ._info-medium {
                    width: calc(100% / 2 - 1em);
                }

                ._info-big {
                    width: calc((100% / 4)* 3 - 1em);
                }
            }

            @media screen and (max-width: 772px) {
                margin: 1.5em auto;



                ._info-section {
                    flex-direction: column;

                    ._single-info-wrapper {
                        ._technologies-single {
                            width: 100%;
                        }

                    }

                    ._info-small {
                        width: 100%;
                        text-align: center;
                    }

                    ._info-medium {
                        width: 100%;
                        text-align: center;
                    }

                    ._info-big {
                        width: 100%;
                        text-align: center;
                    }
                }
            }
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

    .icon-wrapper {
        i {
            font-size: 2em;
            color: rgb(39, 39, 39);
            animation: loading 1s linear infinite;
        }
    }
}
</style>
