import React,{useState, useEffect} from "react";
import { Table,Space,Button,Modal,Form, Row, Input} from 'antd';
import {getGoods, editGoods} from './api-goods'
import { useQuery } from "react-query";
const formMoadl ={
  price: null,
  title: null,
  totalSale: null,
  stock: null,
  name: null,
  image: null
}
export const GoodsSetting = ()=> {
  const [form] = Form.useForm()
  const columns = [
    { title:"ID", dataIndex:'id', key:"id"},
    { title:'商品名称',dataIndex:'name',key:'name'},
    { title:'商品价格', dataIndex:'price',key:'price'},
    { title:'商品描述',dataIndex:'title',key:'title'},
    { title:'库存',dataIndex:'stock',key:'stock'},
    { title:'累计售出',dataIndex:'totalSale',key:'totalSale'},
    // { title:'商品展示图',dataIndex:'image',key:'image'},
    {
      title:'操作',
      key:'action',
      render:(text,record) => (
        <Space size='middle'>
          <Button type="primary" onClick={()=> handleEdit(text,record)}>编辑</Button>
          <Button type="danger" onClick={()=> handleDelete(text, record)}>删除</Button>
        </Space>
      )
    }
  ]
  
  const [modalState,setModalState] = useState({
    isVisible:false,
    type: 'add'
  })

  const [initForm, setInitForm] = useState(formMoadl)

  // useEffect(() => {
  //   console.log('effect',initForm)
  // }, [initForm])

  const getGoodsList = async () => {
    const res = await getGoods()
    return res.data
  }
  const query = useQuery('goodsList',getGoodsList)
  const {status ,data, error} = query

  const handleEdit = (text,record) => {
    setInitForm(Object.assign(record,{}))
    setModalState({ ...modalState, type:"edit", isVisible:true })
    console.log(text, record)
  }
  
  const modalTitle = () => {
    let title = ''
    modalState.type === 'edit'? title = '编辑' : title ='新增'
    return title
  }

  const handleClose = () => {
    setModalState({...modalState,isVisible:false})
    form.resetFields();
    setInitForm(formMoadl)
  }
  const handleDelete = (text,record) => {
    console.log(text,record)
  }
  const goodsEdit = async(values) =>{
    const res = await editGoods(values)
    console.log('编辑', res)
    if(res.code === 1) {

    }
  }

  const handleSubmit = (values) => {
    console.log(values)
    const params ={...initForm,...values}
    modalState.type === 'edit'? goodsEdit(params): console.log('add')
  }

  const handleAdd = () => {
    setModalState({ ...modalState, type:"add", isVisible:true })
  }

  if(status==='loading'){ 
    return <div>loading....</div>
  }
  if(error){}
  if(data){
    return (
      <>
        <Row>
          <Button type="primary" onClick={handleAdd}>新增</Button>
        </Row>

        <Table dataSource={data} columns={columns}></Table>
      
        <Modal title={modalTitle()} visible={modalState.isVisible} onOk={()=>{}} onCancel={handleClose}>
          <Form 
            form={form}
            initialValues={initForm}
            onFinish={handleSubmit}>
            <Form.Item shouldUpdate label="商品名称" name="name" rules={[
              {
                required: true,
                message: '请添加商品名称',
              }
            ]}>
              <Input />
            </Form.Item>
            <Form.Item label="价格设置" name="price" rules={[
              {
                required: true,
                message: '请设置价格',
              }
            ]}>
              <Input />
            </Form.Item>
            <Form.Item shouldUpdate label="商品描述" name="title" rules={[
              {
                required: true,
                message: '请添加商品描述',
              }
            ]}>
              <Input />
            </Form.Item>
         
            <Form.Item shouldUpdate label="库存" name="stock" rules={[
              {
                required: true,
                message: '请添加商品库存',
              }
            ]}>
              <Input />
            </Form.Item>

            <Form.Item shouldUpdate
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
          <Button type="primary" htmlType={"submit"}> 提交 </Button>
        </Form.Item>
      </Form>
      </Modal>
      </>
    )
  }
  
}