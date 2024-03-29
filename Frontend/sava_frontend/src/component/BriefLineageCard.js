import React, { Component } from 'react';
import { Card, Tag, Col, Spin, Descriptions } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "antd/dist/antd.min.css";

import Requester from '../utils/Requester';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import Localizer from '../utils/Localizer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class BriefLineageCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            lineage: props.lineage
        }
    }

    componentDidMount() {
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
                    this.setState({
                        isLoaded: true
                    });
                }
            }
        );
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        if (this.state.isLoaded) {
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

            return (
                <Col span={12}>
                    <Card bordered={true} hoverable
                        title={this.state.lineage}
                        extra={<a href={'./lineage/' + this.state.lineage}>{localizerDict['Detail']}</a>}>
                        <Descriptions>
                            <Descriptions.Item label={localizerDict["WHO label"]}>
                                {whoLabelTag}
                            </Descriptions.Item>
                            
                            <Descriptions.Item label={localizerDict["Monitor level"]}>
                                {monitorLevelTag}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Status"]}>
                                {statusTag}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Earlist discover date"]} span={2}>
                                {this.lineageData.earliestDate === null ? "NA" : this.lineageData.earliestDate}
                            </Descriptions.Item>
                            
                            <Descriptions.Item label="R0">
                                {this.lineageData.R0}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Average incubation"]} span={2}>
                                {this.lineageData.avgIncubation + ' ' + localizerDict['Day']}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Sequence Count"]}>
                                {this.lineageData.seqCount}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Children Count"]}>
                                {this.lineageData.childCount}
                            </Descriptions.Item>

                            <Descriptions.Item label={localizerDict["Update time"]} span={2}>
                                {this.lineageData.updateTime}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            );
        }
        else {
            return (
                <Col span={12}>
                    <Card bordered={true} hoverable title={this.state.lineage}
                        extra={<a href={'./lineage/' + this.state.lineage}>{localizerDict['Detail']}</a>}>
                        <Spin indicator={antIcon} size="large"/>
                    </Card>
                </Col>
            );
        }
    }
}