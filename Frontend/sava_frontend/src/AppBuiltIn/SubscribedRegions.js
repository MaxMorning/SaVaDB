import React, { Component } from 'react';
import { Card, Row, Col, Select, Result, Spin, Button } from 'antd';
import "antd/dist/antd.min.css";
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { LoadingOutlined } from '@ant-design/icons';
import Localizer from '../utils/Localizer';

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
            (error) => {
                if (error.response.status === 403) {
                    this.setState(
                        {is403: true, isSubLoaded: true}
                    );
                }
            }
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

    // switchMainRegion = (newMainRegion) => {
    //     this.setState(
    //         {mainRegion: newMainRegion}
    //     );
    // }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        if (!this.state.isSubLoaded) {
            return (
                <Result
                    title={localizerDict["Loading..."]}
                    extra={<Spin indicator={antIcon} size="large"/>}
                />
            );
        }
        if (this.state.is403) {
            return (
                <Result
                    status="403"
                    title="403"
                    subTitle={localizerDict['403Hint']}
                    // extra={<Button type="primary">Back Home</Button>}
                />
            );
        }

        if (this.state.notSubAnyRegion) {
            return (
                <Result
                    title={localizerDict["No Subscribing Region"]}
                    subTitle={localizerDict['NoSubRegionHint']}
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

                    {briefCardList}
                </Row>
            </div>
        );
    }
}