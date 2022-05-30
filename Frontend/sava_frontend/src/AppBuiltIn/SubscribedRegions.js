import React, { Component } from 'react';
import { Card, Row, Col, Select, Result, Spin, Button } from 'antd';
import "antd/dist/antd.min.css";
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { LoadingOutlined } from '@ant-design/icons';

import Requester from '../utils/Requester';
import BriefStatVisualizeCard from '../component/BriefStatVisualizeCard'

const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class SubscribedRegions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubLoaded: false,
            // mainRegion: null,
            is403: false,
            notSubAnyRegion: false
        }
    }

    convertDateToStr(dateInst) {
        return dateInst.getFullYear() + '-' + (dateInst.getMonth() + 1) + '-' + dateInst.getDate();
    }

    componentDidMount() {
        this.state = {
            isSubLoaded: false,
            is403: false,
            notSubAnyRegion: false
        };

        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/user/getUserSubRegions'
            },
            true,
            (response) => {
                if (response.status === 403) {
                    this.setState(
                        {is403: true, isSubLoaded: true}
                    );
                }
                else if (response.data.code === 200) {

                    this.subList = response.data.data;
                    
                    if (this.subList.length === 0) {
                        this.setState({notSubAnyRegion: true});
                        return;
                    }

                    this.setState({
                        isSubLoaded: true
                    })

                    // // 加载第一个地区的详细数据
                    // var firstRegion = this.subList[0];
                    

                    // this.getMainStat(firstRegion);
                }
            },
            (error) => {}
        );

        this.dateList = [];

        var dateStart = new Date();
        dateStart.setFullYear(2020, 0, 22);

        var today = new Date();

        dateStart.setDate(dateStart.getDate() + 1);

        while (today > dateStart) {
            this.dateList.push(this.convertDateToStr(dateStart));
            dateStart.setDate(dateStart.getDate() + 1);
        }
    }

    // getMainStat(firstRegion) {
    //     var dateInst = new Date();
    //     var dateStr = dateInst.getFullYear() + '-' + (dateInst.getMonth() + 1) + '-' + dateInst.getDate();

    //     Requester.requestJSON(
    //         {
    //             method: 'get',
    //             url: '/api/data/getStat',

    //             params: {
    //                 region: firstRegion,
    //                 startDate: '2022-01-22',
    //                 endDate: dateStr,
    //                 step: 1
    //             }
    //         },
    //         false,
    //         (response) => {
    //             if (response.data.code === 200) {
    //                 this.mainData = response.data.data;
    //                 this.setState({
    //                     isSubLoaded: true,
    //                     mainRegion: firstRegion
    //                 })
    //             }
    //         }
    //     );
    // }

    getOption = ()=>{
        const confirmedValue = this.mainData.map(function (item) {
            return item[0];
        });

        const deathValue = this.mainData.map(function (item) {
            return item[1];
        });

        let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
            return [pt[0], '10%'];
            }
        },
        title: [
            {
            left: 'center',
            text: this.state.mainRegion + ' (Per Day)'
            }
        ],
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
                }
        ]
        };
        return option;
    };

    // switchMainRegion = (newMainRegion) => {
    //     this.setState(
    //         {mainRegion: newMainRegion}
    //     );
    // }

    render() {
        if (!this.state.isSubLoaded) {
            return (
                <Result
                    title="Loading..."
                    extra={<Spin indicator={antIcon} size="large"/>}
                />
            );
        }
        if (this.state.is403) {
            return (
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary">Back Home</Button>}
                />
            );
        }

        if (this.state.notSubAnyRegion) {
            return (
                <Result
                    title="No Subscribe"
                    subTitle="You are not subscribing any region."
                />
            );
        }


        var briefCardList = [];
        for (var i = 0; i < this.subList.length; i++) {
            briefCardList.push(<BriefStatVisualizeCard region={this.subList[i]}/>);
        }

        return (
            <div>
                <Row gutter={[12, 12]}>
                    {/* <Col span={24}>
                        <Card bordered={true} hoverable>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'                                    
                                }}>


                                <ReactEcharts option={this.getOption()}/>
                            </div>
                        </Card>
                    </Col> */}

                    {briefCardList}
                </Row>
            </div>
        );
    }
}