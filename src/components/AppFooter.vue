<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            email: '',
            contenuto: ''
        }
    },
    methods: {

        inviaEmail() {
            // Effettua la chiamata al backend Laravel per inviare l'email
            // Utilizza axios o una chiamata AJAX per inviare i dati del form
            axios.post('http://127.0.0.1:8000/api/invia-email', {
                email: this.email,
                contenuto: this.contenuto
            })
                .then(response => {
                    // Gestisci la risposta del backend dopo l'invio dell'email
                    console.log(response.data);
                    // Resetta i campi del form
                    this.email = '';
                    this.contenuto = '';
                })
                .catch(error => {
                    // Gestisci eventuali errori
                    console.error(error);
                });
        }


    },
    mounted() {

    }
}
</script>

<template>
    <div id="footer">

        <footer class="footer-container">

            <div class="row justify-content-between">
                <div class="col-6 col-md-2 mb-3">
                    <h5 class="text-light">Site</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2">
                            <router-link class="nav-link p-0" :to="{ name: 'home' }">Home</router-link>
                        </li>
                        <li class="nav-item mb-2">
                            <router-link class="nav-link p-0" :to="{ name: 'works' }">Works</router-link>
                        </li>
                        <li class="nav-item mb-2">
                            <router-link class="nav-link p-0" :to="{ name: 'about' }">About</router-link>
                        </li>
                    </ul>
                </div>

                <div class="col-md-8 offset-md-1 mb-3">
                    <form @submit.prevent="this.inviaEmail()">
                        <h5 class="text-light">Scrivimi una email</h5>
                        <div class="d-flex flex-column flex-sm-col w-100 gap-2">
                            <label for="email" class="visually-hidden">Email</label>
                            <input type="email" name="email" typeof="text" class="form-control" v-model="email"
                                placeholder="indirizzo email" required>
                            <input class="form-control" name="content" placeholder="scrivi qui" min:3 v-model="contenuto"
                                required>
                            <button class="btn btn-dark" type="submit">Invia</button>
                        </div>

                    </form>
                </div>

            </div>

            <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                <p>© 2023 Danesh Shahpouri. All rights reserved</p>
                <ul class="list-unstyled d-flex">
                    <li class="ms-3">
                        <a href="https://github.com/DaneshShahpouri" target="_blank" class="link-light"><i
                                class="fa-brands fa-github"></i></a>
                    </li>
                    <li class="ms-3">
                        <a href="https://www.linkedin.com/in/danesh-shahpouri/" target="_blank" class="link-light"><i
                                class="fa-brands fa-linkedin"></i></a>
                    </li>
                    <li class="ms-3">
                        <a href="https://www.youtube.com/channel/UC7aGxhtTV2eEZFpT2tlNFAA" target="_blank"
                            class="link-light"><i class="fa-brands fa-youtube"></i></a>
                    </li>
                </ul>
            </div>

        </footer>

    </div>
</template>

<style  lang="scss" scoped>
#footer {
    width: 100%;
    padding: 1em;
    background-color: black;
    margin-top: 4em;

    .footer-container {
        max-width: 1100px;
        margin: auto;

        .row {
            h5 {
                font-size: 1.4em;
                margin-top: 1em;
                border-bottom: 1px solid white;
                margin-bottom: .7em;
            }

            ul {
                li {
                    a {
                        font-size: .8em;

                        color: rgb(174, 174, 174);

                        &:hover {
                            color: white;
                        }
                    }
                }
            }
        }

        p {
            color: rgb(168, 168, 168);
        }
    }
}
</style>
