import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { router } from './router.js'



createApp(App).use(router).mount('#app')


//Elementi Showroom globali
const MainScrollableEl = document.getElementById('container-1');
const TopScrollableEl = document.getElementById('container-pre');
const BottomScrollableEl = document.getElementById('container-post');
const LeftScrollableEl = document.getElementById('container-left');
const RightScrollableEl = document.getElementById('container-right')

