import Axios from "axios";
import GConfig from "../config";
// import typedarrayToBuffer from "typedarray-to-buffer";

// function getQueryString(obj) {
//   return (
//     "" +
//     Object.entries(obj)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("&")
//   );
// }

// Axios.defaults.headers.common[''] = ''
const requestDefaultConfig = {
  // baseURL: '',
  // `headers` 是即将被发送的自定义请求头
  headers: {},
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  // timeout: 30000,
  // paramsSerializer: {
  //   // encode: (param) => {
  //   //   console.log(param, "encode");
  //   //   return param;
  //   // },
  //   serialize: (params) => {
  //     return getQueryString(params);
  //   },
  // },
  // proxy: {
  //   protocol: "http",
  //   host: "124.223.182.46",
  //   // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
  //   port: 8080,
  //   // auth: {
  //   //   username: 'mikeymike',
  //   //   password: 'rapunz3l'
  //   // }
  // },
};

let customAxios = Axios.create(requestDefaultConfig);

// 添加请求拦截器
customAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (config.data) {
      for (let key in config.data) {
        if (
          config.data[key] === null ||
          config.data[key] === "null" ||
          config.data[key] === undefined ||
          config.data[key] === "" ||
          config.data[key] === "undefined"
        ) {
          delete config.data[key];
        }
      }
    }

    if (config.params) {
      for (let key in config.params) {
        if (
          config.params[key] === null ||
          config.params[key] === "null" ||
          config.params[key] === undefined ||
          config.params[key] === "" ||
          config.params[key] === "undefined"
        ) {
          delete config.params[key];
        }
      }
    }

    if (config.url !== "/api/user/login") {
      let token = localStorage.getItem("TOKEN");
      // 请求头携带token
      config.headers.Authorization = token;
    }

    // if (config.url === "/api/chat/questions") {
    //   // 请求头携带token
    //   // config.headers["Content-Type"] = "application/octet-stream;charset=UTF-8";
    //   console.log(123);
    //   config.headers.responseType = "arraybuffer";
    // }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
customAxios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // response = response.data;
    // console.log(response, "response");

    // const headers = response.headers;
    // if (headers["content-type"].includes("application/octet-stream")) {
    // return response;
    // console.log(456, response);
    // const buffer = typedarrayToBuffer(new Uint8Array(response));
    // console.log(buffer, buffer);
    // return response.data;
    // return buffer;
    // }
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

function transformAxios(config) {
  if (GConfig.isTest || sessionStorage.isTest) {
    config.url = config.testUrl;
  }
  return customAxios(config);
}
export default transformAxios;
