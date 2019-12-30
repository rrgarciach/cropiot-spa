import axios from 'axios';

import {API} from '@/constants';

export default {
  namespaced: true,
  state: {
    host: '',
    port: 1883,
    token: '',
    connected: false,
  },
  mutations: {
    setHost(state, host) {
      state.host = host;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  getters: {
    getStatus: state => () => state.connected,
    getDetails: state => () => {
      return {
        host: state.host,
        port: state.port,
        token: state.token,
        connected: state.connected,
      };
    },
  },
  actions: {
    fetchStatus({state, rootState}) {
      rootState.isBusy = true;
      return axios.get(API.SETTINGS.MQTT.STATUS)
        .then((response = {})  => {
          const {data} = response;
          state.host = data.host;
          state.token = data.token;
          state.connected = parseInt(data.connected);
        })
        .finally(() => {
          rootState.isBusy = false;
        });
    },
    submitConnect({state, rootState}) {
      state.isBusy = true;
      let bodyFormData = new FormData();
      bodyFormData.set('host', state.host);
      bodyFormData.set('token', state.token);
      return axios.post(API.SETTINGS.MQTT.CONNECT, bodyFormData)
        .catch(function (err) {
          console.error(err);
        })
        .finally(() => {
          rootState.isBusy = false;
        });
    },
  },
};
