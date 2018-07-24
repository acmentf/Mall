import axios from 'axios';
const AxiosIns = axios.create({
  timeout:2000,
  contentType: 'application/json'
})
let ajaxMethod = ['get', 'post'];
let api = {};
ajaxMethod.forEach((method)=> {
    //数组取值的两种方式
    api[method] = function (uri, data) {
        return new Promise(function (resolve, reject) {
          AxiosIns[method](uri, data).then(res=> {
                if (!res.data.code) {
                  resolve(res.data.data);
                } else {
                  reject(res.data.msg)
                }
            }).catch((response)=> {
            })
        })
    }
});
export default api;