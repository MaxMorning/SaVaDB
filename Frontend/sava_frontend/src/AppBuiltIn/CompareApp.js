import React, { Component } from 'react';
import { Card, Input, Row, Col, Form, List, Descriptions, notification, Button, Tag } from 'antd';
import Requester from '../utils/Requester';

const { TextArea } = Input;

export default class CompareApp extends Component {
    constructor(props) {
        super(props);

        this.recordData = [];
        this.compareResult = [];

        this.state = {
            isRecordLoaded: false,
            isResultLoaded: false
        };
    }

    seqText = React.createRef();
    seqForm = React.createRef();

    componentDidMount() {
        // 获取匹配记录
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/user/getCompRecord'
            },
            true,
            (response) => {
                if (response.data.code === 200) {
                    this.recordData = response.data.data;
                    this.setState({isRecordLoaded: true});
                }
                else {
                    this.setState({isRecordLoaded: false});
                }
            },
            (error) => {this.setState({isRecordLoaded: false});}
        );
    }

    getSelectRecordFunc(idx) {
        return () => {
            Requester.requestJSON(
                {
                    method: 'get',
                    url: '/api/user/getCompResult',

                    params: {
                        index: idx
                    }
                },
                true,
                (response) => {
                    if (response.data.code === 200) {
                        this.compareResult = response.data.data;
                        this.setState({isResultLoaded: true});
                    }
                    else {
                        this.setState({isResultLoaded: false});
                    }
                },
                (error) => {this.setState({isResultLoaded: false});}
            );

        }
    }


    openSeqFile = () => {
        var inputObj=document.createElement('input')
        inputObj.setAttribute('id','temp_file_input');
        inputObj.setAttribute('type','file');
        inputObj.setAttribute("style",'visibility:hidden');
        inputObj.setAttribute('accept', '.fasta');
        document.body.appendChild(inputObj);
                 
        inputObj.onchange = (event) => {
                // console.log(event);
                var input = event.target;
                if (window.FileReader) {
                    var file = input.files[0];
                    var reader = new FileReader();
                    var _this = this;
                    console.log(_this);
                    reader.onload = function(event) {  
                        // console.log(event.target.result);
                        var fastaContent = event.target.result;
                        var firstEnter = fastaContent.indexOf('\n');
                        fastaContent = fastaContent.substr(firstEnter + 1, fastaContent.length - firstEnter - 1);
                        _this.seqForm.current.setFieldsValue(
                            {'seqFormItem': fastaContent}
                        );
                        // _this.seqText.value = event.target.result;
                        // _this.seqText.setState({value: event.target.result});
                    }
                    reader.readAsText(file);
                }
        
                document.body.removeChild(input);
            }; //选中文件时触发的方法
        inputObj.click();
    }

    submitSeq = () => {
        console.log(this.seqForm.current.getFieldValue().seqFormItem);

        Requester.requestJSON(
            {
                method: 'post',
                url: '/api/user/compareSeq',

                data: {
                    seq: this.seqForm.current.getFieldValue().seqFormItem
                }
            },
            true,
            (response) => {
                if (response.data.code === 200) {
                    this.seqForm.current.setFieldsValue(
                        {'seqFormItem': ''}
                    );

                    const args = {
                        message: 'Upload Done',
                        description:
                            'The server will compare the sequence you submitted with those in database.Please wait for a moment and refresh the page.',
                        duration: 6,
                    };
                    notification.open(args);
                }
            },
            (error) => {}
        );
    }

    render() {
        return (
            <div>
                <div
                    style={{
                    background: '#FFFFFF'
                }}>
                    <div
                        style={{
                            padding: '10px'
                        }}>
                        <Form
                            ref={this.seqForm}>
                            <Form.Item
                                name='seqFormItem'
                                style={{
                                    margin: '0'
                                }}>
                                <TextArea placeholder="Paste sequence here"
                                    ref={this.seqText}
                                    style={{
                                        minHeight: '200px',
                                    }}/>
                            </Form.Item>
                        </Form>
                        
                    </div>
                    

                    <div
                        style={{
                            textAlign: 'right'
                        }}>
                        <Button
                            style={{
                                margin: '10px'
                            }}
                            onClick={this.openSeqFile}>Open FASTA file</Button>
                        <Button type="primary"
                            style={{
                                margin: '10px'
                            }}
                            onClick={this.submitSeq}>Upload to compare</Button>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: '20px'
                    }}>
                    <Row  gutter={[12, 12]}>
                        <Col span={12}>
                            <Card
                                title="Compare Histroy">
                                <List
                                    pagination={true}
                                    itemLayout="horizontal"
                                    // dataSource={[
                                    //     [0, '552234202dbb5864f1c3b8a8a4b113f407725273', 'Pending', '2022-06-02 12:44:23'],
                                    //     [1, '564b5acb8ef2e49e7f56bf64e89be367ea9fd19a', 'Comparing', '2022-06-01 09:44:23'],
                                    //     [2, 'c12dd5f9e306ffe293ef3f2bdf23ce3d57829070', 'Done', '2022-06-01 12:42:23']
                                    // ]}
                                    dataSource={this.recordData}
                                    renderItem={
                                        (item) => (
                                            <List.Item
                                                style={{
                                                }}>
                                                <List.Item.Meta
                                                title={<a onClick={this.getSelectRecordFunc(item[0])}>{item[1]}</a>}
                                                description={
                                                    <Descriptions>
                                                        <Descriptions.Item label='status'>
                                                            <Tag color="red">{item[2]}</Tag>
                                                        </Descriptions.Item>

                                                        <Descriptions.Item label="Time" span={2}>
                                                            {item[3]}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                }
                                                />
                                            </List.Item>
                                        )
                                    }
                                    style={{
                                        padding: '10px'
                                    }}>
                                </List>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card
                                title="Compare Result">
                                <List
                                    pagination={true}
                                    itemLayout="horizontal"
                                    // dataSource={[
                                    //     ['BA.1', 2, '99.993%'],
                                    //     ['BA.1.2', 4, '99.990%'],
                                    //     ['BA.2', 12, '99.983%']
                                    // ]}
                                    dataSource={this.compareResult}
                                    renderItem={
                                        (item) => (
                                            <List.Item
                                                style={{
                                                }}>
                                                <List.Item.Meta
                                                title={<a href={"./lineage/" + item[0]}>{item[0]}</a>}
                                                // description={'Lev Dis: ' + item[1] + ' , Simularity: ' + item[2]}
                                                description={
                                                    <Descriptions>
                                                        <Descriptions.Item label="Levenstain Distance" span={2}>
                                                            {item[1]}
                                                        </Descriptions.Item>

                                                        <Descriptions.Item label="Simularity">
                                                            {item[2]}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                }
                                                />
                                            </List.Item>
                                        )
                                    }
                                    style={{
                                        padding: '10px'
                                    }}>
                                </List>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}