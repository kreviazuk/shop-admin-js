import React from 'react'
import { useAuth } from '../../context/auth-context'

export const ShopSetting = () => {
  const {user} = useAuth()
  return (
    <div>
        这个是门店设置
        {
          user? <p>{user.token}</p> : <div> 什么都没 </div>
        }
    </div>
  )
}