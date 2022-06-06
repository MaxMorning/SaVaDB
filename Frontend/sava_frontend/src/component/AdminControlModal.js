import React, { Component } from 'react';
import { Form, Input, Tabs, Modal, notification, InputNumber, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Requester from '../utils/Requester';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

export default class AdminControlModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            confirmLoading: false
        };

        this.resetParent = props.resetParent;
        this.currentTab = '0';
    }

    newNotiForm = React.createRef();
    setUserCnt = React.createRef();
    setMonitorLevel = React.createRef();
    setWHOLabel = React.createRef();

    onTabClick = (key, event) => {
        this.currentTab = key;
    }

    handleCancel = () => {
        this.resetParent();
        this.setState({
            visible: false
        });
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true
        });

        switch (this.currentTab) {
            case '0':
                var notiFormObj = this.newNotiForm.current.getFieldValue();
                this.submitToServer(
                    {
                        method: 'post',
                        url: '/api/admin/newNoti',
            
                        data: {
                            title: notiFormObj.notiTitle,
                            content: notiFormObj.notiContent
                        }
                    }
                );
                break;
        
            case '1':
                var setUserCntObj = this.setUserCnt.current.getFieldValue();
                this.submitToServer(
                    {
                        method: 'post',
                        url: '/api/admin/setUserCnt',

                        data: {
                            username: setUserCntObj.username,
                            newCnt: setUserCntObj.newCompTime
                        }
                    }
                );
                break;

            case '2':
                var setMonitorLevelObj = this.setMonitorLevel.current.getFieldValue();
                this.submitToServer(
                    {
                        method: 'post',
                        url: '/api/admin/setMonitorLevel',

                        data: {
                            variant: setMonitorLevelObj.variantName,
                            monitorLevel: setMonitorLevelObj.monitorLevel
                        }
                    }
                );
                break;

            case '3':
                var setWHOLabelObj = this.setWHOLabel.current.getFieldValue();
                this.submitToServer(
                    {
                        method: 'post',
                        url: '/api/admin/setWHOLabel',

                        data: {
                            variant: setWHOLabelObj.variantName,
                            label: setWHOLabelObj.whoLabel
                        }
                    }
                );
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <Modal
                title='Control Panel'
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                confirmLoading={this.state.confirmLoading}
                style={{
                    minWidth: '800px'
                }}>
                <Tabs
                    defaultActiveKey="0"
                    centered
                    onTabClick={this.onTabClick}>
                    <TabPane tab='Publish New Notification' key='0'>
                        <Form
                            name='new_notification'
                            style={{
                                padding: '10px'
                            }}
                            ref={this.newNotiForm}>
                            <Form.Item
                                name='notiTitle'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please type in the title.',
                                    },
                                ]}>
                                <Input showCount maxLength={64} placeholder='Notification Title'/>
                            </Form.Item>

                            <Form.Item
                                name='notiContent'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please type in the content.',
                                    },
                                ]}>
                                <TextArea showCount maxLength={1024} placeholder='Notification Content'
                                    style={{
                                        height: '200px'
                                    }}/>
                            </Form.Item>
                        </Form>
                    </TabPane>


                    <TabPane tab='Set User Compare Time' key='1'>
                        <Form
                            name='set_comp_title'
                            style={{
                                padding: '10px',
                                maxWidth: '500px',
                                margin: 'auto'
                            }}
                            ref={this.setUserCnt}
                            labelCol={{
                                span: 10,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}>
                            <Form.Item
                                label='Username'
                                name='username'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the username',
                                    },
                                ]}>
                                <Input prefix={<UserOutlined style={{color: "#BBBBBB"}} />} placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                label='New Compare Time'
                                name='newCompTime'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the new compare time',
                                    },
                                ]}>
                                <InputNumber min={0} value={this.state.currentCompTime} placeholder='Time'/>
                            </Form.Item>
                        </Form>
                    </TabPane>


                    <TabPane tab='Set Monitor Level' key='2'>
                        <Form
                            name='set_monitor_level'
                            style={{
                                padding: '10px',
                                maxWidth: '500px',
                                margin: 'auto'
                            }}
                            labelCol={{
                                span: 10,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            ref={this.setMonitorLevel}>
                            <Form.Item
                                label='Target Variant Name'
                                name='variantName'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the target variant',
                                    },
                                ]}>
                                <Input placeholder='Variant Name'/>
                            </Form.Item>

                            <Form.Item
                                label='Monitor Level'
                                name='monitorLevel'>
                                <Select
                                    defaultValue='None'>
                                    <Option value='None'>None</Option>
                                    <Option value='VOC'>VOC</Option>
                                    <Option value='VOI'>VOI</Option>
                                    <Option value='VUM'>VUM</Option>
                                    <Option value='FMV'>FMV</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </TabPane>


                    <TabPane tab='Set WHO Label' key='3'>
                        <Form
                            name='set_who_label'
                            style={{
                                padding: '10px',
                                maxWidth: '500px',
                                margin: 'auto'
                            }}
                            labelCol={{
                                span: 10,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            ref={this.setWHOLabel}>
                            <Form.Item
                                label='Target Variant Name'
                                name='variantName'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the target variant',
                                    },
                                ]}>
                                <Input placeholder='Variant Name'/>
                            </Form.Item>

                            <Form.Item
                                label='WHO Label'
                                name='whoLabel'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the target variant',
                                    },
                                ]}>
                                <Input placeholder='WHO Label'/>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }

    submitToServer(params) {
        Requester.requestJSON(
            params,
            true,
            (response) => {
                if (response.data.code === 200) {
                    this.resetParent();
                    this.setState({
                        confirmLoading: false,
                        visible: false
                    });
                }
                else if (response.data.code === 404) {
                    const args = {
                        message: 'Submit Failed',
                        description:
                          'User / Variant not exist.',
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
                        message: 'Submit Failed',
                        description:
                          'Submit failed because of some unknown reason.',
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
                    message: 'Submit Failed',
                    description:
                      'Submit failed because of some unknown reason.',
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