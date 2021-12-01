import React from "react";
import { useAuth } from '../../context/auth-context'
export const Dashboard = () => {
  const {user} = useAuth()
  return (
    <div>
      这是首页 
      <div>营业额</div>
      <div>销量冠军</div>
      {
          user? <p>{user.token}</p> : <div> 什么都没 </div>
        }
    </div>
  )
}