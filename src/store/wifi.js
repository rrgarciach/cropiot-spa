import axios from 'axios';

import {API} from '@/constants';

export default {
  namespaced: true,
  state: {
    networks: [],
  },
  modules: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    fetchScanNetworks({state, rootState}) {
      state.isBusy = true;
      return axios.get(API.SETTINGS.WIFI.SCAN)
        .then((networks = []) => {
          rootState.isBusy = false;
          state.networks = networks;
        })
        .catch(function (err) {
          console.error(err);
          state.networks = [];
        });
    },
  },
};
