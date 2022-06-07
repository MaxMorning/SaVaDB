import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

import "antd/dist/antd.min.css";
import Localizer from '../utils/Localizer';

export default class DataSourceApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        return (
            <Row gutter={[12, 12]}>
                <Col span={12}>
                    <Card
                        title={localizerDict['RegionStatSource']}
                        style={{
                            whiteSpace: 'pre-wrap'
                        }}>
                        {localizerDict['RegionStatSourceDetail']}
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title={localizerDict['BioDataSource']}
                        style={{
                            whiteSpace: 'pre-wrap'
                        }}>
                        {localizerDict['BioDatasourceDetail']}
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title={localizerDict['EpidemicDataSource']}
                        style={{
                            whiteSpace: 'pre-wrap'
                        }}>
                        {localizerDict['EpidemicDataSourceDetail']}
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title={localizerDict['CopyrightSource']}
                        style={{
                            whiteSpace: 'pre-wrap'
                        }}>
                        {localizerDict['CopyrightSourceDetail']}
                    </Card>
                </Col>
            </Row>
        );
    }
}