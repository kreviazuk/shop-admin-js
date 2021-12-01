
export const loginReducer = {
  setUser:(state,action) => {
    return {...state,user:action.user}
  }
}