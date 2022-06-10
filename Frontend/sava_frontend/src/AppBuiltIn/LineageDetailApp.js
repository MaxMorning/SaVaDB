import React, { Component } from 'react';
import { Descriptions, Card, Row, Col, Result, Spin, Tag, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';

import SeqDataDisplay from '../component/SeqDataDisplay';
import SubscribeButton from '../component/SubscribeButton';
import Requester from '../utils/Requester';
import Localizer from '../utils/Localizer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { TabPane } = Tabs;

export default class LineageDetailApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            lineage: props.lineage,
            is404: false,
            isSubed: false
        }
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
                    initialTreeDepth: 2,
          
                    roam : true,
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750,
                },
            ],
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
                url: '/api/user/checkSubLineage',

                params: {
                    lineage: this.state.lineage
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

                this.getLineageBrief();
            },
            (error) => {
                this.getLineageBrief();
            }
        );
    }

    getLineageBrief() {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/lineageBrief',

                params: {
                    lineage: this.state.lineage
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.lineageData = response.data.data;
                    
                    this.getParentLineage();
                }
                else {
                    this.setState({
                        isLoaded: false,
                        is404: true
                    });
                }
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    is404: true
                });
            }
        );
    }

    getParentLineage() {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/getParentLineage',

                params: {
                    lineage: this.state.lineage
                }
            },
            false,
            (response) => {
                // 不检查200
                // 返回404就是被取消的变种
                this.parentLineage = response.data.data;

                if (this.parentLineage === null) {
                    this.parentLineage = 'Not availible';
                    if (this.state.lineage !== 'A' && this.state.lineage !== 'B') {
                        this.setState({
                            is404: false,
                            isLoaded: true
                        });

                        return;
                    }
                }
                this.getTreeData();
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    is404: true
                });
            }
        );
    }

    getTreeData() {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/getAllChild',

                params: {
                    lineage: ((this.state.lineage === 'A' || this.state.lineage === 'B') ? this.state.lineage : this.parentLineage)
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.treeData = response.data.data;
                    this.setState({
                        is404: false,
                        isLoaded: true
                    });
                }
                else if (response.data.code === 404) {
                    this.setState({
                        is404: true,
                        isLoaded: false
                    });
                }
                else {
                    this.setState({
                        is404: false,
                        isLoaded: false
                    })
                }
                
            },
            (error) => {
                this.setState({
                    isLoaded: false
                })
            }
        );
    }

    onSubscribe = (event) => {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/user/subLineage',

                params: {
                    lineage: this.state.lineage
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
                        subTitle={localizerDict['404Hint']}
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



        var whoLabelTag;
        if (this.lineageData.WHOLabel === null) {
            whoLabelTag = <Tag color="default">None</Tag>;
        }
        else {
            whoLabelTag = <Tag color="blue">{this.lineageData.WHOLabel}</Tag>
        }

        var monitorLevelTag;
        switch (this.lineageData.monitorLevel) {
            case 'VOC':
                monitorLevelTag = <Tag color="red">VOC</Tag>;
                break;

            case 'VOI':
                monitorLevelTag = <Tag color="volcano">VOI</Tag>;
                break;

            case 'VUM':
                monitorLevelTag = <Tag color="orange">VUM</Tag>;
                break;

            case 'FMV':
                monitorLevelTag = <Tag color="gold">FMV</Tag>;
                break;
            
            default:
                monitorLevelTag = <Tag color="lime">None</Tag>;
                break;
        }

        var statusTag;
        if (this.lineageData.status === 'Withdraw') {
            statusTag = <Tag color="red">Withdraw</Tag>;
        }
        else {
            statusTag = <Tag color="green">Normal</Tag>;
        }

        var lineageTree;

        if (this.lineageData.status === 'Withdraw') {
            lineageTree = (
                <Result
                    status="404"
                    title="404"
                    subTitle={localizerDict['Withdraw lineage seq']}
                />
            );
        }
        else {
            lineageTree = (
                <ReactEcharts
                    style={{ height: 550 }}
                    option={this.getOption(this.treeData)}
                    notMerge={true}
                    ></ReactEcharts>
            );
        }

        return (
            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <Card>
                        <Descriptions title={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <h2
                                    style={{
                                        margin: 'auto 0'
                                    }}>{this.props.lineage}</h2>
                                <div style={{
                                    width: '10px'
                                }}/>
                                <SubscribeButton isSubed={this.state.isSubed} onClick={this.onSubscribe}/>
                            </div>
                            
                            }>
                            <Descriptions.Item label={localizerDict["WHO label"]}>
                                {whoLabelTag}
                            </Descriptions.Item>
                            
                            <Descriptions.Item label={localizerDict["Monitor level"]}>
                                {monitorLevelTag}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Status"]}>
                                {statusTag}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Earlist discover date"]}>
                                {this.lineageData.earliestDate === null ? "NA" : this.lineageData.earliestDate}
                            </Descriptions.Item>
                            
                            <Descriptions.Item label="R0">
                                {this.lineageData.R0}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Average incubation"]}>
                                {this.lineageData.avgIncubation + ' ' + localizerDict['Day']}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Sequence Count"]}>
                                {this.lineageData.seqCount}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Children Count"]}>
                                {this.lineageData.childCount}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Parent Lineage"]}>
                                {this.parentLineage}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Update time"]}>
                                {this.lineageData.updateTime}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card>
                        <Tabs>
                            <TabPane tab={localizerDict['Lineage Family']} key='1'>
                                {lineageTree}
                            </TabPane>
                            <TabPane tab={localizerDict['Ref Sequence']} key='2'>
                                <SeqDataDisplay lineage={this.state.lineage} />
                            </TabPane>
                        </Tabs>
                        
                    </Card>
                </Col>
            </Row>
        );
    }
}