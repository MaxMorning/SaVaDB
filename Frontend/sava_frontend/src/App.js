import React, { Component, lazy } from 'react';
import './App.css';
import { Layout, PageHeader } from 'antd';
import MySider from './component/MySider';
import "antd/dist/antd.min.css";
import Requester from './utils/Requester';

const { Header, Content, Footer } = Layout;

// 设置懒加载
const HomeApp = lazy(()=>import('./AppBuiltIn/HomeApp'))

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
        // 设置懒加载
        var BuiltInApp;
        var pageName, subTitle;

        switch (this.props.AppType) {
            case 'HomeApp':
                BuiltInApp = HomeApp;
                pageName = "Home";
                subTitle = "";
                break;

            default:
        }

        return (
        <Layout
            style={{
                minHeight: '100vh'
            }}>
            <MySider user={this.state.username} didLogin={this.state.didLogin}/>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}>
                    <PageHeader
                        onBack={() => null}
                        className="site-page-header"
                        title={pageName}
                        subTitle={subTitle}/>
                </Header>
                <Content
                    style={{
                        margin: '32px 32px',
                    }}>
                    <BuiltInApp />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        color: '#999999'
                    }}>
                    Sars-CoV-19 Variant DataBase Created by Morning Han
                </Footer>
            </Layout>
        </Layout>
    );}
}
