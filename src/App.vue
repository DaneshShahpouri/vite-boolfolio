<script>

import AppHeader from './components/AppHeader.vue';
export default {
  name: 'App',
  data() {
    return {
  
    }
  },

  components: {
    AppHeader
  },
 
}
</script>

<template>
  <AppHeader></AppHeader>
  <router-view></router-view>
  <!-- <div class="container p-5">
    <h1>Benvenuto nella sezione dei progetti</h1>
  </div>

  <div class="container d-flex justify-content-center align-item-center flex-wrap p-2">

    <div class="card m-4" style="width: 22rem;" v-for="project in projects">

      <img :src="(this.urlImg + project.cover_image)" class="card-img-top" alt="...">
      <h4 class="card-title">{{ project.title }}</h4>
      <div class="card-body">
        <p class="card-text">{{ project.description.substring(1, 60) + '..' }}</p>
      </div>
    </div>

  </div> -->
</template>

<style scoped></style>
