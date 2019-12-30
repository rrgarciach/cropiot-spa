<template>
  <b-row class="wifi-setup">
    <b-col>
      <h4>WiFi Setup <b-badge :variant="connected ? 'success' : 'danger'">{{ connected ? 'Connected' : 'Not connected' }}</b-badge></h4>
      <form v-if="!connected">
        <b-form-group>
          <label for="ssid">SSID:</label>
          <b-dropdown id="ssid" block :text="ssid ? ssid : 'Select WiFi Network'" menu-class="w-100">
            <b-dropdown-item v-if="!networks.length" disabled>No networks were found.</b-dropdown-item>
            <b-dropdown-item
              v-else
              v-for="n in networks"
              :key="n.ssid"
              @click="() => onSsidSelect(n.ssid)">
              {{ n.ssid }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
        <b-form-group>
          <label for="pass">Password:</label>
          <b-input-group id="pass">
            <b-form-input type="password" v-model="pass" placeholder="Network password"/>
          </b-input-group>
        </b-form-group>
        <b-button block variant="success" @click="onSubmit">Connect</b-button>
      </form>
      <div v-else>
        <b-list-group>
          <b-list-group-item>
            <small>SSID:</small>
            <h5>{{ ssid }}</h5>
          </b-list-group-item>
        </b-list-group>
        <br>
        <b-button block variant="warning" @click="disconnect">Disconnect</b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import {BCol, BRow, BFormGroup, BInputGroup, BFormInput, BBadge, BButton, BDropdown, BDropdownItem, BListGroup, BListGroupItem} from 'bootstrap-vue';

  export default {
    name: 'WiFiSetup',
    components: {
      BCol,
      BRow,
      BFormGroup,
      BInputGroup,
      BFormInput,
      BBadge,
      BButton,
      BDropdown,
      BDropdownItem,
      BListGroup,
      BListGroupItem,
    },
    data() {
      return {
        networks: [],
        ssid: '',
        pass: '',
        connected: false,
      }
    },
    async beforeMount() {
      await this.$store.dispatch('wifi/fetchStatus');
      this.fetchScan();
    },
    mounted() {
      this.$data.networks = this.$store.getters['wifi/getNetworks']();
      this.$data.ssid = this.$store.getters['wifi/getSsid']();
      this.$data.connected = this.$store.getters['wifi/getStatus']();
      this.watchers = [
        this.$store.watch(this.$store.getters['wifi/getNetworks'], newVal => {
          this.$data.networks = newVal;
        }),
        this.$store.watch(this.$store.getters['wifi/getSsid'], newVal => {
          this.$data.ssid = newVal;
        }),
        this.$store.watch(this.$store.getters['wifi/getStatus'], newVal => {
          this.$data.connected = newVal;
          this.fetchScan();
        }),
      ];
    },
    destroyed() {
      this.watchers.map(unwatch => unwatch());
    },
    methods: {
      onSsidSelect(ssid) {
        this.$data.ssid = ssid;
      },
      fetchScan() {
        if (!this.$data.connected)
          this.$store.dispatch('wifi/fetchScan');
      },
      onSubmit() {
        if (!this.$data.ssid) alert('Invalid SSID');
        else if (!this.$data.pass) alert('Invalid password');
        else this.connect();
      },
      async connect() {
        this.$store.commit('wifi/setSsid', this.$data.ssid);
        this.$store.commit('wifi/setPass', this.$data.pass);
        await this.$store.dispatch('wifi/submitConnect');
        this.fetchAfterConnect();
      },
      fetchAfterConnect() {
        this.$store.commit('setBusy', true);
        setTimeout(() => { // wait for device to restart
          this.$store.dispatch('wifi/fetchStatus')
            .then(() => {
              const isConnected = this.$store.getters['wifi/getStatus']();
              if (isConnected) this.$router.push('mqtt-setup');
            })
            .catch(err => {
              console.error(err);
              alert('Failed to connect with selected network');
            });
        }, 10*1000);
      },
      async disconnect() {
        await this.$store.dispatch('wifi/submitDisconnect');
        this.fetchAfterConnect();
      },
    },
  }
</script>
