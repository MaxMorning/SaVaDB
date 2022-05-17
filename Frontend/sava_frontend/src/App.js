import React, { Component } from 'react';
import './App.css';
import { Layout, Breadcrumb } from 'antd';
import MySider from './component/MySider';
import "antd/dist/antd.min.css";
import Requester from './utils/Requester';

const { Header, Content, Footer } = Layout;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {username: 'Anonymous', role: '', didLogin: false};
    }

    componentDidMount() {
        // 获取用户名
        Requester.requestJSON({
            method: 'get',
            url: '/api/user/getUserInfo'
        }, true,
        (response) => {
            if (response.data.code === 200) {
                this.setState({
                    username: response.data.data.username,
                    role: response.data.data.role,
                    didLogin: true
                });
            }
        },
        (error) => {}
        )
    }

    render() { 
        return (
        <Layout
            style={{
                minHeight: '100vh',
            }}>
            <MySider user={this.state.username} didLogin={this.state.didLogin}/>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    <h1>
                        主页
                    </h1>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}>
                    <Breadcrumb
                        style={{
                        margin: '16px 0',
                        }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}>
                        Bill is a cat.
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );}
}
