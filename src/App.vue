<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid">
      <div class="container hidden text-center">
        <img src="./assets/logo.png" alt="logo" style="width:220px;height:auto;">
        <h1 class="display-4">CropIO</h1>
        <p class="lead">cultivo futuro</p>
      </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
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
</style>
