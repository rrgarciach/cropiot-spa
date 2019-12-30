<template>
  <b-row class="home">
    <b-col class="text-center">
      <h1>Welcome</h1>
      <b-spinner small></b-spinner>
    </b-col>
  </b-row>
</template>

<script>
  import {BCol, BRow, BSpinner} from 'bootstrap-vue';

  export default {
    name: 'Home',
    components: {
      BCol,
      BRow,
      BSpinner,
    },
    mounted() {
      this.$store.dispatch('fetchDeviceType');
      this.$store.dispatch('wifi/fetchStatus')
        .then(() => {
          setTimeout(() => {
            const isConnected = this.$store.getters['wifi/getStatus']();
            if (isConnected)
              this.$router.push('mqtt-setup');
            else
              this.$router.push('wifi-setup');
          }, 1000);
        });
    },
  }
</script>

<style lang="scss" scoped>
  @import '~bootstrap/scss/bootstrap.scss';

  .home {
  }
</style>
