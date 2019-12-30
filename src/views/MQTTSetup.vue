<template>
  <b-row class="mqtt-setup">
    <b-col>
      <h4>MQTT Setup <b-badge :variant="connected ? 'success' : 'danger'">{{ connected ? 'Connected' : 'Not connected' }}</b-badge></h4>
      <form>
        <b-form-group>
          <label for="host">Host:</label>
          <b-input-group id="host">
            <b-form-input v-model="host" placeholder="Host URL"/>
          </b-input-group>
          <label for="token">Token:</label>
          <b-input-group id="token">
            <b-form-input v-model="token" placeholder="Token"/>
          </b-input-group>
        </b-form-group>
        <b-button block variant="success" @click="onSubmit">Submit</b-button>
      </form>
    </b-col>
  </b-row>
</template>

<script>
  import {BCol, BRow, BFormGroup, BInputGroup, BFormInput, BBadge, BButton} from 'bootstrap-vue';

  export default {
    name: 'MQTTSetup',
    components: {
      BCol,
      BRow,
      BFormGroup,
      BInputGroup,
      BFormInput,
      BBadge,
      BButton,
    },
    data() {
      return {
        host: '',
        token: '',
        connected: false,
      }
    },
    beforeMount() {
      this.$store.dispatch('mqtt/fetchStatus');
    },
    mounted() {
      const details = this.$store.getters['mqtt/getDetails']();
      this.$data.host = details.host;
      this.$data.token = details.token;
      this.$data.connected = details.connected;
      this.watchers = [
        this.$store.watch(this.$store.getters['mqtt/getDetails'], (newVal = {}) => {
          this.$data.host = newVal.host;
          this.$data.token = newVal.token;
          this.$data.connected = newVal.connected;
        }),
      ];
    },
    destroyed() {
      this.watchers.map(unwatch => unwatch());
    },
    methods: {
      onSubmit() {
        if (!this.$data.host) alert('Invalid host URL');
        else if (!this.$data.token) alert('Invalid token');
        else this.connect();
      },
      async connect() {
        this.$store.commit('mqtt/setHost', this.$data.host);
        this.$store.commit('mqtt/setToken', this.$data.token);
        await this.$store.dispatch('mqtt/submitConnect');
        this.fetchAfterConnect();
      },
      fetchAfterConnect() {
        this.$store.commit('setBusy', true);
        setTimeout(() => { // wait for device to restart
          this.$store.dispatch('mqtt/fetchStatus')
            .then(() => {
              const isConnected = this.$store.getters['mqtt/getStatus']();
              if (isConnected) this.$router.push('device-setup');
              return Promise.resolve();
            })
            .catch(err => {
              console.error(err);
              alert('Failed to connect with selected network');
            });
        }, 10*1000);
      },
    },
  }
</script>
