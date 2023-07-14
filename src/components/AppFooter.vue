<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            email: '',
            name: '',
            contenuto: '',
            sendOk: false,
            sendNo: false,
            isAnimationSend: false,
        }
    },
    methods: {

        inviaEmail() {
            // Effettua la chiamata al backend Laravel per inviare l'email
            // Utilizza axios o una chiamata AJAX per inviare i dati del form
            axios.post('http://127.0.0.1:8000/api/messages/store', {
                email: this.email,
                username: this.name,
                content: this.contenuto
            }).then(response => {
                console.log(response)

                if (response.status == 200) {
                    this.isAnimationSend = true;
                    this.sendOk = true;
                    this.sendNo = false
                    setTimeout(
                        () => {
                            this.email = '';
                            this.name = '';
                            this.contenuto = '';
                        }, 200);

                }
            })
                .catch(error => {
                    // Gestisci eventuali errori
                    console.error(error);
                    this.isAnimationSend = false;
                    this.sendOk = false
                    this.sendNo = true
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
                    <form @submit.prevent="inviaEmail()">
                        <h5 class="text-light">Scrivimi un messaggio</h5>
                        <div class="d-flex flex-column flex-sm-col w-100 gap-2">
                            <label for="email" class="visually-hidden">Email</label>
                            <input type="name" name="name" typeof="text" class="form-control" v-model="this.name"
                                placeholder="Nome*" required>
                            <input type="email" name="email" typeof="text" class="form-control" v-model="this.email"
                                placeholder="Email*" required>
                            <input class="form-control" name="content" placeholder="Scrivi qui.." min:3
                                v-model="this.contenuto" required>
                            <button class="btn btn-dark" type="submit">Invia</button>
                        </div>
                        <div class="send-bar" v-if="this.isAnimationSend == true"
                            :class="this.isAnimationSend ? 'send-bar-animation' : ''">
                        </div>
                        <div class="message-status-success text-success" v-show="this.sendOk == true">
                            <i class="fa-solid fa-check"></i>
                            <span class="ps-1">Messaggio Inviato</span>
                        </div>
                        <div class="message-status-success text-danger" v-show="this.sendNo == true">
                            <i class="fa-solid fa-x"></i>
                            <span class="ps-1">Errore di Invio</span>
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
    position: relative;
    z-index: 2;

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

    .send-bar {
        width: 100%;
        height: 5px;
        border-radius: 5px;
        background-color: green;
    }

    .send-bar-animation {
        animation: 1s sendMessage ease;
    }

    .message-status-success {
        display: flex;
        align-items: center;
    }
}

@keyframes sendMessage {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}
</style>
