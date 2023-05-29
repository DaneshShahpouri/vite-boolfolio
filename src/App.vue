<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      projects: [],
      urlImg: 'http://127.0.0.1:8000' + '/storage/',
    }
  },

  methods: {

    getProjects() {
      axios.get('http://127.0.0.1:8000/api/projects').then(response => {
        // console.log(response.data.results)
        this.projects = response.data.results;
        //console.log(this.projects)
      });
    },
  },

  created() {
    this.getProjects()
  },

  mounted() {
    //console.log(this.urlImg + ptoject.cover_image)
  }


}
</script>

<template>
  <div class="container p-5">
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

  </div>
</template>

<style scoped></style>
