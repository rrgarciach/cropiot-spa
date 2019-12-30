export const DEVICE_TYPES = {
  DEFAULT: 'default',
  ENVIRONMENT_SENSOR_V1: 'environment_sensor_v1',
};
export const API_HOST = process.env.NODE_ENV === 'production' ? '' : process.env.VUE_APP_API_HOST;
export const API = {
  SETTINGS: {
    DEVICE: `${API_HOST}/api/settings/device`,
    WIFI: {
      STATUS: `${API_HOST}/api/settings/wifi/status`,
      CONNECT: `${API_HOST}/api/settings/wifi/connect`,
      SCAN: `${API_HOST}/api/settings/wifi/scan`,
      DISCONNECT: `${API_HOST}/api/settings/wifi/disconnect`,
    },
    MQTT: {
      STATUS: `${API_HOST}/api/settings/mqtt/status`,
      CONNECT: `${API_HOST}/api/settings/mqtt/connect`,
      SUBSCRIBE: `${API_HOST}/api/settings/mqtt/subscribe`,
      PUBLISH: `${API_HOST}/api/settings/mqtt/publish`,
    },
  },
  DEVICE: {
    DATA: `${API_HOST}/api/device/data`,
  },
};
