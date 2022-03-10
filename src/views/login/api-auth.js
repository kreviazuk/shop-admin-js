import axiosUtil from "../../utils/http";
console.log('axiosUtil');
console.log(axiosUtil);
export function getTemporaryToken(data) {
  return axiosUtil.axiosGet('/ss/token', data)
}