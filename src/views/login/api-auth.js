import { http } from "../../utils/http";

export const getToken = () => window.localStorage.getItem('token');

export const login = (data) => http('api/admin/login' , {data,method:'post'})


export const logout = async () =>
  window.localStorage.removeItem('token');