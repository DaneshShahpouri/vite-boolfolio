
<script>
import { store } from '../store.js';
export default {
    name: "singleProject",
    data() {
        return {
            store,
            PostSlug: '',
        }
    },

    mounted() {
        this.PostSlug = this.$route.params.slug
    },
}
</script>

<template>
    <div class="container d-flex flex-column mt-5 pt-5">
        <h1>Pagina del singolo prodotto</h1>
    </div>
</template>

<style  lang="scss" scoped></style>
