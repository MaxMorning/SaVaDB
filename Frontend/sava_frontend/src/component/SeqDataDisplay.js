import React, { Component } from 'react';
import { Typography, Result, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Requester from '../utils/Requester';
import Localizer from '../utils/Localizer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Title, Paragraph, Text, Link } = Typography;

export default class SeqDataDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            is404: false
        };

        this.seqData = '';
    }

    componentDidMount() {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/data/getRefSeq',

                params: {
                    lineage: this.props.lineage
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.seqData = response.data.data;

                    this.setState({
                        isLoaded: true,
                        is404: false
                    });
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
                    isLoaded: true,
                    is404: false
                });
            }
        );
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();
        if (this.state.is404) {
            return (
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, this lineage don't have complete sequence yet."
                />
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Result
                    title={localizerDict["Loading..."]}
                    extra={<Spin indicator={antIcon} size="large"/>}
                />
            );
        }

        return (
            <Paragraph
                code>
                {this.seqData}
            </Paragraph>
        );
    }
}