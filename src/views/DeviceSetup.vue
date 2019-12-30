<template>
  <b-row class="device-setup">
    <b-col>
      <h4>Device Setup</h4>
      <form>
        <b-form-group>
        </b-form-group>
        <b-button block variant="success" @click="onSubmit">Submit</b-button>
      </form>
    </b-col>
  </b-row>
</template>

<script>
  import {BCol, BRow, BFormGroup, BButton} from 'bootstrap-vue';

  export default {
    name: 'DeviceSetup',
    components: {
      BCol,
      BRow,
      BFormGroup,
      BButton,
    },
    data() {
      return {
        host: '',
        token: '',
      }
    },
    beforeMount() {
      this.$store.dispatch('mqtt/fetchStatus')
        .then(() => {
          const isConnected = this.$store.getters['mqtt/getStatus']();
          if (!isConnected) this.$router.push('device-setup');
        });
    },
    mounted() {
      this.$data.step = this.$store.getters['mqtt/getDetails']();
      this.watchers = [
        this.$store.watch(this.$store.getters['mqtt/getDetails'], (newVal = {}) => {
          this.$data.host = newVal.host;
          this.$data.token = newVal.token;
        }),
      ];
    },
    methods: {
      onSubmit() {
        if (!this.$data.host) alert('Invalid host URL');
        else if (!this.$data.token) alert('Invalid token');
        else this.connect();
      },
      connect() {
        this.$store.commit('mqtt/setHost', this.$data.host);
        this.$store.commit('mqtt/setToken', this.$data.token);
        this.$store.dispatch('mqtt/submitConnect')
          .then(() => this.$store.dispatch('mqtt/fetchStatus'))
          .catch(err => {
            console.error(err);
            alert('Failed to connect with selected network');
          });
      },
    },
  }
</script>
