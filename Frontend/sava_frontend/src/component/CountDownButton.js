import React, { Component } from 'react';
import { Steps, Form, Input, Button } from 'antd';
import Localizer from '../utils/Localizer';

export default class CountDownButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            buttonText: -1
        }
    }

    btnOnClick = (event) => {
        var emailFormObj = this.props.formWidget.current.getFieldValue();
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (reg.test(emailFormObj.email)) {
            setTimeout(
                () => {
                    this.internalFunc()
                },
                1000
            );
            this.setState({
                isLoading: true,
                buttonText: 5
            });
            this.props.onClick(event);
        }
    }

    internalFunc() {
        if (this.state.buttonText === 1) {
            this.setState({
                isLoading: false,
                buttonText: -1
            })
        }
        else {
            this.setState({
                buttonText: this.state.buttonText - 1
            })
            setTimeout(
                () => {
                    this.internalFunc()
                },
                1000
            );
        }
    }

    render() {
        var localizerDict = Localizer.getCurrentLocalDict();
        return (
            <Button
                type={this.props.type}
                loading={this.state.isLoading}
                onClick={this.btnOnClick}
                style={{
                    width: '100px'
                }}>
                {this.state.buttonText < 0 ? localizerDict['Get Code'] : this.state.buttonText + 's'}
            </Button>
        );
    } 
}