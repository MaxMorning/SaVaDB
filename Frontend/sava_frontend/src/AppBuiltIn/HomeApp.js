import React, { Component } from 'react';
import { Statistic, Card, Divider, Row, Col, List, Typography } from 'antd';
import "antd/dist/antd.min.css";
import Requester from '../utils/Requester';

const { Text, Link } = Typography;

export default class HomeApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        return (
            <div>
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Card title="Introduction" bordered={true} hoverable>
                            <label>
                                这是一个 SARS-Cov-19 病毒变种数据库网站，记录了从公开领域获取的病毒变种数据和统计信息。此外，本网站对公共领域提供API，供使用者进行数据分析用。
                            </label>

                            <br/>

                            <label>
                            希望疫情早日结束。
                            </label>
                        </Card>
                    </Col>

                    <Col span={12} style={{minWidth: 600}}>
                        <Card title="Global Statistics" bordered={true} hoverable 
                            extra={<label style={{
                                color: "#999999",
                                fontSize: 12
                            }}>Data updated at {this.state.updateTime}</label>}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Confirm case yesterday" value={this.state.confirmedYesterday} />
                                    <Divider />
                                </Col>

                                <Col span={12}>
                                    <Statistic title="Confirm case total" value={this.state.confirmedTotal} />
                                    <Divider />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Death case yesterday" value={this.state.deathYesterday} />
                                    <Divider />
                                </Col>

                                <Col span={12}>
                                    <Statistic title="Death case total" value={this.state.deathTotal} />
                                    <Divider />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Cured case yesterday" value={this.state.curedYesterday} />
                                </Col>

                                <Col span={12}>
                                    <Statistic title="Cured case total" value={this.state.curedTotal} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={12} flex="auto">
                        <Card title="Notifications" bordered={true} hoverable style={{height: "100%"}}>
                            <List
                                size="small"
                                split={false}
                                dataSource={this.state.notifications}
                                renderItem={(item) => 
                                <List.Item>
                                    <Link href={item[1]}>
                                        {item[0]}
                                    </Link>
                                </List.Item>}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}