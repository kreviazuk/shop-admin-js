import {loginReducer} from "./module/login_reducer"
export const store = {
  user:null,
  message:null
}
const obj  = {
  ...loginReducer,
}

export const reducer =  (state,action)=>{
  const fn = obj[action.type]
  if(fn){
   return fn(state , action)
  }else{
    throw new Error('找不到对应的方法')
  }
} 
// export const reducer = (state,action) => {
//   switch(action.type){
//     case 'setUser':
//       return {...state,user:action.user}
//     default:
//       throw new Error('nuknown type')
//   }
// }