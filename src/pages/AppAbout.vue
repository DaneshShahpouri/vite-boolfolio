<script>
import { store } from '../store';
import AppFooter from '../components/AppFooter.vue';

export default {
    name: 'AppAbout',
    data() {
        return {
            store
        }
    },

    components: {
        AppFooter
    },

    methods: {

    },

    mounted() {
        //console.log(this.$router.currentRoute.value.name)
        this.store.currentPage = 'about';
        console.log(this.store.currentPage)
    }

}
</script>

<template>
    <div class="container p-5 mt-5">
        <h1 class="text-center mt-5 text-uppercase">About_</h1>
    </div>

    <div class="container d-flex justify-content-center align-item-center flex-wrap p-2">

        <span>Scopri di più su di noi</span>


    </div>

    <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>
.container {
    min-height: 200px;
}
</style>
