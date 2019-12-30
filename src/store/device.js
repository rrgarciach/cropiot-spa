import axios from 'axios';

import {DEVICE_TYPES, API} from '@/constants';

export default {
  namespaced: true,
  state: {
    name: 'Device',
    pass: '',
    type: DEVICE_TYPES.DEFAULT,
    data: {},
  },
  mutations: {
    setName(state, name) {
      state.name = name || 'Device';
    },
    setPass(state, pass) {
      state.pass = pass || '';
    },
    setType(state, type) {
      const ucKey = String(type).toUpperCase();
      if (DEVICE_TYPES[ucKey])
        state.type = ucKey;
      else
        state.type = DEVICE_TYPES.DEFAULT;
    },
    setData(state, data) {
      state.data = data || {};
    },
  },
  getters: {
    getType: state => () => state.type,
    getName: state => () => state.name,
    getData: state => () => state.data,
  },
  actions: {
    fetchDeviceType({state, rootState, commit}) {
      rootState.isBusy = true;
      return axios.get(API.SETTINGS.DEVICE)
        .then((response = {}) => {
          const {deviceName, type} = response.data;
          if (deviceName) commit('setName', deviceName);
          if (type) commit('setType', type);
          state.isBusy = false;
          return Promise.resolve(response);
        })
        .finally(() => {
          rootState.isBusy = false;
        });
    },
    fetchData({state, commit}) {
      return axios.get(API.DEVICE.DATA)
        .then((response = {}) => {
          const {data} = response;
          if (data) commit('setData', data);
          state.isBusy = false;
          return Promise.resolve(response);
        });
    },
    submitDevice({state, rootState}) {
      rootState.isBusy = true;
      let bodyFormData = new FormData();
      bodyFormData.set('deviceName', state.name);
      return axios.post(API.SETTINGS.DEVICE, bodyFormData)
        .finally(() => {
          rootState.isBusy = false;
        });
    },
  },
};
