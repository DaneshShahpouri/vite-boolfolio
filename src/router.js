import { createRouter, createWebHistory } from "vue-router";
import AppHome from './pages/AppHome.vue';
import AppProjects from './pages/AppProjects.vue';
import AppAbout from './pages/AppAbout.vue';
import singleProject from './pages/singleProject.vue';


const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
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
            name: 'works',
            path: '/works',
            component: AppProjects,
            meta: {
                title: 'Works'
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
            name: 'works/show',
            path: '/works/:slug',
            component: singleProject,
            meta: {
                title: 'Show'
            }
        }
    ]
});

router.beforeEach((to) => {
    document.title = to.meta?.title ? 'Danesh Shahpouri - ' + to.meta.title : 'Danesh Shahpouri'
});

export { router }


//La parte grafica è in sospeso perchè sto provando a implementare un layout
//scritto in jsvanilla in vue.