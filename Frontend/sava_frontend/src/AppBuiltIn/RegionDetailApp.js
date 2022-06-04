import React, { Component } from 'react';
import { Card, Row, Col, Result, Spin, Tag, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import SubscribeButton from '../component/SubscribeButton';
import Requester from '../utils/Requester';
import Localizer from '../utils/Localizer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Meta } = Card;

export default class RegionDetailApp extends Component {
    constructor(props) {
        super(props);

        this.data = [[]];

        this.state = {
            regionName: props.region,
            isLoaded: false,
            is404: false,
            isSubed: false
        }
    }

    getOption = () =>{
        var confirmedValue;
        var deathValue;
        confirmedValue = this.data.map(function (item) {
            return item[0];
        });
    
        deathValue = this.data.map(function (item) {
            return item[1];
        });
        

        let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
            return [pt[0], '10%'];
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
            type: 'inside',
            start: 0,
            end: 10
            },
            {
            start: 0,
            end: 10
            }
        ],
        series: [
            {
            name: 'Confirmed',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                },
                {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }
                ])
            },
            data: confirmedValue
            },

            {
                name: 'Death',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }
                    ])
                },
                data: deathValue
            },
        ]
        };
        return option;
    };

    componentDidMount() {
        this.getSubscribed();
    }

    getSubscribed() {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/user/checkSubRegion',

                params: {
                    region: this.state.regionName
                }
            },
            true,
            (response) => {
                if (response.data.code === 200) {
                    var userSubed = (response.data.data === 'true');
                    this.setState({
                        isSubed: userSubed
                    });
                }

                this.getRegionStat();
            },
            (error) => {
                this.getRegionStat();
            }
        );
    }

    convertDateToStr(dateInst) {
        return dateInst.getFullYear() + '-' + (dateInst.getMonth() + 1) + '-' + dateInst.getDate();
    }

    getRegionStat() {
        var dateInst = new Date();
        var dateStr = this.convertDateToStr(dateInst);

        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/getStat',

                params: {
                    region: this.state.regionName,
                    startDate: '2020-01-22',
                    endDate: dateStr,
                    step: 1
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    var dateStart = new Date();
                    dateStart.setFullYear(2020, 0, 22);

                    this.dateList = [];

                    var today = new Date();

                    while (today > dateStart) {
                        dateStart.setDate(dateStart.getDate() + 1);
                        var dateStr = this.convertDateToStr(dateStart);

                        this.dateList.push(dateStr);
                    }

                    this.data = response.data.data;

                    this.setState({
                        isLoaded: true,
                        is404: false,
                    })
                }
                else {
                    this.data = [[]];
                    this.setState({
                        isLoaded: false,
                        is404: true,
                    })
                }
            },
            (error) => {
                this.data = [[]];
                this.setState({
                    isLoaded: false,
                    is404: true,
                })
            }
        );
    }

    onSubscribe = (event) => {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/user/subRegion',

                params: {
                    region: this.state.regionName
                }
            },
            true,
            (response) => {
                if (response.data.code === 200) {
                    var newSubed = (response.data.data === 'true');
                    this.setState({
                        isSubed: newSubed
                    });
                }
            },
            (error) => {}
        );
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        if (this.state.is404) {
            return (
                <div>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                    />
                </div>
                
            );
        }
        if (!this.state.isLoaded) {
            return (
                <div>
                    <Result
                    title={localizerDict["Loading..."]}
                    extra={<Spin indicator={antIcon} size="large"/>}
                />
                </div>
                
            );
        }

        var confirmedDataItems = [];
        var deathDataItems = [];
        var curedDataItems = [];

        if (this.data.length !== 0) {
            for (var i = 0; i < this.data.length; ++i) {
                confirmedDataItems.push(
                    <List.Item>
                        <List.Item.Meta
                            title={this.dateList[i]}
                            description={this.data[i][0]}
                            />
                    </List.Item>
                );

                deathDataItems.push(
                    <List.Item>
                        <List.Item.Meta
                            title={this.dateList[i]}
                            description={this.data[i][1]}
                            />
                    </List.Item>
                );

                curedDataItems.push(
                    <List.Item>
                        <List.Item.Meta
                            title={this.dateList[i]}
                            description={this.data[i][2]}
                            />
                    </List.Item>
                );
            }
        }

        return(
            <Row Row gutter={[12, 12]}>
                <Col span={24}>
                    <Card>
                        <Meta
                            title={
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                    <h2
                                        style={{
                                            margin: 'auto 0'
                                        }}>{this.state.regionName}</h2>
                                    <div style={{
                                        width: '10px'
                                    }}/>
                                    <SubscribeButton isSubed={this.state.isSubed} onClick={this.onSubscribe}/>
                                </div>
                                }
                            description={<ReactEcharts option={this.getOption()}/>}
                        />
                        
                    </Card>
                </Col>

                <Col span={8}>
                    <List
                        header={<h2>Confirmed</h2>}
                        bordered
                        pagination
                        dataSource={confirmedDataItems}
                        renderItem={
                            (item) => (item)
                        }
                        style={{
                            background: '#FFFFFF'
                        }}>
                        
                    </List>
                </Col>

                <Col span={8}>
                    <List
                        header={<h2>Death</h2>}
                        bordered
                        pagination
                        dataSource={deathDataItems}
                        renderItem={
                            (item) => (item)
                        }
                        style={{
                            background: '#FFFFFF'
                        }}>
                        
                    </List>
                </Col>

                <Col span={8}>
                    <List
                        header={<h2>Cured</h2>}
                        bordered
                        pagination
                        dataSource={curedDataItems}
                        renderItem={
                            (item) => (item)
                        }
                        style={{
                            background: '#FFFFFF'
                        }}>
                        
                    </List>
                </Col>
            </Row>
        );
    }
}