import CONSTANT from '@/constant';

export default (result) => {
  // 是否有返回值，并且检查状态码是否是成功
  const { code, data, message } = result.data;
  // CONSTANT.AJAX_SUCCESS 以常量形式存储
  if (result && code === CONSTANT.AJAX_SUCCESS) {
    return data;
  }
  return message;
};
