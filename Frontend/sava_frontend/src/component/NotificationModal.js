import React, { Component } from 'react';
import Requester from '../utils/Requester';
import { Modal, Button, Result, Spin, Typography } from 'antd';
import Localizer from '../utils/Localizer';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Paragraph, Text } = Typography;

export default class NotificationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            loading: true,
        };

        this.resetParent = props.resetParent;
    }

    componentDidMount() {
        Requester.requestJSON(
            {
                method: 'get',
                url: '/api/other/getNotiContent',

                params: {
                    idx: this.props.notiIndex
                }
            },
            false,
            (response) => {
                if (response.data.code === 200) {
                    this.setState({
                        loading: false,
                        content: response.data.data
                    });
                }
            },
            (error) => {}
        );
    }

    handleClose = () => {
        this.resetParent();
        this.setState({
            visible: false
        });
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        var content;
        if (this.state.loading) {
            content = <Result
                title={localizerDict["Loading..."]}
                extra={<Spin indicator={antIcon} size="large"/>}
            />
        }
        else {
            content = <div>
                <Text disabled>{this.state.content[1]}</Text>
                <Paragraph
                    style={{
                        minHeight: '300px'
                    }}>
                    {this.state.content[0]}
                </Paragraph>
            </div>
        }
        return (
            <Modal
                title={this.props.title}
                visible={this.state.visible}
                onCancel={this.handleClose}
                style={{
                    minWidth: '800px',
                }}
                footer={[
                    <Button onClick={this.handleClose}>
                        Close
                    </Button>
                  ]}>
                {content}
            </Modal>
        );
    }
}