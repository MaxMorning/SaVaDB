import React, { Component } from 'react';
import "antd/dist/antd.min.css";
import { Tabs, Form, Input, Button, Checkbox, Typography } from 'antd';
import { LoginOutlined, PlusCircleOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import "./Login.css"
import '../utils/Requester'
import Requester from '../utils/Requester';

const CryptoJS = require('crypto-js'); 
const { TabPane } = Tabs;

export default class LoginPage extends Component {
    // onChangeCallback = (activeKey) => {
    //     if (activeKey == 'login') {
    //         this.tabsParentDiv.style.height = '386px';
    //     }
    //     else {
    //         this.tabsParentDiv.style.height = '498px';
    //     }
    // }

    loginForm = React.createRef();
    regForm = React.createRef();

    login = () => {
        var login_form_obj = this.loginForm.current.getFieldValue();
        var password = login_form_obj.password;

        var shad_password = CryptoJS.SHA512(password);
        shad_password = shad_password.toString(CryptoJS.enc.Base64);

        Requester.requestJSON({
            method: 'post',
            url: '/login',
            data: {
                username: login_form_obj.username,
                password: shad_password,
                keep_login: login_form_obj.remember
            }
        },
        false,
        (response) => {
            if ("success" === response.data.status) {
                // 登录成功
                // 将token写入local storage
                // 不论是否选择keep_login都保存，因为都需要保证在之后一小段时间内可以用token访问其它API
                Requester.storeAuthToken(response.data.Authorization);
                window.location.href='./';
            }
            else {
                alert("Login failed.\nstatus: " + response.status);
            }
        },
        (error) => {}
        );
    };

    register = () => {
        var reg_form_obj = this.regForm.current.getFieldValue();

        var password = reg_form_obj.password;

        var sha512_result = CryptoJS.SHA512(password);
        var shad_password = sha512_result.toString(CryptoJS.enc.Base64);
        console.log(shad_password);


        Requester.requestJSON({
            method: 'post',
            url: '/api/reg',
            data: {
                email: reg_form_obj.email,
                username: reg_form_obj.username,
                password: shad_password,
                keep_login: reg_form_obj.remember
            }
        },
        false,
        (response) => {
            if (200 === response.data.code) {
                // 注册成功
                // 将token写入local storage
                console.log(response);
                Requester.storeAuthToken(response.data.data);
                window.location.href='./';
            }
            else {
                alert("Register failed.\nstatus: " + response.data.msg);
            }
        },
        (error) => {}
        );
    };

    render() {
        return (
            <div>
                <h1 style={{margin: 25, textAlign: "center", fontSize: 45}}>SaVaDB</h1>
                <h1 style={{margin: 25, textAlign: "center", fontSize: 35}}>Login {"&"} Register</h1>
                <div style={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <div style={{
                        minWidth: 400,
                        maxWidth: 400,
                        background: "#EEEEEE",
                        borderRadius: 25,
                        padding: 50
                    }}>
                        <Tabs defaultActiveKey='login' centered>
                            <TabPane tab={
                                <span>
                                    <LoginOutlined />
                                    Login
                                </span>
                            } key='login'>
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    ref={ this.loginForm }>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                        ]}>
                                        <Input prefix={<UserOutlined style={{color: "#BBBBBB"}} />} placeholder="Username" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                        ]}>
                                        <Input
                                            prefix={<LockOutlined style={{color: "#BBBBBB"}} />}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                        </Form.Item>

                                        <Typography.Link href="" style={{float: "right"}}>
                                            Forgot password
                                        </Typography.Link>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button" block
                                        onClick={this.login}>
                                        Log in
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>

                            <TabPane tab={
                                <span>
                                    <PlusCircleOutlined />
                                    Register
                                </span>
                            }>
                                <Form
                                    name="normal_reg"
                                    className="login-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    ref={ this.regForm }>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                        ]}>
                                        <Input 
                                            prefix={<MailOutlined style={{color: "#BBBBBB"}} />}
                                            type="email"
                                            placeholder="Email"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                        ]}
                                        ref={(item) => (this.regUsername = item)}>
                                        <Input prefix={<UserOutlined style={{color: "#BBBBBB"}} />} placeholder="Username" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                        ]}>
                                        <Input
                                        prefix={<LockOutlined style={{color: "#BBBBBB"}} />}
                                        type="password"
                                        placeholder="Password"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="confirm"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                        ]}>
                                        <Input
                                            prefix={<LockOutlined style={{color: "#BBBBBB"}} />}
                                            type="password"
                                            placeholder="Confirm Password"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                        </Form.Item>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button" block onClick={this.register}>
                                        Register
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
            
            
        )
    }
}