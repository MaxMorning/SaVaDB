import React, { Component, lazy } from 'react';
import './App.css';
import { Layout, PageHeader } from 'antd';
import MySider from './component/MySider';
import "antd/dist/antd.min.css";
import Requester from './utils/Requester';
import moment from 'moment'
import Localizer from './utils/Localizer';

import { withRouter, RoutedProps } from './utils/withRouter';

const { Header, Content, Footer } = Layout;

// 设置懒加载
const HomeApp = lazy(()=>import('./AppBuiltIn/HomeApp'));
const SubRegionsApp = lazy(()=>import('./AppBuiltIn/SubscribedRegions'));
const SubLineagesApp = lazy(() => import('./AppBuiltIn/SubscribedLineages'));
const SearchApp = lazy(() => import('./AppBuiltIn/SearchApp'));
const LineagesApp = lazy(() => import('./AppBuiltIn/LineagesApp'));
const CompareApp = lazy(() => import('./AppBuiltIn/CompareApp'));
const StatisticsApp = lazy(() => import('./AppBuiltIn/StatisticsApp'));
const LineageDetailApp = lazy(() => import('./AppBuiltIn/LineageDetailApp'));
const RegionDetailApp = lazy(() => import('./AppBuiltIn/RegionDetailApp'));

class App extends Component {
    constructor(props) {
        super(props);

        console.log(props);
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

        var appProps = {};
        var secondPath = false;

        switch (this.state.AppType) {
            case 'HomeApp':
                BuiltInApp = HomeApp;
                pageName = localizerDict['HomeAppTitle'];
                subTitle = "";
                break;

            case 'SubRegions':
                BuiltInApp = SubRegionsApp;
                pageName = localizerDict['SubRegionsTitle'];
                subTitle = "";
                break;

            case 'SubLineages':
                BuiltInApp = SubLineagesApp;
                pageName = localizerDict['SubLineagesTitle'];
                subTitle = "";
                break;

            case 'Search':
                BuiltInApp = SearchApp;
                pageName = localizerDict['SearchTitle'];
                subTitle = "";
                break;

            case 'Lineages':
                BuiltInApp = LineagesApp;
                pageName = localizerDict['LineagesTitle'];
                subTitle = "";
                break;

            case 'Compare':
                BuiltInApp = CompareApp;
                pageName = localizerDict['CompareTitle'];
                subTitle = "";
                break;

            case 'Statistics':
                BuiltInApp = StatisticsApp;
                pageName = localizerDict['StatisticsTitle'];
                subTitle = "";
                break;

            case 'LineageDetail':
                var variantIdx = this.props.location.pathname.lastIndexOf("\/");
                var variant = this.props.location.pathname.substring(variantIdx + 1, this.props.location.length);

                BuiltInApp = LineageDetailApp
                pageName = localizerDict['LineageDetail'];
                subTitle = variant;
                appProps = {
                    'lineage': variant
                };
                secondPath = true;
                break;

            case 'RegionDetail':
                var regionIdx = this.props.location.pathname.lastIndexOf("\/");
                var region = this.props.location.pathname.substring(regionIdx + 1, this.props.location.length);

                BuiltInApp = RegionDetailApp;
                pageName = localizerDict['RegionDetail'];
                subTitle = region.replaceAll('%20', ' ');
                appProps = {
                    'region': region.replaceAll('%20', ' ')
                };
                secondPath = true;
                break;

            case 'EditInfo':
                // do nothing
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
                parentJumpFunc={this.setLink}
                secondPath={secondPath}
                role={this.state.role}/>

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
                    <BuiltInApp {...appProps}/>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        color: '#999999'
                    }}>
                    {localizerDict['FooterText']}
                </Footer>
            </Layout>
        </Layout>
    );}
}

export default withRouter(App);