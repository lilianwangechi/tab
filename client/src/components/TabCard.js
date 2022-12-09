import { Button, Space, Modal, InputNumber, Form, Input, message } from 'antd';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined,  DollarCircleOutlined, UserOutlined, UsergroupDeleteOutlined  } from '@ant-design/icons';
import { Popconfirm, Popover, Avatar } from 'antd';
import ItemCard from './ItemCard';

function TabCard({ tab, user, handleDeleteTab, handleSettle }) {
  
    // line 8: state for popconfirm of delete function
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemValue, setItemValue] = useState(0)
    const [errors, setErrors] = useState([]);
    const [form] = Form.useForm();
    const [itemsToDisplay, setItemsToDisplay] = useState(tab.items)
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      function handleDelete(id) {
          fetch(`/api/items/${id}`,{
              method:"DELETE"
          })
          .then(r=>{
            if (r.ok) {
                let newList = itemsToDisplay.filter((item)=>{
                    return (item.id!==id)
                })
                setItemsToDisplay(newList)
            }
          })
      }
      const success = () => {
        message.success('New Item Created!');
      };
      console.log(itemsToDisplay)
      function handleSubmit() {
        fetch("/api/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tab_id: tab.id,
                name: itemName,
                price: itemValue,
                completed: false,
                user_id: user.id
            }),
        }).then(r=>{
                if (r.ok) {
                    r.json().then((new_item=>{
                        setItemsToDisplay([...itemsToDisplay, new_item])
                        success()
                        setIsModalVisible(false)
                    }))
                } else {
                    r.json().then((err)=>setErrors([...errors, err.errors]))
                }
            })
        form.resetFields()
      }
    // delete function starts here: 
    const showPopconfirm = () => {
        setVisible(true);   
    };

    const handleOkToDelete = () => {
        setTimeout(() => {
            setVisible(false);
        }, 2000);
        handleDeleteTab(tab.id);
    };

    const handleCancelDelete = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const { confirm } = Modal
    function showConfirm() {
        confirm({
            title: "Are you sure settle this tab?",
            icon: <ExclamationCircleOutlined />,
            content: "Once you settle, no one will be able to add items and you can see bill splitting result in completed tabs section.",
            okText: "Yes",
            okType: "primary",
            onOk(){
                handleSettle(tab.id)
            }
        })
    }
    const participants = (
        <Space direction="vertical">
            {tab.users.map((user)=>{
                return (<Space key={user.id}><Avatar icon={<UserOutlined />} />{user.full_name}</Space>)
            })}
        </Space>
    )
    const ownAmount = (
        ((itemsToDisplay.reduce(function (acc, item) { return acc+item.price},0)-
        itemsToDisplay.filter(item=>item.user_id===user.id).reduce(function (acc, item) { return acc+item.price},0))/tab.users.length).toFixed(2)
    )
    return (
        <div id="tabcard">
            <Space>
                <Button onClick={showModal}>
                    <PlusOutlined />
                    New Item
                </Button>
                <Modal title="Create New Item" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <Form
                        name="newitem"
                        form={form}
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        autoComplete="off"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input item name!',
                            },
                            ]}
                        >
                            <Input name="name" onChange={(e)=>{
                                setItemName(e.target.value)
                            }} />
                        </Form.Item>
                        <Form.Item
                            label="Cost"
                            name="cost"
                            rules={[
                            {
                                required: true,
                                message: 'Please input item cost!',
                            },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} step="0.0001" name="cost" onChange={(value)=>setItemValue(value)} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                            offset: 10,
                            span: 16,
                            }}
                        >
                            <Button htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Popconfirm
                    title="Are you sure you want to delete this tab? All items will be deleted all together. Think twice!!"
                    visible={visible}
                    onConfirm={handleOkToDelete}
                    onCancel={handleCancelDelete}
                    okText="Yes"
                    >
                    <Button onClick={showPopconfirm}>
                        <DeleteOutlined  />
                        Delete Tab
                    </Button>
                </Popconfirm>
                <Button onClick={showConfirm}>
                    <DollarCircleOutlined />
                    Settle
                </Button>
                <Popover placement="bottomLeft" content={participants} trigger="click">
                    <Button>
                        <UsergroupDeleteOutlined />
                        Participants
                    </Button>
                </Popover>
                You Currently owe:  ${ownAmount}
            </Space>
            <div id="itemcard">
                {itemsToDisplay.length>0? 
                <Space direction="vertical">
                    {itemsToDisplay.map((item)=>{
                        return (<ItemCard key={item.id} item={item} handleDelete={handleDelete} />)
                    })}
                </Space>:
                <h2>No item at the moment, please add new items!</h2>}
            </div>
        </div>
    )
}

export default TabCard