import React, { Component } from 'react';
import { Steps, Form, Input, Button, notification, Result } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Localizer from '../utils/Localizer';
import CountDownButton from '../component/CountDownButton';
import Requester from '../utils/Requester';
const { Step } = Steps;
const CryptoJS = require('crypto-js'); 

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getCode: false,
            currentStep: 0,
            veriCodeText: '',
            locale: props.locale,
        };
    }
    EmailForm = React.createRef();
    newPasswordForm = React.createRef();

    getCode = () => {
        var localizerDict = Localizer.getLocalDict(this.state.locale);
        var emailFormObj = this.EmailForm.current.getFieldValue();
        if (emailFormObj.email !== undefined && emailFormObj.email.length > 0) {
            Requester.requestJSON(
                {
                    method: 'get',
                    url: '/api/other/getVerifyCode',
                    params: {
                        email: emailFormObj.email,
                    }
                },
                false,
                (response) => {
                    if (response.data.code !== 200) {
                        const args = {
                            message: localizerDict['Get Verify Code Failed'],
                            description:
                              localizerDict['Wrong Email.'],
                            duration: 4,
                          };
                        
                        notification.open(args);

                        this.setState({
                            getCode: false
                        })
                    }
                },
                (error) => {
                    const args = {
                        message: localizerDict['Get Verify Code Failed'],
                        description:
                          localizerDict['Wrong Email.'],
                        duration: 4,
                      };
                    
                    notification.open(args);

                    this.setState({
                        getCode: false
                    })
                }
            );

            this.setState({
                getCode: true
            })
        }
    }

    jumpNext = () => {
        var localizerDict = Localizer.getLocalDict(this.state.locale);
        var emailFormObj = this.EmailForm.current.getFieldValue();
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/other/verifyCode',

                params: {
                    email: emailFormObj.email,
                    code: this.state.veriCodeText
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    // server会返回一个临时的token
                    Requester.storeAuthToken(response.data.data);

                    this.setState({
                        currentStep: this.state.currentStep + 1
                    })
                } 
                else {
                    const args = {
                        message: localizerDict['Verify failed'],
                        description:
                          localizerDict['Wrong verify code.'],
                        duration: 4,
                      };
                    
                    notification.open(args);
                }
            },
            (error) => {
                const args = {
                    message: localizerDict['Verify failed'],
                    description:
                      localizerDict['Unknown error'],
                    duration: 4,
                  };
                
                notification.open(args);
            }
        );
        
    }

    veriCodeOnChange = (e) => {
        if (e && e.target && e.target.value) {
            this.setState({
                veriCodeText: e.target.value
            })
        }
    }

    submitNewPassword = () => {
        var localizerDict = Localizer.getLocalDict(this.state.locale);
        
        var password_form_obj = this.newPasswordForm.current.getFieldValue();

        var newPassword = password_form_obj.newPassword;

        if (newPassword !== password_form_obj.confirm) {
            return;
        }

        var shad_new_password = CryptoJS.SHA512(newPassword);
        var shad_new_password = shad_new_password.toString(CryptoJS.enc.Base64);
            
        Requester.requestJSON({
            method: 'post',
            url: '/api/user/changePassword',
            data: {
                oldPassword: null,
                newPassword: shad_new_password
            }
        },
        true,
        (response) => {
            if (200 === response.data.code) {
                // 修改成功                    
                this.setState({
                    currentStep: 2
                })
            }
            else {
                const args = {
                    message: localizerDict['Change Failed'],
                    description:
                      localizerDict['Change password failed Info'],
                    duration: 4,
                };
                notification.open(args);
            }
        },
        (error) => {
            const args = {
                message: localizerDict['Change Failed'],
                description:
                localizerDict['Change password failed Info'],
                duration: 4,
            };
            notification.open(args);
        }
        );
    }

    jumpToHome = () => {
        window.location.href='./';
    }

    render() {
        var localizerDict = Localizer.getLocalDict(this.state.locale);

        var stepContent;
        switch (this.state.currentStep) {
            case 0:
                stepContent = 
                <div
                    style={{
                        borderRadius: '20px',
                        margin: '0 auto',
                        width: '25%',
                        minWidth: '400px',
                        background: '#F0F0F0',
                    }}>

                    <Form
                        style={{
                            padding: '40px 25px'
                        }}
                        ref={this.EmailForm}>
                    <Form.Item>
                        <h2
                            style={{
                                color: '#808080'
                            }}>
                            {localizerDict['Verify Email']}
                        </h2>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                        {
                            type: 'email',
                            message: localizerDict['Invalid Email info'],
                        },
                        {
                            required: true,
                            message: localizerDict['Email empty info'],
                        },
                        ]}>
                        <Input 
                            prefix={<MailOutlined style={{color: "#BBBBBB"}} />}
                            type="email"
                            placeholder="Email"/>
                        </Form.Item>

                        <Form.Item>
                            <Input.Group compact>
                                <Input
                                    style={{
                                    width: 'calc(100% - 100px)',
                                    }}
                                    placeholder={localizerDict["Verify Code"]}
                                    onChange={this.veriCodeOnChange}
                                />
                                <CountDownButton type="primary"
                                    style={{
                                        width: '100px'
                                    }}
                                    formWidget={this.EmailForm}
                                    onClick={this.getCode} />
                            </Input.Group>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                block
                                type='primary'
                                disabled={!this.state.getCode || this.state.veriCodeText.length === 0}
                                onClick={this.jumpNext}>
                                {localizerDict['Reset Password']}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>;
                break;
        
            case 1:
                stepContent = 
                <div
                    style={{
                        borderRadius: '20px',
                        margin: '0 auto',
                        width: '25%',
                        minWidth: '400px',
                        background: '#F0F0F0',
                    }}>
                    <Form
                        name="new_password"
                        style={{
                            padding: '40px 25px'
                        }}
                        ref={this.newPasswordForm}>
                        <Form.Item>
                            <h2
                                style={{
                                    color: '#808080'
                                }}>
                                {localizerDict['New Password']}
                            </h2>
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            rules={[
                            {
                                required: true,
                                message: localizerDict['New password empty'],
                            },
                        ]}>
                        <Input
                            prefix={<LockOutlined style={{color: "#BBBBBB"}} />}
                            type="password"
                            placeholder={localizerDict["New password"]}
                                    />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: localizerDict['Confirm empty'],
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }

                            return Promise.reject(new Error(localizerDict['Comfirm not equal']));
                            },
                            }),
                        ]}>
                        <Input
                            prefix={<LockOutlined style={{color: "#BBBBBB"}} />}
                            type="password"
                            placeholder={localizerDict["Confirm Password"]}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                block
                                type='primary'
                                onClick={this.submitNewPassword}>
                                {localizerDict['Submit']}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                ;
                break;
            
            default:
                stepContent = 
                <Result
                    status="success"
                    title={localizerDict["Successfully Reset Password!"]}
                    extra={[
                    <Button type="primary" onClick={this.jumpToHome}>
                        {localizerDict['Go to Home Page']}
                    </Button>,
                    ]}
                />
                ;
                break;
        }
        return (
            <div>
                <Steps size="small" current={this.state.currentStep}
                    style={{
                        margin: '0 25%',
                        padding: '50px 0px',
                        width: '50%'
                    }}>
                    <Step title={localizerDict["Verify Email"]} />
                    <Step title={localizerDict["Change new password"]} />
                    <Step title={localizerDict["Done"]} />
                </Steps>

                {stepContent}
            </div>
        );
    }
}