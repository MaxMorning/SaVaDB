import React, { Component } from 'react';
import { Form, Input, Tabs, Modal, notification } from 'antd';
import { LoginOutlined, PlusCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import Requester from '../utils/Requester';

const CryptoJS = require('crypto-js'); 

const { TabPane } = Tabs;

export default class EditInfoModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            confirmLoading: false
        };

        this.resetParent = props.resetParent;
        this.currentTab = '1';
    }

    newUsernameForm = React.createRef();
    newPasswordForm = React.createRef();

    onTabClick = (key, event) => {
        this.currentTab = key;
    }

    showModal = () => {
        this.setState({
            visible: true,
            confirmLoading: false
        })
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true
        });

        // post to change info
        if (this.currentTab === '1') {
            // new username
            var username_form_obj = this.newUsernameForm.current.getFieldValue();
            var password = username_form_obj.password;

            var shad_password = CryptoJS.SHA512(password);
            shad_password = shad_password.toString(CryptoJS.enc.Base64);

            Requester.requestJSON({
                method: 'post',
                url: '/api/user/changeUsername',
                data: {
                    username: username_form_obj.username,
                    password: shad_password
                }
            },
            true,
            (response) => {
                if (200 === response.data.code) {
                    // 修改成功
                    Requester.storeAuthToken(response.data.data);
                    
                    this.resetParent(username_form_obj.username);
                    this.setState({
                        confirmLoading: false,
                        visible: false
                    });
                }
                else if (402 === response.data.code) {
                    const args = {
                        message: 'Name duplicated',
                        description:
                            'New username is used, please use another username.',
                        duration: 4,
                    };
                    notification.open(args);

                    this.setState({
                        confirmLoading: false,
                        visible: true
                    });
                }
                else {
                    const args = {
                        message: 'Change Failed',
                        description:
                          'Change username failed because of some unknown reason.',
                        duration: 4,
                    };
                    notification.open(args);

                    this.setState({
                        confirmLoading: false,
                        visible: true
                    });
                }
            },
            (error) => {
                const args = {
                    message: 'Change Failed',
                    description:
                      'Change username failed because of some unknown reason.',
                    duration: 4,
                };
                notification.open(args);

                this.setState({
                    confirmLoading: false,
                    visible: true
                });
            }
            );
        }
        else {
            // new password
            var password_form_obj = this.newPasswordForm.current.getFieldValue();
            var password = password_form_obj.password;

            var shad_password = CryptoJS.SHA512(password);
            shad_password = shad_password.toString(CryptoJS.enc.Base64);

            var newPassword = password_form_obj.newPassword;

            var shad_new_password = CryptoJS.SHA512(newPassword);
            shad_new_password = shad_new_password.toString(CryptoJS.enc.Base64);
            
            Requester.requestJSON({
                method: 'post',
                url: '/api/user/changePassword',
                data: {
                    oldPassword: shad_password,
                    newPassword: shad_new_password
                }
            },
            true,
            (response) => {
                if (200 === response.data.code) {
                    // 修改成功                    
                    this.resetParent(null);
                    this.setState({
                        confirmLoading: false,
                        visible: false
                    });
                }
                else {
                    const args = {
                        message: 'Change Failed',
                        description:
                          'Change password failed because of some unknown reason.',
                        duration: 4,
                    };
                    notification.open(args);

                    this.setState({
                        confirmLoading: false,
                        visible: true
                    });
                }
            },
            (error) => {
                const args = {
                    message: 'Change Failed',
                    description:
                      'Change password failed because of some unknown reason.',
                    duration: 4,
                };
                notification.open(args);

                this.setState({
                    confirmLoading: false,
                    visible: true
                });
            }
            );
        }
    }

    handleCancel = () => {
        this.resetParent();
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <Modal
                title='Edit Info'
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                confirmLoading={this.state.confirmLoading}>
                <Tabs defaultActiveKey="1" centered
                    onTabClick={this.onTabClick}>
                    <TabPane tab='Change Username' key='1'>
                        <Form
                            name='new_name'
                            style={{
                                padding: '10px'
                            }}
                            ref={this.newUsernameForm}>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new username!',
                                    },
                                ]}>
                                <Input prefix={<UserOutlined style={{color: "#BBBBBB"}} />} placeholder="New username" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}>
                                <Input
                                    prefix={<LockOutlined style={{color: "#BBBBBB"}} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                        </Form>
                    </TabPane>
                        <TabPane tab='Change password' key='2'>
                            <Form
                                name="new_password"
                                style={{
                                    padding: '10px'
                                }}
                                ref={this.newPasswordForm}>
                                <Form.Item
                                    name="password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your old password!',
                                    },
                                ]}>
                                <Input
                                    prefix={<LockOutlined style={{color: "#BBBBBB"}} />}
                                    type="password"
                                    placeholder="Old password"
                                />
                                </Form.Item>

                                <Form.Item
                                    name="newPassword"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}>
                                <Input
                                    prefix={<LockOutlined style={{color: "#BBBBBB"}} />}
                                    type="password"
                                    placeholder="New password"
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
                                        if (!value || getFieldValue('newPassword') === value) {
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
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }
}