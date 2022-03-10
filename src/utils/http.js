import service from "axios";
// import router from "@/router";
import qs from "query-string";
import paramsUtil from "./params.js";
import { message } from "antd";

const axios = service.create({
  timeout: 1500000, // 请求超时时间,
});
axios.defaults.withCredentials = true;
// 跳转错误页面
function goErrorPage(msg) {
  localStorage.setItem("error", msg);
  // router.push("/errorPage");
}
// 提示错误信息
function errorMessage(msg) {
  message.error({ title: "错误", message: msg });
}
let i = 0;
/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(
  (config) => {
    config.url = process.env.REACT_APP_API_URL + config.url
    if (config.url.indexOf("/check/isExist") === -1) {
      i++;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(
  (response) => {
    if (response.config.url.indexOf("/check/isExist") === -1) {
      i--;
      if (i < 1) {
      }
    }
    if (response.headers["filename"]) {
      return response;
    }
    if (response.data) {
      return paramsUtil.decodeParams(response.data);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);
export default {
  axiosGet( url, params) {
    console.log('我被调用了');
    if (!params) {
      params = {};
    }
    return new Promise(function (resolve, reject) {
      axios
        .get(url + "?" + qs.stringify(paramsUtil.encodeParams(params)), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });
    });
  },
  axiosPost(url, params, files) {
    if (params === undefined) {
      params = {};
    }
    return new Promise(function (resolve, reject) {
      axios
        .post(url, paramsUtil.encodeParamsPost(params, files), {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });
    });
  },
  axiosDownload(url, params) {
    if (params === undefined) {
      params = {};
    }
    return new Promise(function (resolve, reject) {
      axios
        .post(url, paramsUtil.encodeParamsPost(params), {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
          responseType: "arraybuffer",
        })
        .then((res) => {
          const blob = new Blob([res.data]);
          const filename = res.headers["filename"];
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = decodeURI(filename);
          const body = document.getElementsByTagName("body")[0];
          body.appendChild(a);
          a.click();
          body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch((res) => {
          reject(res);
        });
    });
  },
  axiosPut(url, params, files) {
    if (params === undefined) {
      params = {};
    }
    return new Promise(function (resolve, reject) {
      axios
        .put(url, paramsUtil.encodeParamsPost(params, files), {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });
    });
  },
  axiosDelete(url, params) {
    if (!params) {
      params = {};
    }
    return new Promise(function (resolve, reject) {
      axios
        .delete(url + "?" + qs.stringify(paramsUtil.encodeParams(params)), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });
    });
  },
};
