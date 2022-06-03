import React, { Component } from 'react';
import { Select } from 'antd';

import Requester from '../utils/Requester';

const { Option } = Select;

export default class RegionSearchSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            regionNameSearchData: []
        }
    }

    handleSearch = (newValue) => {
        if (newValue) {
            Requester.requestJSON(
                {
                    method: 'get',
                    url: '/api/data/searchRegionBrief',
                    params: {
                        key: newValue
                    }
                },
                false,
                (response) => {
                    if (response.data.code === 200) {
                        this.setState({
                            regionNameSearchData: response.data.data
                        });
                    }
                    else {
                        this.setState({
                            regionNameSearchData: []
                        });
                    }
                },
                (error) => {
                    this.setState({
                        regionNameSearchData: []
                    });
                }
            );
        } else {
            this.setState({
                regionNameSearchData: []
            });
        }
    };

    handleChange = (newValue) => {
        this.props.onChange(newValue);
    };

    render() {
        const options = this.state.regionNameSearchData.map((d) => <Option key={d}>{d}</Option>);

        return (
            <Select
                showSearch
                placeholder={this.props.placeholder}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}

                onSearch={this.handleSearch}
                onChange={this.handleChange}

                notFoundContent={null}
                style={{
                    width: '100%'
                }}
                >
                {options}
            </Select>
        );
    }
}