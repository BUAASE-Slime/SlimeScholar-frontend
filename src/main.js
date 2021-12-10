import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


// import diy font
import './styles/font.css'
import user from "./store/user";

import * as echarts from 'echarts';
// import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// TIP: mount utils javascript methods
import userApi from "./utils/userApi";
import commonApi from "./utils/commonApi";
Vue.use(userApi);
Vue.use(commonApi);

// mount axios globally
Vue.prototype.$axios = axios;

// read data from public/global.json and mount it globally
axios.get('./global.json').then((data) => {
  Vue.prototype.GLOBAL = data.data;
  axios.defaults.baseURL = data.data.backUrl;
})

// add token into headers
axios.interceptors.request.use(
    config => {
      const userInfo = user.getters.getUser(user.state());
      if (userInfo) {
        config.headers.Authorization = userInfo.user.Authorization;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

// element UI
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
