import React, { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { AuthContext } from "../../context/auth-context";
import { getTemporaryToken, login } from './api-auth'
import UUID from "es6-uuid";
import md5 from "md5";

export const LoginScreen = () => {
  const { state, dispatch } = useContext(AuthContext)
  const key = UUID(32)
  // 临时token
  const tempToken = async () => {
    const res = await getTemporaryToken({ tokenKey: key })
    console.log('res')
    console.log(res)
    return res
  }
  // 处理登陆
  const handleSubmit = async (values) => {
    const token = await tempToken()
    const ruleForm = {...values,...token}
    ruleForm.password = md5(ruleForm.password)
    try {
      // const user = { ...values }
      // console.log(user)
      const info = await login(ruleForm)
      const user = info.user
      console.log(123)
      localStorage.setItem('token',info.token)
      dispatch({ type: 'setUser', user })
    } catch (error) {
      message.error(error.message);
    }
  }
  
  tempToken()
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"loginName"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"loginName"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}