import React, { Component } from 'react';
import { List, Typography, Descriptions, Card, Anchor, Row, Col } from 'antd';

import "antd/dist/antd.min.css";
import Requester from '../utils/Requester';
import Localizer from '../utils/Localizer';

const { Text } = Typography;
const { Link } = Anchor;

export default class APIPageApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiList: []
        };
    }

    componentDidMount() {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/other/getAllAPIDetail',

                params: {
                    lang: this.props.lang
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.setState({
                        apiList: response.data.data
                    });
                }
            },
            (error) => {}
        );
    }

    renderListItem = (item) => (
        <List.Item
            id={item[0]}>
            <List.Item.Meta
                description={
                    <Card
                        title={item[0]}>
                        <Descriptions>
                            <Descriptions.Item
                                span={3}
                                label='Description'>
                                {item[1]}
                            </Descriptions.Item>

                            <Descriptions.Item
                                span={3}
                                label='Request Params'>
                                <pre
                                    style={{
                                        fontSize: '12px',
                                        padding: '0.4em 0.6em',
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                        background: 'hsla(0,0%,58.8%,.1)',
                                        border: '1px solid hsla(0,0%,39.2%,.2)',
                                        borderRadius: '3px'
                                    }}>
                                    {(item[2] === null || item[2].length === 0) ? 'None' : item[2]}
                                </pre>
                            </Descriptions.Item>

                            <Descriptions.Item
                                span={3}
                                label='Response'>
                                <pre
                                    style={{
                                        padding: '0.4em 0.6em',
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                        background: 'hsla(0,0%,58.8%,.1)',
                                        border: '1px solid hsla(0,0%,39.2%,.2)',
                                        borderRadius: '3px'
                                    }}>
                                    {item[3]}
                                </pre>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                }
                />
        </List.Item>
    )

    render() {
        var links = [];
        for (var i = 0; i < this.state.apiList.length; ++i) {
            links.push(
                <Link
                    href={'#' + this.state.apiList[i][0]}
                    title={this.state.apiList[i][0]}/>
            );
        }

        return (
            <Row>
                <Col span={20}>
                    <List
                        size="large"
                        dataSource={this.state.apiList}
                        renderItem={this.renderListItem}
                        style={{
                            margin: '10px 0',
                        }}>

                    </List>
                </Col>

                <Col span={4}>
                    <Anchor
                        style={{
                            background: '#FFFFFF',
                            margin: '26px 0',
                            padding: '10px 5px'
                        }}>
                        {links}
                    </Anchor>
                </Col>
            </Row>
            
        );
    }
}