import React, { Component } from 'react';
import { Radio, Input, Empty, List, Descriptions, Tag, Result, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import "antd/dist/antd.min.css";

import Requester from '../utils/Requester';

const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class SearchApp extends Component {
    constructor(props) {
        super(props);

        this.searchResult = [];
        this.searchTypeStr = "Lineage";
        this.state = {
            searching: false,
            searched: false
        };
    }

    searchType = React.createRef();

    onSearch = (value, event) => {
        this.setState({
            searching: true,
            searched: false
        });
        this.searchResult = [];

        if (value.length > 32) {
            value = value.substr(0, 32);
        }

        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/search',

                params: {
                    type: this.searchTypeStr,
                    key: value
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    // this.searchType.value = this.searchTypeStr;
                    this.searchResult = response.data.data;
                    this.setState({
                        searching: false,
                        searched: true
                    });
                }
            },
            (error) => {}
        );
    };

    onRadioChange = (event) => {
        this.searchTypeStr = event.target.value;
    }

    getLineageInfoWidget(lineageInfo) {
        // lineageInfo 格式大致如下 "Delta VOC Normal"
        var infoList = lineageInfo.trim().split(" ");

        var whoLabelTag;
        if (infoList[0] === "None") {
            whoLabelTag = <Tag color="default">None</Tag>;
        }
        else {
            whoLabelTag = <Tag color="blue">{this.lineageData.WHOLabel}</Tag>
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
                    <Descriptions.Item label="WHO label">
                        {whoLabelTag}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Monitor level">
                        {monitorLevelTag}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status">
                        {statusTag}
                    </Descriptions.Item>
                </Descriptions>;
    }

    render() {
        console.log(this.searchResult);
        var searchResultWidget;
        if (this.state.searching) {
            searchResultWidget = 
                <Result
                    title="Loading..."
                    extra={<Spin indicator={antIcon} size="large"/>}
                />
            ;
        }
        else if (this.state.searched && this.searchResult.length > 0) {
            console.log(this.searchTypeStr);
            switch (this.searchTypeStr) {
                case "Lineage":
                    searchResultWidget = 
                        <List
                            pagination={true}
                            itemLayout="horizontal"
                            dataSource={this.searchResult}
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
                        </List>;
                    break;
            
                case "Region":
                    searchResultWidget = 
                        <List
                        pagination={true}
                        itemLayout="horizontal"
                        dataSource={this.searchResult}
                        renderItem={
                            (item) => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={<a href={"./region/" + item[0]}>{item[0]}</a>}
                                    description={item[1]}
                                    />
                                </List.Item>
                            )
                        }
                        style={{
                            padding: '10px'
                        }}>
                    </List>;
                    break;

                case "Notification":
                    searchResultWidget = 
                    <List
                        pagination={true}
                        itemLayout="horizontal"
                        dataSource={this.searchResult}
                        renderItem={
                            (item) => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={<a href={item[2]}>{item[0]}</a>}
                                    description={item[1]}
                                    />
                                </List.Item>
                            )
                        }
                        style={{
                            padding: '10px'
                        }}>
                    </List>;
                    break;

                case "API":
                    searchResultWidget = 
                    <List
                        pagination={true}
                        itemLayout="horizontal"
                        dataSource={this.searchResult}
                        renderItem={
                            (item) => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={<a href={"./apiIntro#" + item[0]}>{item[0]}</a>}
                                    description={item[1]}
                                    />
                                </List.Item>
                            )
                        }
                        style={{
                            padding: '10px'
                        }}>
                    </List>;
                    break;

                default:
                    break;
            }
            
        }
        else {
            searchResultWidget = <Empty 
                                style={{
                                    padding: '200px 0px'
                                }}/>
        }

        return (
            <div
                style={{
                    background: '#FFFFFF'
                }}>
                <Radio.Group defaultValue="Lineage"
                    ref={ this.searchType }
                    buttonStyle="solid"
                    style={{
                        padding: '10px 10px'
                    }}
                    onChange={this.onRadioChange}>
                    <Radio.Button value="Lineage">Lineage</Radio.Button>
                    <Radio.Button value="Region">Region</Radio.Button>
                    <Radio.Button value="Notification">Notification</Radio.Button>
                    <Radio.Button value="API">API</Radio.Button>

                </Radio.Group>

                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={this.onSearch}
                    style={{
                        padding: '0px 10px 10px 10px'
                    }}
                />

                <div id="searchResult">
                    {searchResultWidget}
                </div>
            </div>
        );
    }
}