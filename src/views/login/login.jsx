import React,{useContext}from "react";
import { Form, Input,Button, message } from "antd";
import { login } from "./api-auth";
import { AuthContext } from "../../context/auth-context";
import { useQuery } from "react-query";
//import { FullPageErrorFallback } from "../../components/lib";

export const LoginScreen = () => {
  const {state,dispatch} =  useContext(AuthContext)
  console.log(state)
  const handleSubmit = async (values) => { 
    try{
      const user = await login(values)
      dispatch({type:'setUser',user:user.data})
    }catch(error){
      message.error(error.message);
    }
  }
   
  const { status, error, data} = useQuery('login', handleSubmit,{enabled:false});
  console.log(status,data)
  if(status ==='error'){
    return <div>{error.message}</div>
  }else{
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
        <Button loading={status==='loading'|| status ==='isIdle'} htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );}
};