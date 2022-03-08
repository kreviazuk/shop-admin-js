import React from "react";
import {Menu} from 'antd'
import { getSider } from "../api-sider";
import { useQuery } from "react-query";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from  "react-router-dom";

export const SiderBar =() =>{
  // const getSiderList = async () =>{
  //   const res =  await getSider()
  //   return res.data.siderList
  // }

  // const {status,data, error} = useQuery('siderList',getSiderList)
  // if(status ==='loading'){
  //   return(<div> 加载中。。。</div>)
  // }
  // if(status==='error'){
  //   return(<div>{error.message}</div>)
  // }
  const data = [
    {
      name:'首页',
      path:'/dashboard',
      id:1,
      chidlren:[]
    },
    {
      name:'订单管理',
      path:'/order',
      id:2,
      children:[
        {name:'订单处理',path:'/order/setting',id:21},
        // {name:'门店位置',path:'/shop/address',id:22},
        // {name:'员工管理',path:'/shop/worker',id:23},
      ]
    },
    {
      name:'商品管理',
      path:'/goods',
      id:3,
      children:[
        {name:'商品设置',path:'/goods/setting',id:31},
        // {name:'价格设置',path:'/goods/price',id:32},
      ]
    }
  ]
  const handleClick = (e) => {
    console.log(e)
  }
  // if(data){
    return (
      <Menu
        onClick={handleClick}
        style={{ width: 200 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="inline"
      >
          {
            data.map(item=>(
              item.children ? 
                <SubMenu key={item.id} title={item.name}>
                  {
                    item.children.map(
                      ele => (
                        <Menu.Item key={ele.id}>
                          <Link to={ele.path}> {ele.name}</Link>
                        </Menu.Item>
                      )
                    )
                  }
                </SubMenu>
                : <Menu.Item key={item.id} ><Link to={item.path}> {item.name}</Link></Menu.Item>
            ))
          }
      </Menu>
    )
  }
//}