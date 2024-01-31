import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,Checkbox } from 'antd';
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import "./style.css";



export function  Login () {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const formData = {
                user_id: values.user_id,
                user_pw: values.user_pw,
                rememberMe: values.rememberMe,
            };

            const response = await axios.post('/login', formData, {
                withCredentials: true, // 인증 정보 포함 여부 설정
            });
            alert("로그인 성공");
            console.log("Login Success:", response.data);
            navigate('/board/add');
        } catch (error) {
            if (error.response.status === 404 ) {
                alert("로그인 실패");
            }
            console.error("Login Error", error);
        }
    };





    return(
        <div className="login-form">

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
                    name="user_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="user_pw"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item name="rememberMe" valuePropName="checked" style={{marginLeft: "150px"}}>
                        <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}