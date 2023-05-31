import { createRouter, createWebHistory } from "vue-router";
import AppHome from './pages/AppHome.vue';
import AppProjects from './pages/AppProjects.vue';
import AppAbout from './pages/AppAbout.vue';
import singleProject from './pages/singleProject.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: AppHome
        },
        {
            name: 'projects',
            path: '/projects',
            component: AppProjects
        },
        {
            name: 'about',
            path: '/about',
            component: AppAbout
        }, {
            name: 'projects/show',
            path: '/projects/:slug',
            component: singleProject
        }
    ]
});
export { router }


//La parte grafica è in sospeso perchè sto provando a implementare un layout
//scritto in jsvanilla in vue.