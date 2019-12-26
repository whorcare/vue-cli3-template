let flg = true;
export default (res) => {
  if (flg) {
    flg = false;
    if (res.status === 401) {
      window.location.replace(`${process.env.VUE_APP_ACCOUNT}login?redirect=${encodeURIComponent(window.location.href)}`);
    } else {
      console.log(res, 'err');
    }
  }
};
