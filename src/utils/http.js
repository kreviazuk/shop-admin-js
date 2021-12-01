import qs from "qs";
import * as auth from "../views/login/api-auth";

const apiUrl = process.env.REACT_APP_API_URL;

export const http = async (
  endpoint, { data, token, headers, ...customConfig }
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok && data.code === 1) {
        return data;
      } else {
        return Promise.reject(data);
        //throw new Error(data.data)
      }
    });
};
