const apiErrorNotify = (msg, callback) => {
  wx.showToast({
    title: msg,
    icon: '',
    duration: 2000
  });
};

  /**
 * 接口异常通知辅助函数
 * 使用 utils 中的 ajax 客户端进行数据请求时, 当请求出错, 会将该辅助函数回传给业务层, 方便业务层进行报错处理:
 *   import { ajax } from '../utils';
 *   const ajaxData = ajax.get('/xxx').catch({ error, errorNotify } => {
 *     errorNotify({
 *       api: '/xxx',
 *       errorMessage: '接口未返回数据',
 *     });
 *   });
 * 也可直接从 utils 中导入并使用该辅助函数:
 *   import { errorNotify } from '../utils';
 * @param {object or string} opts 异常信息, 可传递 { api, errorMessage } 或 string 类型报错信息
 */
const errorNotify = (opts) => {
  let msg = '';
  if (opts instanceof Object) {
    const { api: targetApi, errorMessage } = opts;
    if (targetApi !== undefined) {
      msg += `异常接口: ${targetApi}`;
    }
    if (errorMessage !== undefined) {
      msg += `异常详情: ${errorMessage}`;
    }
  } else if (typeof opts === 'string') {
    msg = opts;
  } else {
    throw TypeError(
      `Parameters passed to errorNotify should to be a object or string, got ${typeof opts}`
    );
  }
  apiErrorNotify(msg, ...opts);
};

export default errorNotify;
export { apiErrorNotify, errorNotify };