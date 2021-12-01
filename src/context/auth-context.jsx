import React ,{useReducer}from "react"
import { store,reducer } from "../reducers/index"
import UnAuthPage from "../views/login"
import { AuthPage } from "../views/layout/index"
//import { BrowserRouter } from "react-router-dom"

export const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}) => {
  const [state,dispatch] = useReducer(reducer,store)
  const {user} = state
  return <AuthContext.Provider value={{user,dispatch}}>
    {user? <AuthPage props={user}/> : <UnAuthPage /> }
  </AuthContext.Provider>  
}


export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};