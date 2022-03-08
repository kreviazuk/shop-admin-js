import React from 'react'
import { useAuth } from '../../context/auth-context'

export const ShopSetting = () => {
  const {user} = useAuth()
  return (
    <div>
        这个是设置页面
        {
          user? <p>{user.name}</p> : <div> 什么都没 </div>
        }
    </div>
  )
}