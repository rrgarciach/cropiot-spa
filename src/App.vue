<template>
  <div id="app">
    <div id="loading" v-if="$store.getters['getBusy']()">
      <div>
        <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
      </div>
    </div>
    <nav-bar></nav-bar>
    <b-jumbotron fluid>
      <b-container class="hidden text-center pt-5">
        <img src="./assets/logo.png" alt="logo" style="width:160px;height:auto;">
        <h1 class="display-4">CropIO</h1>
        <p class="lead">cultivo futuro</p>
      </b-container>
    </b-jumbotron>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
  import {BJumbotron, BContainer, BSpinner} from 'bootstrap-vue';
  import NavBar from './components/NavBar';

  export default {
    name: 'App',
    components: {
      BJumbotron,
      BContainer,
      BSpinner,
      NavBar,
    },
  }
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap.scss';

  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
  }

  #loading {
    position: absolute;
    display: table;
    background-color: rgba(40, 167, 69, .75);
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    div {
      color: white;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
  }

</style>
