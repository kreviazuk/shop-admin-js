import { http } from "../../utils/http";

export const getGoods = () => http('api/goods/index' ,{method:'get'})

export const editGoods = (data) => http('api/goods/editGoods',{data,method:'post'})