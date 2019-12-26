import Error from '../common/errorData';
import catchFn from '../common/catch';
import handleAjax from '../common/handleajax';

import { http } from './index';

export default {
  /**
   * 接口1
   */
  menuV1: () => http.get(`${process.env.VUE_APP_API}test`).then(Error).catch(error => catchFn(error.response)),
  /**
   * 接口2
   */
  menuV2: () => http.get(`${process.env.VUE_APP_API}test2`).then(handleAjax).catch(error => catchFn(error.response)),
};
