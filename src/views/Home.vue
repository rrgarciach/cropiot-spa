<template>
  <b-row class="home">
    <b-col class="text-center">
      <h1>Welcome</h1>
      <icon
        name="spinner"
        pulse
        scale="2"
        class="mt-2"/>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'Home',
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
