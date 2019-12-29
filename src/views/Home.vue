<template>
  <b-row class="home">
    <b-col>
      <h1>Welcome</h1>
    </b-col>
  </b-row>
</template>

<script>
const WL_NO_SHIELD        = 255;
const WL_IDLE_STATUS      = 0;
const WL_NO_SSID_AVAIL    = 1;
const WL_SCAN_COMPLETED   = 2;
const WL_CONNECTED        = 3;
const WL_CONNECT_FAILED   = 4;
const WL_CONNECTION_LOST  = 5;
const WL_DISCONNECTED     = 6;

export default {
  name: 'Home',
  beforeMount() {
    this.$store.dispatch('fetchDeviceType');
  },
  mounted() {
    setTimeout(() => {
      console.log(status, WL_CONNECTED);
      if (parseInt(status) === WL_CONNECTED) {
        this.$router.push('wifi-setup');
      } else {
        this.$router.push('wifi-setup');
      }
    }, 500);
  },
}
</script>
