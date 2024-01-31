import React from 'react';
import { Button, Form, Input } from 'antd';
import "./style.css";
import axios from 'axios';


const onFinish = async (values) => {
    console.log("Button Click : ", values);
    try {
        // 폼에서 서버로 보낼 값 추출
        const formData = {
            user_id: values.username,
            user_pw: values.password,
            nickname: values.nickname,
            user_name: values.name,
        };

        // axios 로 서버로 전송
        const response = await axios.post('http://localhost:8080/join', formData);
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

export function Join () {
    const [form] = Form.useForm();
    return (
        <div className="join-form">
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="E-mail"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="confirm password"
                name="password2"
                rules={[
                    {
                        required: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                label="name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="nickname"
                name="nickname"
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
}