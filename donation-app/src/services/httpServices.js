import axios from "axios";
import { notification } from "antd";
let apiUrl = process.env.REACT_APP_BASE_URL;
const currentDateTime = Date();


/* Setting request headers*/
axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.headers.common['transfer-encoding'] = 'chunked'
axios.defaults.headers.common['server'] = 'Kestrel'
axios.defaults.headers.common['Date'] = currentDateTime

/* axios.defaults.headers.common["authorization"] = ""; */
// axios.defaults.headers.common["authorization"] = "Bearer";


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user-token") || "";

    if (token) {
      config.headers.common["authorization"] = token;
    }

    return config;
  },
  (error) => {
    /*Error Handling*/
    return Promise.reject(error);
  }
);

/*Intercepting the response in case of specif status codes*/
axios.interceptors.response.use(
  function (success) {

    let { data, status } = success;
    if (status === 200) {
      // cogoToast.error("Session Terminated will be logout");

      // localStorage.clear();

      // window.location.href = "/maroc";
      return Promise.resolve({ data, status });
    } else {
      if (status === 400) {
        notification.error({
          message: "Error",
          description: `Session Terminated will be logout`,
          className: "notification-type-success",
        });

      }
      return Promise.reject({ data, status });
    }
  },
  function (error) {
    
    if (error.status === 401) {
      // window.location.href = "/login";
      localStorage.clear();
      return;
    }
    if (error.status === 403) {
      // window.location.href = "/login";
      localStorage.clear();
      return;
    }
    if (error.status === 404) {
      // window.location.href = "/login";
      notification.error({
        message: "Error",
        description: `${error.error}`,
        className: "notification-type-success",
      });

      localStorage.clear();
      return;
    }
    return Promise.reject(error);
  }
);
const requestObject = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  baseURL: apiUrl,
}
export default requestObject;
