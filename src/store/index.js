import Vue from 'vue';
import Vuex from 'vuex';

import wifiModule from './wifi';
import mqttModule from './mqtt';
import deviceModule from './device';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isBusy: false,
  },
  mutations: {
    setBusy(state, isBusy) {
      state.isBusy = isBusy;
    },
  },
  getters: {
    getBusy: state => () => state.isBusy,
  },
  modules: {
    wifi: wifiModule,
    mqtt: mqttModule,
    device: deviceModule,
  }
})
