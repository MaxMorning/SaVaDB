import React, { Component } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Localizer from '../utils/Localizer';

export default class SubscribeButton extends Component {
    constructor(props) {
        super(props);

        this.parentOnclick = props.onClick;
    }

    onClick = (event) => {
        this.parentOnclick(event);
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();

        if (this.props.isSubed) {
            return (
                <Button
                    icon={<MinusCircleOutlined />}
                    onClick={this.onClick}
                    >
                        {localizerDict['Unsubscribe']}
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
                        {localizerDict['Subscribe']}
                </Button>
            );
        }
    }
}
