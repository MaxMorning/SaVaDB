import React, { Component } from 'react';
import { Card, Row, Col, Select, Result, Spin, Button, DatePicker, InputNumber, List } from 'antd';
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { LoadingOutlined } from '@ant-design/icons';

import RegionSearchSelector from '../component/RegionSearchSelector';

import Requester from '../utils/Requester';
import Localizer from '../utils/Localizer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { RangePicker } = DatePicker;

export default class StatisticsApp extends Component {
    constructor(props) {
        super(props);

        this.firstData = [];
        this.secondData = [];
        this.firstRegionNameSearchData = [];
        this.secondRegionNameSearchData = [];
        this.firstRegionName = '';
        this.secondRegionName = '';

        this.state = {
            isLoading: false,
            isLoaded: false,
        };
    }

    getTwoRegionOption = () =>{
        var localizerDict = Localizer.getCurrentLocalDict();
        const firstConfirmedValue = this.firstData.map(function (item) {
            return item[0];
        });

        const firstDeathValue = this.firstData.map(function (item) {
            return item[1];
        });

        const secondConfirmedValue = this.secondData.map(function (item) {
            return item[0];
        });

        const secondDeathValue = this.secondData.map(function (item) {
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
            text: this.firstRegionName + ' & ' + this.secondRegionName
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
            name: this.firstRegionName + ' ' + localizerDict['Confirmed'],
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
            data: firstConfirmedValue
            },

            {
                name: this.firstRegionName + ' ' + localizerDict['Death'],
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
                data: firstDeathValue
            },

            {
                name: this.secondRegionName + ' ' + localizerDict['Confirmed'],
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
                data: secondConfirmedValue
            },
    
            {
                name: this.secondRegionName + ' ' + localizerDict['Death'],
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
                data: secondDeathValue
            }
        ]
        };
        return option;
    };

    getOneRegionOption = () =>{
        var localizerDict = Localizer.getCurrentLocalDict();
        var confirmedValue;
        var deathValue;
        var regionName;
        if (this.firstData.length !== 0) {
            confirmedValue = this.firstData.map(function (item) {
                return item[0];
            });
    
            deathValue = this.firstData.map(function (item) {
                return item[1];
            });

            regionName = this.firstRegionName;
        }
        else {
            confirmedValue = this.secondData.map(function (item) {
                return item[0];
            });
    
            deathValue = this.secondData.map(function (item) {
                return item[1];
            });

            regionName = this.secondRegionName;
        }
        

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
            text: regionName
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
            name: localizerDict['Confirmed'],
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
                name: localizerDict['Death'],
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

    getOption = () => {

        if (this.firstRegionName.length === 0 || this.secondRegionName.length === 0) {
            return this.getOneRegionOption();
        }
        else {
            return this.getTwoRegionOption();
        }
    }

    setFirstRegion = (value) => {
        this.firstRegionName = value;
    }

    setSecondRegion = (value) => {
        this.secondRegionName = value;
    }

    getData = () => {
        console.log(this.dayInternal);
        if (this.firstRegionName.length > 0) {
            Requester.requestJSON(
                {
                    method: 'get',
                    url: '/api/data/getStat',
    
                    params: {
                        region: this.firstRegionName,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        step: this.dayInternal
                    }
                },
                false,
                (response) => {
                    if (response.data.code === 200) {
                        this.firstData = response.data.data;


                        var dateStart = new Date(this.startDate);

                        this.dateList = [];
                        for (var i = 0; i < this.firstData.length; ++i) {
                            dateStart.setDate(dateStart.getDate() + this.dayInternal);
                            var dateStr = this.convertDateToStr(dateStart);


                            this.dateList.push(dateStr);
                        }


                        if (this.secondRegionName.length === 0 || this.secondData.length !== 0) {
                            this.setState({
                                isLoaded : true
                            })
                        }
                    }
                    else {
                        this.firstData = [];
                        this.setState({
                            isLoaded : false
                        })
                    }
                },
                (error) => {
                    this.firstData = [];
                    this.setState({
                        isLoaded : false
                    });
                }
            );
        }
        
        if (this.secondRegionName.length > 0) {
            Requester.requestJSON(
                {
                    method: 'get',
                    url: '/api/data/getStat',
    
                    params: {
                        region: this.secondRegionName,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        step: this.dayInternal
                    }
                },
                false,
                (response) => {
                    if (response.data.code === 200) {
                        this.secondData = response.data.data;

                        var dateStart = new Date(this.startDate);

                        this.dateList = [];
                        for (var i = 0; i < this.secondData.length; ++i) {
                            dateStart.setDate(dateStart.getDate() + this.dayInternal);
                            var dateStr = this.convertDateToStr(dateStart);


                            this.dateList.push(dateStr);
                        }


                        if (this.firstData.length === 0 || this.firstData.length !== 0) {
                            this.setState({
                                isLoaded : true
                            })
                        }
                    }
                    else {
                        this.secondData = [];
                        this.setState({
                            isLoaded : false
                        })
                    }
                },
                (error) => {
                    this.secondData = [];
                    this.setState({
                        isLoaded : false
                    });
                }
            );
        }
    }

    onIntervalChange = (value) => {
        this.dayInternal = value;
    }

    rangePickerOnChange = (dates, dateStrings) => {
        this.startDate = dateStrings[0];
        this.endDate = dateStrings[1];
    }

    convertDateToStr(dateInst) {
        return dateInst.getFullYear() + '-' + (dateInst.getMonth() + 1) + '-' + dateInst.getDate();
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        var visualizePart;
        if (this.firstRegionName.length === 0 && this.secondRegionName.length === 0) {
            visualizePart = <Result
                                title={localizerDict["Not Selected"]}
                                subTitle={localizerDict['NotSelectedHint']}
                            />
        }
        else if (this.state.isLoaded) {
            visualizePart = <ReactEcharts option={this.getOption()}/>
        }
        else {
            // 加载中
            visualizePart = <Result
                title={localizerDict["Loading..."]}
                extra={<Spin indicator={antIcon} size="large"/>}
            /> 
        }

        var firstDetailDataItems = [];
        var dateStart = new Date(this.startDate);


        if (this.firstData.length !== 0) {
            for (var i = 0; i < this.firstData.length; ++i) {
                firstDetailDataItems.push(
                    <List.Item>
                        <List.Item.Meta
                            title={this.dateList[i]}
                            description={
                                <div
                                style={{
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {
                                        localizerDict['Confirmed'] + ': ' + this.firstData[i][0] + '    ' + 
                                        localizerDict['Death'] + ': ' + this.firstData[i][1] + '    ' + 
                                        localizerDict['Cured'] + ': ' + this.firstData[i][2]
                                    }
                                </div>
                            }
                            />
                    </List.Item>
                );

            }
        }

        var secondDetailDataItems = [];
        dateStart = new Date(this.startDate);

        if (this.secondData.length !== 0) {
            for (var i = 0; i < this.secondData.length; ++i) {
                secondDetailDataItems.push(
                    <List.Item>
                        <List.Item.Meta
                            title={this.dateList[i]}
                            description={
                                <div
                                style={{
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {
                                        localizerDict['Confirmed'] + ': ' + this.firstData[i][0] + '    ' + 
                                        localizerDict['Death'] + ': ' + this.firstData[i][1] + '    ' + 
                                        localizerDict['Cured'] + ': ' + this.firstData[i][2]
                                    }
                                </div>
                            }
                            />
                    </List.Item>
                );
            }
        }
        
        return (
            <div>
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Card bordered={true}>
                            {visualizePart}
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card>
                            <Row
                                gutter={[12, 12]}>
                                <Col span={5}>
                                    <RegionSearchSelector
                                        placeholder={localizerDict['First Region']}
                                        onChange={this.setFirstRegion}/>
                                </Col>

                                <Col span={5}>
                                <RegionSearchSelector
                                        placeholder={localizerDict['Second Region']}
                                        onChange={this.setSecondRegion}/>
                                </Col>

                                <Col span={8}>
                                    <RangePicker 
                                    style={{
                                        width: '100%'
                                    }}
                                    onChange={this.rangePickerOnChange}/>
                                </Col>

                                <Col span={3}>
                                    <InputNumber  min={1} max={120}
                                        placeholder={localizerDict['Interval']}
                                        style={{
                                            width: '100%'
                                        }}
                                        onChange={this.onIntervalChange}/>
                                </Col>

                                <Col span={3} >
                                    <Button type='primary'
                                        onClick={this.getData}
                                        style={{
                                            width: '100%'
                                        }}>
                                        {localizerDict['Get Data']}
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card title={localizerDict["First Region Detail"]}>
                            <List
                                pagination={true}
                                itemLayout="horizontal"
                                dataSource={firstDetailDataItems}
                                renderItem={
                                    (item) => (
                                        item
                                    )
                                }
                                >
                            </List>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card title={localizerDict["Second Region Detail"]}>
                            <List
                                pagination={true}
                                itemLayout="horizontal"
                                dataSource={secondDetailDataItems}
                                renderItem={
                                    (item) => (
                                        item
                                    )
                                }
                                >
                            </List>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}