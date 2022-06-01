import React from 'react';
import { Menu, Avatar, Typography, Layout } from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    BranchesOutlined,
    DatabaseOutlined,
    UserOutlined,
    SearchOutlined,
    LineChartOutlined,
    ConsoleSqlOutlined,
    LogoutOutlined,
    InfoCircleOutlined,
    CloudServerOutlined,
    LoginOutlined
} from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3402306_m1a2y8hncx.js',
});

const { Title } = Typography;

export default class MySider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            didLogin: props.didLogin,
            selectedKey: props.selectedKey};
    }

    didLoginItems = [
        getItem('Home', 'HomeApp', <HomeOutlined />),
        getItem('Subscribe', 'subscribe', <DesktopOutlined />, [
            getItem('Regions', 'SubRegions', <MyIcon type="icon-earth" />),
            getItem('Lineages', 'SubLineages', <BranchesOutlined />),
        ]),
        getItem('Variants', 'variants', <MyIcon type="icon-dna" />, [
            getItem('Search', 'Search', <SearchOutlined />),
            getItem('Lineages', 'Lineage', <BranchesOutlined />),
            getItem('Compare', 'Compare', <MyIcon type="icon-compare" />),
        ]),
        getItem('Data', 'data', <DatabaseOutlined />, [
            getItem('Statistics', 'Statistics', <LineChartOutlined />),
            getItem('API', 'Api', <ConsoleSqlOutlined />),
            getItem('Data source', 'DataSource', <CloudServerOutlined />)
        ]),
        getItem('User', 'user', <UserOutlined />, [
            getItem('Info', 'Info', <InfoCircleOutlined />),
            getItem('Log out', 'Logout', <LogoutOutlined />)
        ]),
    ];

    notLoginItems = [
        getItem('Home', 'HomeApp', <HomeOutlined />),
        getItem('Subscribe', 'subscribe', <DesktopOutlined />, [
            getItem('Regions', 'SubRegions', <MyIcon type="icon-earth" />),
            getItem('Lineages', 'SubLineages', <BranchesOutlined />),
        ]),
        getItem('Variants', 'variants', <MyIcon type="icon-dna" />, [
            getItem('Search', 'Search', <SearchOutlined />),
            getItem('Lineages', 'Lineage', <BranchesOutlined />),
            getItem('Compare', 'Compare', <MyIcon type="icon-compare" />),
        ]),
        getItem('Data', 'data', <DatabaseOutlined />, [
            getItem('Statistics', 'Statistics', <LineChartOutlined />),
            getItem('API', 'Api', <ConsoleSqlOutlined />),
            getItem('Data source', 'DataSource', <CloudServerOutlined />)
        ]),
        getItem('Log in', 'Login', <LoginOutlined/>),
    ];

    onCollapse = (inCollapsed) => {
        console.log(inCollapsed);
        this.setState({
            collapsed: inCollapsed,
        });
    };


    static getDerivedStateFromProps(new_props, my_state) {
        console.log("Enter");
        if (new_props.didLogin !== my_state.didLogin) {
            console.log("Hit");
            return {
                didLogin: new_props.didLogin
            }
        }
        return null;
    }

    menuSelectHandler = (item, key, keyPath, selectedKeys, domEvent) => {
        console.log(item);

        switch (item.key) {
            case 'HomeApp':
                this.props.parentJumpFunc('HomeApp');
                window.history.pushState(null,null, './');
                break;
        
            case 'SubRegions':
                this.props.parentJumpFunc('SubRegions');
                window.history.pushState(null,null, './SubRegions');
                break;

            case 'SubLineages':
                this.props.parentJumpFunc('SubLineages');
                window.history.pushState(null,null, './SubLineages');
                break;

            case 'Search':
                this.props.parentJumpFunc('Search');
                window.history.pushState(null,null, './Search');
                break;

            case 'Login':
                window.location.href = './login';
                break;

            case 'Logout':
                window.localStorage.removeItem("sava-token");
                window.location.href = './login';
                break;

            default:
                break;
        }
    }

    render() {
        const { collapsed } = this.state;

        let user = this.props.user;

        let userName;
        if (collapsed) {
            userName = <Avatar className='userName' style={{
                background: '#AAAAAA'
            }}> {user[0]} </Avatar>
        }
        else {
            userName = <Title level={4} style={{color: 'white', margin: 0}} ellipsis={true} className='userName'>{user}</Title>;
        }

        var my_menu;
        if (this.state.didLogin) {
            my_menu = <Menu theme="dark" defaultSelectedKeys={[this.state.selectedKey]} mode="inline" items={this.didLoginItems} onSelect={this.menuSelectHandler}/>;
        }
        else {
            my_menu = <Menu theme="dark" defaultSelectedKeys={[this.state.selectedKey]} mode="inline" items={this.notLoginItems} onSelect={this.menuSelectHandler}/>;
        }

        var temp_items = {};
        for (var key in this.items) {
            temp_items[key] = this.items[key];
        }
        this.items = temp_items;

        return (
            <Layout.Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo" style={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    height: 70,
                }}>
                {userName}
                </div>
                {my_menu}
            </Layout.Sider>
        );
    }
}
