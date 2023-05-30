import { createRouter, createWebHistory } from "vue-router";
import AppHome from './pages/AppHome.vue';
import AppProjects from './pages/AppProjects.vue';
import AppAbout from './pages/AppAbout.vue';

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
        }
    ]
});
export { router }