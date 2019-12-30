<template>
  <b-row class="device-setup">
    <b-col>
      <h4>Device Setup</h4>
      <b-list-group>
        <b-list-group-item variant="dark">
          <small>Device Type:</small>
          <h5>{{ type }}</h5>
        </b-list-group-item>
      </b-list-group>

      <br>
      <h5>Live Data:</h5>
      <div v-if="String(type).toLowerCase() === String(DEVICE_TYPES.ENVIRONMENT_SENSOR_V1).toLowerCase()">
        <environment-sensor-v1></environment-sensor-v1>
      </div>

    </b-col>
  </b-row>
</template>

<script>
  import {BCol, BRow, BListGroup, BListGroupItem} from 'bootstrap-vue';
  import {DEVICE_TYPES} from '@/constants';
  import EnvironmentSensorV1 from '@/components/EnvironmentSensorV1'

  export default {
    name: 'DeviceSetup',
    components: {
      BCol,
      BRow,
      BListGroup,
      BListGroupItem,
      EnvironmentSensorV1,
    },
    data() {
      return {
        type: DEVICE_TYPES.DEFAULT,
        DEVICE_TYPES: DEVICE_TYPES,
      }
    },
    beforeMount() {
      this.$store.dispatch('device/fetchDeviceType');
    },
    mounted() {
      this.$data.type = this.$store.getters['device/getType']();
      this.watchers = [
        this.$store.watch(this.$store.getters['device/getType'], newVal => {
          this.$data.type = newVal;
        }),
      ];
    },
    destroyed() {
      this.watchers.map(unwatch => unwatch());
    },
  }
</script>
