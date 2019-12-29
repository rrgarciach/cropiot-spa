import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import {API} from '@/constants';
import wifiModule from './wifi';

Vue.use(Vuex);

const DEVICE_TYPES = {
  DEFAULT: 'default',
  ENVIRONMENT_SENSOR_V1: 'environment_sensor_v1',
};

export default new Vuex.Store({
  state: {
    device: {
      name: 'Device',
      type: DEVICE_TYPES.DEFAULT,
    },
    isBusy: false,
  },
  mutations: {
    setName(state, name) {
        state.device.name = name || 'Device';
    },
    setType(state, type) {
      const ucKey = String(type).toUpperCase();
      if (DEVICE_TYPES[ucKey])
        state.device.type = ucKey;
      else
        state.device.type = DEVICE_TYPES.DEFAULT;
    },
  },
  actions: {
    fetchDeviceType({state, mutations}) {
      return axios.get(API.SETTINGS.DEVICE)
        .then((response = {}) => {
          const {name, type} = (response.data) ? response.data.deviceType : null;
          state.isBusy = false;
          mutations.setName(state, name);
          mutations.setType(state, type);
          return Promise.resolve(response);
        });
    },
  },
  modules: {
    wifi: wifiModule,
  }
})
