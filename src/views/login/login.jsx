import React,{useContext}from "react";
import { Form, Input,Button, message } from "antd";
import { AuthContext } from "../../context/auth-context";
import {getTemporaryToken} from './api-auth'
import UUID from "es6-uuid";

export const LoginScreen = () => {
  const {state,dispatch} =  useContext(AuthContext)
  const key = UUID(32)
  const handleSubmit = async (values) => { 
    console.log(values)
    try{
      const user = {...values}
      console.log(user)
      dispatch({type:'setUser',user})
    }catch(error){
      message.error(error.message);
    }
  }
  // getTemporaryToken({ tokenKey: key }).then(res => {
  //   console.log('res')
  //   console.log(res)
  // })
  const tempToken = async () => {
    console.log('我被执行了')
    const res = await getTemporaryToken({ tokenKey: this.key })
    console.log('res')
    console.log(res)
    return res
  } 
  // console.log('tempToken')
  // console.log(tempToken)
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button  htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );}