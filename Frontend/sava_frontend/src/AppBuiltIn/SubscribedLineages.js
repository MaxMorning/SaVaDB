import React, { Component } from 'react';
import { Row, Result, Spin, Button } from 'antd';
import "antd/dist/antd.min.css";
import { LoadingOutlined } from '@ant-design/icons';

import Requester from '../utils/Requester';
import BriefLineageCard from '../component/BriefLineageCard';
import Localizer from '../utils/Localizer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


export default class SubscribedLineages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubLoaded: false,
            is403: false,
            notSubAnyLineage: false
        }
    }

    componentDidMount() {
        this.state = {
            isSubLoaded: false,
            is403: false,
            notSubAnyLineage: false
        };

        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/user/getUserSubLineages'
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
                        this.setState({notSubAnyLineage: true});
                        return;
                    }

                    this.setState({
                        isSubLoaded: true
                    })
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
    }
    
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
                    extra={<Button type="primary">Back Home</Button>}
                />
            );
        }

        if (this.state.notSubAnyLineage) {
            return (
                <Result
                    title={localizerDict["No Subscribing Lineage"]}
                    subTitle=""
                />
            );
        }

        var briefCardList = [];
        for (var i = 0; i < this.subList.length; i++) {
            briefCardList.push(<BriefLineageCard lineage={this.subList[i]}/>);
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