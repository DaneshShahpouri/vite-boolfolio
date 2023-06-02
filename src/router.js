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
            component: AppHome,
            meta: {
                title: 'Home'
            }
        },
        {
            name: 'projects',
            path: '/projects',
            component: AppProjects,
            meta: {
                title: 'Projects'
            }
        },
        {
            name: 'about',
            path: '/about',
            component: AppAbout,
            meta: {
                title: 'About'
            }
        }, {
            name: 'projects/show',
            path: '/projects/:slug',
            component: singleProject,
            meta: {
                title: 'Show'
            }
        }
    ]
});

router.beforeEach((to) => {
    document.title = to.meta?.title ? 'Boolfolio - ' + to.meta.title : 'Boolfolio'
});

export { router }


//La parte grafica è in sospeso perchè sto provando a implementare un layout
//scritto in jsvanilla in vue.