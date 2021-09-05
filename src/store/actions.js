import config from '@/apis/common';

export default {
  addNameAction() {
    this.$axios.wxHttp(
      config.hasOrder, 'get'
    ).then((res) => {
      console.log(res);
    });
  }
}