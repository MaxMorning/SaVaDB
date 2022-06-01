import React, { Component } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "antd/dist/antd.min.css";
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';

import Requester from '../utils/Requester';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class BriefStatVisualizeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            region: props.region
        }
    }

    convertDateToStr(dateInst) {
        return dateInst.getFullYear() + '-' + (dateInst.getMonth() + 1) + '-' + dateInst.getDate();
    }

    componentDidMount() {
        var dateInst = new Date();
        var dateStr = this.convertDateToStr(dateInst);


        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/getStat',
                
                params: {
                    region: this.state.region,
                    startDate: '2022-01-22',
                    endDate: dateStr,
                    step: 7
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.statData = response.data.data;
                    this.setState({
                        isLoaded: true
                    })
                }
            },
            (error) => {}
        );

        this.dateList = [];

        var dateStart = new Date();
        dateStart.setFullYear(2020, 0, 22);

        var today = new Date();

        dateStart.setDate(dateStart.getDate() + 7);

        while (today > dateStart) {
            this.dateList.push(this.convertDateToStr(dateStart));
            dateStart.setDate(dateStart.getDate() + 7);
        }
    }

    getBriefOption = (regionName) => {
        const dateList = this.dateList;
        const confirmedValue = this.statData.map(function (item) {
            return item[0];
        });

        const deathValue = this.statData.map(function (item) {
            return item[1];
        });

        let option = {
        // Make gradient line here
        visualMap: [
            {
            show: false,
            type: 'continuous'
            }
        ],
        title: [
            {
            left: 'center',
            text: regionName + ' (Per Week)'
            }
        ],
        tooltip: {
            trigger: 'axis',

            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F07840"></span>'    // 定义第一个数据前的圆点颜色
                var dotHtml2 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F00000"></span>'    // 定义第二个数据前的圆点颜色
                result += params[0].axisValue + "</br>" + dotHtml + ' Confirmed ' + params[0].data + "</br>" + dotHtml2 + ' Death ' + params[1].data;
                return result
            }
        },
        xAxis: [
            {
            data: dateList
            }
        ],
        yAxis: [
            {}
        ],
        series: [
            {
                type: 'line',
                showSymbol: false,
                data: confirmedValue,
                lineStyle:{
                    color:'rgb(240, 120, 64)'
                }
            },
            {
                type: 'line',
                showSymbol: false,
                data: deathValue,
                lineStyle:{
                    color:'rgb(240, 0, 0)'
                }
            }
        ]
        };

        return option;
    };

    render() {
        if (this.state.isLoaded) {
            return (
                <Col span={12}>
                    <Card bordered={true} hoverable
                        title={this.state.region}
                        extra={<a href={'./region/' + this.state.region}>Detail</a>}>
                        <ReactEcharts option={this.getBriefOption(this.state.region)}/>
                    </Card>
                </Col>
            );
        }
        else {
            return (
                <Col span={12}>
                    <Card bordered={true} hoverable title={this.state.region}
                        extra={<a href={'./region/' + this.state.region}>Detail</a>}>
                        <Spin indicator={antIcon} size="large"/>
                    </Card>
                </Col>
            );
        }
    }
}
