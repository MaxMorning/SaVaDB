import React, { Component } from 'react';
import { Result, Spin, Tabs } from 'antd';

import "antd/dist/antd.min.css";
import Requester from '../utils/Requester';
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import Localizer from '../utils/Localizer';

import { LoadingOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class LineagesApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isALoaded: false,
            isBLoaded: false
        };
    }

    componentDidMount() {
        // get A child
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/getAllChild',

                params: {
                    lineage: 'A'
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.treeDataA = response.data.data;
                    this.setState({
                        isALoaded: true
                    });
                }
                else {
                    this.setState({
                        isALoaded: false
                    })
                }
                
            },
            (error) => {
                this.setState({
                    isALoaded: false
                })
            }
        );

        // get B child
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/getAllChild',

                params: {
                    lineage: 'B'
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.treeDataB = response.data.data;
                    this.setState({
                        isBLoaded: true
                    });
                }
                else {
                    this.setState({
                        isBLoaded: false
                    })
                }
                
            },
            (error) => {
                this.setState({
                    isBLoaded: false
                })
            }
        );
    }

    getOption = (treeData) => {
        let option = {

            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    return (
                        params.name
                    );
                },
            },

            series: [
                {
                    // 类型
                    type: 'tree',
                    // 数据源
                    data: [treeData],

                    symbol: 'none', // symbolSize: 100,
                    // 字体节点样式
                    label: {
                        fontSize: '12px'
                        // position: 'top'
                        // backgroundColor: 'rgba(200, 200, 200, 1)',
                        // borderRadius: [5, 5, 5, 5],
                        // padding: [6, 6, 6, 6],
                    },
                  
                    // 线条样式
                    lineStyle: {
                        color: 'rgba(221, 212, 212, 1)',
                        curveness: 0.8,
                        width: '0.5',
                    },
          
                    emphasis: {
                        focus: 'descendant',
                    },
                  
                    // 默认展开计几层
                    initialTreeDepth: 1,
          
                    roam : true,
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750,
                },
            ],
        };

        return option;
    };

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        if (this.state.isALoaded && this.state.isBLoaded) {
            return (
                <div
                    style={{
                        background: '#FFFFFF',
                        padding: '10px'
                    }}>
                        <Tabs defaultActiveKey="1"
                            style={{
                                padding: '0px 10px'
                            }}>
                            <TabPane tab="Lineage A" key="1">
                                <ReactEcharts
                                    style={{ height: 550 }}
                                    option={this.getOption(this.treeDataA)}
                                    notMerge={true}
                                ></ReactEcharts>
                            </TabPane>
                            <TabPane tab="Lineage B" key="2">
                                <ReactEcharts
                                    style={{ height: 550 }}
                                    option={this.getOption(this.treeDataB)}
                                    notMerge={true}
                                ></ReactEcharts>
                            </TabPane>
                        </Tabs>
                </div>
            );
        }
        else {
            return (
                <Result
                    title={localizerDict["Loading..."]}
                    extra={<Spin indicator={antIcon} size="large"/>}
                />
            );
        }
    }
}