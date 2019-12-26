import axios from 'axios';
import guid from 'em-underline/guid';
import Router from '../router/index';

const TOKEN = 'TOKEN'; // token key
const getGuid = window.$cookie.get('X-Session-Id') || guid();
window.$cookie.set('X-Session-Id', getGuid, '1m', '/', '/');

/**
 * Create Axios
 */
export const http = axios.create({
  timeout: 60000,
});

/**
 * Headers Config
 */
http.defaults.headers.common = {
  'X-Session-Id': getGuid,
};

/**
 * 处理请求时的姿势
 */
http.interceptors.request.use((config) => {
  config.headers.common[TOKEN] = window.$cookie.get(`${TOKEN}}`);
  return config;
}, () => {
  // 跳转到错误页面
  Router.push({
    name: 'Error',
  });
});

export default function install(Vue) {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return http;
      },
    },
  });
}
