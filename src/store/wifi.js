import axios from 'axios';

import {API} from '@/constants';

export default {
  namespaced: true,
  state: {
    networks: [],
    ssid: '',
    pass: '',
    connected: false,
  },
  mutations: {
    setSsid(state, ssid) {
      state.ssid = ssid;
    },
    setPass(state, pass) {
      state.pass = pass;
    },
  },
  getters: {
    getNetworks: state => () => state.networks,
    getStatus: state => () => state.connected,
    getSsid: state => () => state.ssid,
  },
  actions: {
    fetchStatus({state, rootState}) {
      rootState.isBusy = true;
      return axios.get(API.SETTINGS.WIFI.STATUS)
        .then((response = {})  => {
          const {data} = response;
          state.ssid = data.ssid;
          state.connected = data.connected;
        })
        .finally(() => {
          rootState.isBusy = false;
        });
    },
    fetchScan({state, rootState}) {
      rootState.isBusy = true;
      return axios.get(API.SETTINGS.WIFI.SCAN)
        .then((response = {}) => {
          const {data} = response;
          state.networks = data;
        })
        .catch(function (err) {
          console.error(err);
          state.networks = [];
        })
        .finally(() => {
          rootState.isBusy = false;
        });
    },
    submitConnect({state, rootState}) {
      rootState.isBusy = true;
      let bodyFormData = new FormData();
      bodyFormData.set('ssid', state.ssid);
      bodyFormData.set('pass', state.pass);
      return axios.post(API.SETTINGS.WIFI.CONNECT, bodyFormData)
        .finally(() => {
          rootState.isBusy = false;
        });
    },
    submitDisconnect({rootState}) {
      rootState.isBusy = true;
      let bodyFormData = new FormData();
      return axios.post(API.SETTINGS.WIFI.DISCONNECT, bodyFormData)
        .finally(() => {
          rootState.isBusy = false;
        });
    },
  },
};
