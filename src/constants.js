export const API_HOST = process.env.VUE_APP_API_HOST || '//192.168.4.1';
export const API = {
  SETTINGS: {
    DEVICE: `${API_HOST}/api/settings/device`,
    WIFI: {
      STATUS: `${API_HOST}/api/settings/wifi/status`,
      CONNECT: `${API_HOST}/api/settings/wifi/connect`,
      SCAN: `${API_HOST}/api/settings/wifi/scan`,
      DISCONNECT: `${API_HOST}/api/settings/wifi/disconnect`,
    },
  },
};
