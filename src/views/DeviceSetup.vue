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

      <br>
      <h5>Settings:</h5>
      <form>
        <b-form-group>
          <label for="name">Name:</label>
          <b-input-group id="name">
            <b-form-input v-model="name" placeholder="Device name"/>
          </b-input-group>
        </b-form-group>
        <b-button block variant="success" @click="onSubmit" class="mb-3">Submit</b-button>
      </form>

    </b-col>
  </b-row>
</template>

<script>
  import {BCol, BRow, BFormGroup, BInputGroup, BFormInput, BButton, BListGroup, BListGroupItem} from 'bootstrap-vue';
  import {DEVICE_TYPES} from '@/constants';
  import EnvironmentSensorV1 from '@/components/EnvironmentSensorV1'

  export default {
    name: 'DeviceSetup',
    components: {
      BCol,
      BRow,
      BFormGroup,
      BInputGroup,
      BFormInput,
      BButton,
      BListGroup,
      BListGroupItem,
      EnvironmentSensorV1,
    },
    data() {
      return {
        name: '',
        type: DEVICE_TYPES.DEFAULT,
        DEVICE_TYPES: DEVICE_TYPES,
      }
    },
    beforeMount() {
      this.$store.dispatch('device/fetchDeviceType');
    },
    mounted() {
      this.$data.name = this.$store.getters['device/getName']();
      this.$data.type = this.$store.getters['device/getType']();
      this.watchers = [
        this.$store.watch(this.$store.getters['device/getName'], newVal => {
          this.$data.name = newVal;
        }),
        this.$store.watch(this.$store.getters['device/getType'], newVal => {
          this.$data.type = newVal;
        }),
      ];
    },
    destroyed() {
      this.watchers.map(unwatch => unwatch());
    },
    methods: {
      onSubmit() {
        if (!this.$data.name) alert('Invalid name');
        else this.connect();
      },
      async connect() {
        this.$store.commit('device/setName', this.$data.name);
        await this.$store.dispatch('device/submitDevice');
      },
    },
  }
</script>
