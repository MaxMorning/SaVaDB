import React, { Component } from 'react';
import { Result, Input, Spin, Tabs, Tag, List, Descriptions, notification } from 'antd';

import "antd/dist/antd.min.css";
import Requester from '../utils/Requester';

import Localizer from '../utils/Localizer';

import { LoadingOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { CheckableTag } = Tag;
const { Search } = Input;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class StatusApp extends Component {
    constructor(props) {
        super(props);

        this.searchType = 'MonitorLevel';
        this.selectedTags = {
            'None': -1,
            'VOC': -1,
            'VOI': -1,
            'VUM': -1,
            'FMV': -1
        };
        this.state = {
            searching: false,
            selectedTags: this.selectedTags,
        };
    }

    handleTagChange = (tag, checked) => {
        if (this.state.searching) {
            const args = {
                message: 'Searching...',
                description:
                  'Searching...Please wait for the result.',
                duration: 2,
            };
            notification.open(args);

            return;
        }

        var tempMap = this.state.selectedTags;
        tempMap[tag] = checked ? 0 : -1;
        this.setState({
            selectedTags: tempMap
        });

        this.searchMonitorResult();
    }

    searchMonitorResult() {
        this.setState({
            searching: true
        })
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/getMonitorVariants',

                params: this.state.selectedTags
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.setState({
                        searchResult: response.data.data,
                        searching: false
                    })
                }
                else {
                    this.setState({
                        searching: false
                    });
                }
            },
            (error) => {
                this.setState({
                    searching: false
                })
            }
        );
    }

    getLineageInfoWidget(lineageInfo) {
        var localizerDict = Localizer.getCurrentLocalDict();
        
        // lineageInfo 格式大致如下 "Delta VOC Normal"
        var infoList = lineageInfo.trim().split(" ");

        var whoLabelTag;
        if (infoList[0] === "None") {
            whoLabelTag = <Tag color="default">None</Tag>;
        }
        else {
            whoLabelTag = <Tag color="blue">{infoList[0]}</Tag>
        }

        var monitorLevelTag;
        switch (infoList[1]) {
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
        if (infoList[2] === 'withdraw') {
            statusTag = <Tag color="red">Withdraw</Tag>;
        }
        else {
            statusTag = <Tag color="green">Normal</Tag>;
        }

        return  <Descriptions>
                    <Descriptions.Item label={localizerDict["WHO label"]}>
                        {whoLabelTag}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label={localizerDict["Monitor level"]}>
                        {monitorLevelTag}
                    </Descriptions.Item>

                    <Descriptions.Item label={localizerDict["Status"]}>
                        {statusTag}
                    </Descriptions.Item>
                </Descriptions>;
    }

    getSearchListWidget() {
        var localizerDict = Localizer.getCurrentLocalDict();
        if (this.state.searching) {
            return <Result
                    title={localizerDict["Loading..."]}
                    extra={<Spin indicator={antIcon} size="large"/>}
                />
        }
        return (<List
            pagination={true}
            itemLayout="horizontal"
            dataSource={this.state.searchResult}
            renderItem={
                (item) => (
                    <List.Item
                        style={{
                            padding: "10px"
                        }}>
                        <List.Item.Meta
                        title={<a href={"./lineage/" + item[0]}>{item[0]}</a>}
                        description={this.getLineageInfoWidget(item[1])}
                        />
                    </List.Item>
                )
            }
            style={{
                padding: '10px'
            }}>
        </List>)
    }

    onSearchWHOLabel = (value, event) => {
        this.setState({
            searching: true
        });

        if (value.length > 32) {
            value = value.substr(0, 32);
        }

        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/searchWHOLabel',

                params: {
                    key: value
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.setState({
                        searchResult: response.data.data,
                        searching: false
                    })
                }
                else {
                    this.setState({
                        searching: false
                    });
                }
            },
            (error) => {
                this.setState({
                    searching: false,
                });
            }
        );
    }

    tabsOnChange = () => {
        this.setState({
            searchResult: [],
            selectedTags: {
                'None': -1,
                'VOC': -1,
                'VOI': -1,
                'VUM': -1,
                'FMV': -1
            },
        });
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        var monitorTags = ['None', 'VOC', 'VOI', 'VUM', 'FMV'];
        return (
            <div
                style={{
                    background: '#FFFFFF',
                    padding: '10px'
                }}>
                <Tabs defaultActiveKey="1"
                    style={{
                    padding: '0px 10px'
                    }}
                    onChange={this.tabsOnChange}>
                    <TabPane tab={localizerDict['MonitorLevel']} key="1">
                    {monitorTags.map((tag) => (
                        <CheckableTag
                        key={tag}
                        checked={this.state.selectedTags[tag] > -1}
                        onChange={(checked) => this.handleTagChange(tag, checked)}
                        style={{
                            fontSize: '13px'
                        }}>
                        {tag}
                        </CheckableTag>
                    ))}

                    {this.getSearchListWidget()}
                    </TabPane>

                    <TabPane tab={localizerDict['WHOLabel']} key="2">
                    <Search
                        placeholder={localizerDict["input search text"]}
                        allowClear
                        enterButton={localizerDict["Search"]}
                        onSearch={this.onSearchWHOLabel}
                        style={{
                            padding: '0px 10px 10px 10px'
                        }}
                    />
                    {this.getSearchListWidget()}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
