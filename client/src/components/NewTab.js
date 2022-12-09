import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import DebounceSelect from './DebounceSelect';

function NewTab({ curr_user }) {
    const [value, setValue] = useState([]);
    const [tabName, setTabName] = useState("")
    const [form] = Form.useForm();
    const [errors, setErrors] = useState([]);
    async function fetchUserList(value) {
        return fetch("/api/users")
            .then(r=>r.json())
            .then((data)=>
                data.map((user)=>({
                    label: `${user.id} ${user.full_name}`,
                    value: user.email
                }))
            )
    }
    function handleInputChange(e) {
        setTabName(e.target.value)
    }
    console.log(curr_user.id)
    function handleSubmit() {
        fetch("/api/tabs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: tabName,
                completed: false
            }),
        }).then((r)=>{
            if (r.ok) {
                r.json().then(newtab=>{
                    handleSubmit2(newtab.id)
                    success()
                })
            } else{
                r.json().then((err)=>setErrors([...errors, err.errors]))
            }
        })
        
    }
    const success = () => {
        message.success('New Tab Created!');
      };

    function handleSubmit2(tab_id) {
        const users = value.map(v=>{return(v.label.split(' ')[0])})
        if (users.indexOf(curr_user.id.toString())===-1) {
            users.push(curr_user.id.toString())
        }
        users.map((user)=>{
            fetch("/api/usertabs", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: parseInt(user),
                    tab_id: tab_id
                }),
            }).then((r)=>{
                if (r.ok) {
                    r.json().then((data=>{console.log(data)}))
                } else{
                    r.json().then((err)=>setErrors([...errors, err.errors]))
                }
            })
        })
        form.resetFields()
    }
    return (
        <div id="newtab">
            <Form
            form={form}
            layout="vertical"
            wrapperCol={{span: 13,}}
            onFinish={handleSubmit}
            >
                <Form.Item
                    label="Tab Name"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input new tab name!',
                    },
                    ]}
                >
                    <Input onChange={handleInputChange} size="large" />
                </Form.Item>
                <Form.Item
                    label="Participants"
                    name="participants"
                    rules={[
                    {
                        required: true,
                        message: 'Please select tab participants!',
                    },
                    ]}
                >
                    <DebounceSelect
                        mode="multiple"
                        value={value}
                        placeholder="Select users"
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Form.Item>
                <Button htmlType="submit" size="large">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default NewTab