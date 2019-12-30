<template>
  <div id="app">
    <div id="loading" v-if="$store.getters['getBusy']()">
      <div>
        <icon
          name="spinner"
          pulse
          scale="4"
          class="mt-2"/>
      </div>
    </div>
    <b-jumbotron fluid>
      <b-container class="hidden text-center">
        <img src="./assets/logo.png" alt="logo" style="width:200px;height:auto;">
        <h1 class="display-4">CropIO</h1>
        <p class="lead">cultivo futuro</p>
      </b-container>
    </b-jumbotron>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

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
    z-index: 100;
    div {
      color: white;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
  }

</style>
