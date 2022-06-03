import React, { Component, lazy } from 'react';
import './App.css';
import { Layout, PageHeader } from 'antd';
import MySider from './component/MySider';
import "antd/dist/antd.min.css";
import Requester from './utils/Requester';
import moment from 'moment'
import Localizer from './utils/Localizer';

const { Header, Content, Footer } = Layout;

// 设置懒加载
const HomeApp = lazy(()=>import('./AppBuiltIn/HomeApp'));
const SubRegionsApp = lazy(()=>import('./AppBuiltIn/SubscribedRegions'));
const SubLineagesApp = lazy(() => import('./AppBuiltIn/SubscribedLineages'));
const SearchApp = lazy(() => import('./AppBuiltIn/SearchApp'));
const LineagesApp = lazy(() => import('./AppBuiltIn/LineagesApp'));
const CompareApp = lazy(() => import('./AppBuiltIn/CompareApp'));
const StatisticsApp = lazy(() => import('./AppBuiltIn/StatisticsApp'));

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'Anonymous', 
            role: '', 
            didLogin: false,
            locale: props.locale,
            AppType: props.AppType};

        moment.locale(props.locale);
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

    setLink = (dstApp) => {
        this.setState({AppType : dstApp});
    }

    render() {
        // 设置懒加载
        var BuiltInApp;
        var pageName, subTitle;

        var localizerDict = Localizer.getLocalDict(this.state.locale);

        switch (this.state.AppType) {
            case 'HomeApp':
                BuiltInApp = HomeApp;
                pageName = localizerDict['HomeAppTitle'];
                subTitle = "";
                break;

            case 'SubRegions':
                BuiltInApp = SubRegionsApp;
                pageName = "Subscribed Regions";
                subTitle = "";
                break;

            case 'SubLineages':
                BuiltInApp = SubLineagesApp;
                pageName = "Subscribed Lineages";
                subTitle = "";
                break;

            case 'Search':
                BuiltInApp = SearchApp;
                pageName = "Search";
                subTitle = "";
                break;

            case 'Lineages':
                BuiltInApp = LineagesApp;
                pageName = "Lineages";
                subTitle = "";
                break;

            case 'Compare':
                BuiltInApp = CompareApp;
                pageName = "Compare";
                subTitle = "";
                break;

            case 'Statistics':
                BuiltInApp = StatisticsApp;
                pageName = "Statistics";
                subTitle = "";
                break;

            default:
        }

        return (
        <Layout
            style={{
                minHeight: '100vh'
            }}>
            <MySider
                user={this.state.username}
                didLogin={this.state.didLogin}
                selectedKey={this.props.AppType}
                parentJumpFunc={this.setLink}/>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}>
                    <PageHeader
                        onBack={() => window.history.back()}
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
