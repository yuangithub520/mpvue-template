// 根据开发环境获取接口的baseURL
// envVersion: 'develop' | 'trial' | 'release'   分别对应的是开发版，体验版和正式版

const accountInfo = wx.getAccountInfoSync();
const envVersion = accountInfo.miniProgram.envVersion;
let baseURL = '';

const URLMap = {
  develop: {
    // BASE_URL: 'http://10.3.20.105:8062'
    BASE_URL: 'https://pro.xinghe360.com'
  },
  trial: {
    BASE_URL: 'https://pri.xinghe360.com'
  },
  release: {
    BASE_URL: 'https://pro.xinghe360.com'
  }
};
baseURL = URLMap[envVersion].BASE_URL;

export default { baseURL };