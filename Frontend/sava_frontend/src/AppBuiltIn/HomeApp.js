import React, { Component } from 'react';
import { Statistic, Card, Divider, Row, Col } from 'antd';
import "antd/dist/antd.min.css";

export default class HomeApp extends Component {
    render() {
        return (
            <div>
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Card title="Introduction" bordered={true} hoverable></Card>
                    </Col>

                    <Col span={12} style={{minWidth: 600}}>
                        <Card title="Global Statistics" bordered={true} hoverable 
                            extra={<label style={{
                                color: "#999999",
                                fontSize: 12
                            }}>Data updated at 2022-05-22 14:32:23</label>}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Confirm case yesterday" value={112893} />
                                    <Divider />
                                </Col>

                                <Col span={12}>
                                    <Statistic title="Confirm case total" value={11232893} />
                                    <Divider />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Death case yesterday" value={1193} />
                                    <Divider />
                                </Col>

                                <Col span={12}>
                                    <Statistic title="Death case total" value={11923423} />
                                    <Divider />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Cured case yesterday" value={312893} />
                                </Col>

                                <Col span={12}>
                                    <Statistic title="Cured case total" value={31289323} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={12} flex="auto">
                        <Card title="Notifications" bordered={true} hoverable style={{height: "100%"}}>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}