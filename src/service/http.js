import baseURL from './baseURL';
import qs from 'qs';
import { errorNotify } from './apiErrorHandler';

// 封装请求，并设置请求拦截和响应拦截
// 相同前缀的url
const baseUrl = baseURL.baseURL;

// 请求拦截
function requestInterceptor (config) {
  console.log(config);
  const newConf = { ...config };
  console.log(newConf);
  // 在这里做请求头定制处理
  if (newConf.contentType === 'form') {
    newConf.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    newConf.data = qs.stringify(newConf.data);
  } else if(newConf.contentType === 'uploadFile') {
    newConf.headers['Content-Type'] = 'multipart/form-data';
  } else if (config.contentType) {
    newConf.headers['Content-Type'] = newConf.contentType;
    newConf.data = qs.stringify(newConf.data);
  } else {
    newConf.headers['Content-Type'] = 'application/json';
  }
  delete newConf.contentType;
  // headers加参数
  // let SESSIONID = wx.getStorageSync('SESSIONID');
  // newConf.headers.common['x-access-token'] = SESSIONID;
  return newConf;
}

// 响应拦截
function responseInterceptor (response,resolve, reject) {
  if (response.status !== 200) {
    errorNotify({
      errorMessage: `${response.status}`
    });
    reject(new Error(`Http 状态异常 ${response.status}`));
  }
  if (response.data.status === 0 || response.data.status === 200 || response.errMsg === 'openDocument:ok' || response.config.url.includes('version.json')) {
    resolve(response);
    return response;
  } else {
    errorNotify({
      errorMessage: `${response.data.errorMessage}`
    });
    reject(new Error(`接口异常 ${response.data.errorMessage}`));
  }
}

function request(config, wxRequestType) {
  let newConfig = requestInterceptor(config);
  let url = newConfig.url;
  let data = newConfig.method === 'get' ? newConfig.params : qs.stringify(newConfig.data);
  let header = newConfig.header || {};
  let method = newConfig.method;
  wxRequestType = wxRequestType || 'request';
  let promise = new Promise(function(resolve, reject) {
    wx[wxRequestType]({
      url: baseUrl + url,
      header: header,
      // 每个请求都提前自动传递token
      data: data,
      method: method,
      success: function(res) {
        responseInterceptor(res);
      },
      fail: function(err) {
        reject(err);
      },
      complete: function() {
      // 不管是success还是fail都会走这里的函数
      }
    });
  });
  return promise;
}

const wxHttp = function(url, method, data, contentType) {
  return request({
    url: url,
    method: method,
    data: data,
    headers: {},
    contentType: contentType
  });
};

const uploadFile = function(url, method, data, contentType) {
  return request({
    url: url,
    method: method,
    data: data,
    headers: {},
    contentType: 'uploadFile'
  }, 'uploadFile');
};

const downloadFile = function(url, method, data, contentType) {
  return request({
    url: url,
    method: method,
    data: data,
    headers: {},
    contentType: 'uploadFile'
  }, 'downloadFile');
};

// 导出模块
export default {
  wxHttp,
  uploadFile,
  downloadFile
};