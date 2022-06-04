import React, { Component } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

export default class SubscribeButton extends Component {
    constructor(props) {
        super(props);

        this.parentOnclick = props.onClick;
    }

    onClick = (event) => {
        this.parentOnclick(event);
    }

    render() {
        if (this.props.isSubed) {
            return (
                <Button
                    icon={<MinusCircleOutlined />}
                    onClick={this.onClick}
                    >
                        Unsubscribe
                </Button>
            );
        }
        else {
            return (
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={this.onClick}
                    >
                        Subscribe
                </Button>
            );
        }
    }
}
