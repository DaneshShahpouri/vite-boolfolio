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
  <!-- debug -->

  <div id="showroom">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md" id="navbar">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="}">
          <div class="logo_laravel">DS</div>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left Side Of Navbar -->
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a href="" class="nav-link" type="button">Progetti</a>
            </li>

            <li class="nav-item">
              <a href="" class="nav-link" type="button">Tipologie</a>
            </li>

            <li class="nav-item">
              <a href="" class="nav-link" type="button">Tecnoloigie</a>
            </li>
          </ul>


          <!-- Right Side Of Navbar -->


        </div>

      </div>
    </nav>

    <!-- Main -->
    <div class="_container-wrapper">
      <!-- mini-counter -->
      <div class="counter-box hidden d-flex justify-content-center align-item-center" id="mini-counter"></div>
      <!-- Counter -->
      <div class="counter-box d-flex justify-content-center align-item-center" id="counter"></div>


      <!-- screen -->
      <div class="__container p-pre" id="container-pre"></div>

      <div class="__container p-center" id="container-1"></div>

      <div class="__container p-post" id="container-post"></div>

      <div class="__container p-left" id="container-left"></div>

      <div class="__container p-right" id="container-right"></div>


      <!-- Background  -->
      <div class="background" id="background">
        <div class="background layout-black bg-dark" id="layout"></div>
        <div class="cerchio hidden top-showroom" id="cerchio-top-hidden"></div>
        <div class="cerchio hidden bottom-showroom" id="cerchio-bottom-hidden"></div>
        <div class="cerchio top-showroom" id="cerchio-top"></div>
        <div class="cerchio bottom-showroom" id="cerchio-bottom"></div>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>
