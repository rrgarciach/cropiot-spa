import axios from 'axios';

import {DEVICE_TYPES, API} from '@/constants';

export default {
  namespaced: true,
  state: {
    name: 'Device',
    type: DEVICE_TYPES.DEFAULT,
    data: {},
  },
  mutations: {
    setName(state, name) {
      state.name = name || 'Device';
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
    getData: state => () => state.data,
  },
  actions: {
    fetchDeviceType({state, rootState, commit}) {
      rootState.isBusy = true;
      return axios.get(API.SETTINGS.DEVICE)
        .then((response = {}) => {
          const {name, type} = response.data;
          if (name) commit('setName', name);
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
  },
};
