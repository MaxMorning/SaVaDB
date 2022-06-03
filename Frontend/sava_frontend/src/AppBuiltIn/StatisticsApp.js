import React, { Component } from 'react';
import { Card, Row, Col, Select, Result, Spin, Button, DatePicker } from 'antd';
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { LoadingOutlined } from '@ant-design/icons';

import Requester from '../utils/Requester';
import Localizer from '../utils/Localizer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default class StatisticsApp extends Component {
    constructor(props) {
        super(props);

        this.firstData = null;
        this.secondData = null;
        this.firstRegionNameSearchData = [];
        this.secondRegionNameSearchData = [];

        this.state = {
            firstRegionName: '',
            secondRegionName: ''
        };
    }

    getTwoRegionOption = () =>{
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
            text: this.state.firstRegionName + ' & ' + this.state.secondRegionName + ' (Per Day)'
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
            name: 'First Confirmed',
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
                name: 'First Death',
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
                name: 'Second Confirmed',
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
                name: 'Second Death',
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
        var confirmedValue;
        var deathValue;
        if (this.firstData !== null) {
            confirmedValue = this.firstData.map(function (item) {
                return item[0];
            });
    
            deathValue = this.firstData.map(function (item) {
                return item[1];
            });
        }
        else {
            confirmedValue = this.secondData.map(function (item) {
                return item[0];
            });
    
            deathValue = this.secondData.map(function (item) {
                return item[1];
            });
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
            text: this.state.firstRegionName + ' & ' + this.state.secondRegionName + ' (Per Day)'
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
            },
        ]
        };
        return option;
    };

    getOption = () => {
        if (this.state.firstRegionName.length === 0 || this.state.secondRegionName.length === 0) {
            return this.getOneRegionOption();
        }
        else {
            return this.getTwoRegionOption();
        }
    }

    handleFirstSearch = (newValue) => {
        if (newValue) {
            Requester.requestJSON(
                {
                    method: 'get',
                    url: '/api/data/searchRegionBrief',
                    params: {
                        key: newValue
                    }
                },
                false,
                (response) => {
                    if (response.data.code === 200) {
                        this.firstRegionNameSearchData = response.data.data;
                    }
                    else {
                        this.firstRegionNameSearchData = [];
                    }
                },
                (error) => {
                    this.firstRegionNameSearchData = [];
                }
            );
        } else {
            this.firstRegionNameSearchData = [];
        }
      };
    
    handleFirstChange = (newValue) => {
        this.setState({
            firstRegionName: newValue
        });
    };

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        var visualizePart;
        if (this.state.firstRegionName.length === 0 && this.state.secondRegionName.length === 0) {
            visualizePart = <Result
                                title={localizerDict["Not Selected"]}
                                subTitle={localizerDict['NotSelectedHint']}
                            />
        }
        else {
            visualizePart = <ReactEcharts option={this.getOption()}/>
        }

        const firstOptions = this.firstRegionNameSearchData.map((d) => <Option key={d}>{d}</Option>);
        const secondOptions = this.secondRegionNameSearchData.map((d) => <Option key={d}>{d}</Option>);

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
                                <Col span={8}>
                                    <Select
                                        showSearch
                                        placeholder={localizerDict['First Region']}
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        onSearch={this.handleFirstSearch}
                                        onChange={this.handleFirstChange}
                                        notFoundContent={null}
                                        style={{
                                            width: '100%'
                                        }}
                                        >
                                    {firstOptions}
                                    </Select>
                                </Col>

                                <Col span={8}>
                                    <Select
                                        showSearch
                                        placeholder={localizerDict['Second Region']}
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        onSearch={this.handleFirstSearch}
                                        onChange={this.handleFirstChange}
                                        notFoundContent={null}
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                    {secondOptions}
                                    </Select>
                                </Col>

                                <Col span={8}>
                                    <RangePicker 
                                    style={{
                                        width: '100%'
                                    }}/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card title={localizerDict["First Region Detail"]}>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card title={localizerDict["Second Region Detail"]}>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}