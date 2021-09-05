import Vue from 'vue';
import App from './App';
import axios from './service/http';
import store from './store/store';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
export default {
  // 这部分相当于原生小程序的app.json，也可以直接在app.json中配置
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '第一个小程序',
      navigationBarTextStyle: 'black'
    }
  }
};