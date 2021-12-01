import React from "react";
import { LayoutPage } from "./layoutpage";
import { Dashboard } from "../dashboard";
import { ShopSetting } from "../shop/setting";
import { GoodsSetting } from "../goods/goodssetting";
import { Routes,Route,Navigate} from "react-router-dom";
const ShopAddress = React.lazy(() => import('../shop/address'))
export const AuthPage =() => {
return(
  <div>
   <Routes>
     <Route path="/" element={<LayoutPage />}>
        <Route path="/dashboard"  element={<Dashboard />}></Route>
        <Route path='/order/setting' element={<ShopSetting />}></Route>
        <Route path='/order/address' element={<ShopAddress />} ></Route>
        <Route path='/goods/setting' element={<GoodsSetting />} ></Route>
        <Navigate to='/dashboard'></Navigate>
     </Route>
   </Routes>
  </div>
  )
}