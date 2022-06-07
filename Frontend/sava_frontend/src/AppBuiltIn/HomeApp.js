import React, { Component } from 'react';
import { Statistic, Card, Divider, Row, Col, List, Typography } from 'antd';
import "antd/dist/antd.min.css";
import Requester from '../utils/Requester';
import Localizer from '../utils/Localizer';

import NotificationModal from '../component/NotificationModal';

const { Text, Link } = Typography;

export default class HomeApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notiModalVisible: false,
            confirmedYesterday : '--',
            confirmedTotal : '--',
            
            deathYesterday : '--',
            deathTotal : '--',

            curedYesterday : '--',
            curedTotal : '--',

            updateTime : '2022-05-29 08:08:08'
        };
    }

    // 获取当前日期
    getTime() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var mytime = date.toLocaleTimeString();     //获取当前时间

        var time = year + '-' + month + '-' + day + ' ' + mytime;
        return time;
    }
    
    componentDidMount() {
        // 获取用户名
        Requester.requestJSON({
            method: 'get',
            url: '/api/data/getGlobalLatestStat'
        }, false,
        (response) => {
            if (response.data.code === 200) {
                this.setState({
                    confirmedYesterday : response.data.data.confirmedYesterday,
                    confirmedTotal : response.data.data.confirmedTotal,
                    
                    deathYesterday : response.data.data.deathYesterday,
                    deathTotal : response.data.data.deathTotal,

                    curedYesterday : response.data.data.curedYesterday,
                    curedTotal : response.data.data.curedTotal,

                    updateTime : response.data.data.updateTime
                });
            }
        },
        (error) => {
            console.log(this.getTime());
            this.setState({
                updateTime : this.getTime()
            });
        }
        );

        // 获取通知
        Requester.requestJSON({
                method: 'get',
                url: '/api/other/notificationList'
            }, false,
            (response) => {
                if (response.data.code === 200) {
                    this.setState({
                        notifications: response.data.data
                    });
                }
            },
            (error) => {}
        );
    }

    resetVisible = () => {
        setTimeout(() => {
            this.setState({
                notiModalVisible: false
            })
        }, 500);
    }

    getOpenModalCallback = (item) => {
        return () => {
            this.notiTitle = item[1];
            this.setState({
                notiModalVisible: true,
                notiModalIndex: item[0]
            });
        }
    } 

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        return (
            <div>
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Card title={localizerDict['HomeAppIntroduction']} bordered={true} hoverable>
                            <label>
                                {localizerDict['HomeAppIntroContent']}
                            </label>
                        </Card>
                    </Col>

                    <Col span={12} style={{minWidth: 500}}>
                        <Card title={localizerDict['HomeAppGlobalStat']} bordered={true} hoverable 
                            extra={<label style={{
                                color: "#999999",
                                fontSize: 12
                            }}> {localizerDict['HomeAppGlobalStatUpdateTimePrefix'] + this.state.updateTime}</label>}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title={localizerDict["Confirm case yesterday"]} value={this.state.confirmedYesterday} />
                                    <Divider />
                                </Col>

                                <Col span={12}>
                                    <Statistic title={localizerDict["Confirm case total"]} value={this.state.confirmedTotal} />
                                    <Divider />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title={localizerDict["Death case yesterday"]} value={this.state.deathYesterday} />
                                    <Divider />
                                </Col>

                                <Col span={12}>
                                    <Statistic title={localizerDict["Death case total"]} value={this.state.deathTotal} />
                                    <Divider />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title={localizerDict["Cured case yesterday"]} value={this.state.curedYesterday} />
                                </Col>

                                <Col span={12}>
                                    <Statistic title={localizerDict["Cured case total"]} value={this.state.curedTotal} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={12} flex="auto">
                        <Card title={localizerDict["Notifications"]} bordered={true} hoverable style={{height: "100%"}}>
                            <List
                                size="small"
                                split={false}
                                dataSource={this.state.notifications}
                                renderItem={(item) => 
                                <List.Item>
                                    <Link onClick={this.getOpenModalCallback(item)} ellipsis>
                                        {'[' + item[2] + '] ' + item[1]}
                                    </Link>
                                </List.Item>}
                            />

                            {this.state.notiModalVisible && <NotificationModal resetParent={this.resetVisible} notiIndex={this.state.notiModalIndex} title={this.notiTitle}/>}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}