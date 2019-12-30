<template>
  <div>
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-navbar-nav>
        <b-nav-item href="#">
          <router-link to="/wifi-setup">WiFi</router-link>
        </b-nav-item>
        <b-nav-item href="#">
          <router-link to="/mqtt-setup">MQTT</router-link>
        </b-nav-item>
        <b-nav-item href="#">
          <router-link to="/device-setup">Device</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  import {BNavbar, BNavbarNav, BNavItem} from 'bootstrap-vue';

  export default {
    name: 'NavBar',
    components: {
      BNavbar,
      BNavbarNav,
      BNavItem,
    },
  }
</script>

<style scoped lang="scss">

  a {
    text-decoration: none;
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #28A745;
    }
  }

</style>
