<template>
  <div>
    <b-list-group>
      <b-list-group-item>
        <small>Humidity:</small>
        <h5>{{ data.humidity }}%</h5>
      </b-list-group-item>
      <b-list-group-item>
        <small>Temperature:</small>
        <h5>{{ data.temperature }} °C</h5>
      </b-list-group-item>
      <b-list-group-item>
        <small>CO2 level:</small>
        <h5>{{ data.ppm }} ppm</h5>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  import {BListGroup, BListGroupItem} from 'bootstrap-vue';

  export default {
    name: 'EnvironmentSensorV1',
    components: {
      BListGroup,
      BListGroupItem,
    },
    data() {
      return {
        data: {},
      }
    },
    beforeMount() {
      this.$store.dispatch('device/fetchData');
      this.$data.fetchDataInterval = setInterval(() => this.$store.dispatch('device/fetchData'), 10*1000);
    },
    mounted() {
      this.$data.type = this.$store.getters['device/getData']();
      this.watchers = [
        this.$store.watch(this.$store.getters['device/getData'], (newVal = {}) => {
          this.$data.data = newVal;
        }),
      ];
    },
    destroyed() {
      clearInterval(this.$data.fetchDataInterval);
      this.watchers.map(unwatch => unwatch());
    },
  }
</script>
