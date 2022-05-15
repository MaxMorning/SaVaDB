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
    CloudServerOutlined
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

const items = [
    getItem('Home', 'home', <HomeOutlined />),
    getItem('Subscribe', 'subscribe', <DesktopOutlined />, [
        getItem('Regions', 'regions', <MyIcon type="icon-earth" />),
        getItem('Lineages', 'sub_lineages', <BranchesOutlined />),
    ]),
    getItem('Variants', 'variants', <MyIcon type="icon-dna" />, [
        getItem('Search', 'search', <SearchOutlined />),
        getItem('Lineages', 'lineages', <BranchesOutlined />),
        getItem('Compare', 'compare', <MyIcon type="icon-compare" />),
    ]),
    getItem('Data', 'data', <DatabaseOutlined />, [
        getItem('Statistics', 'statistics', <LineChartOutlined />),
        getItem('API', 'api', <ConsoleSqlOutlined />),
        getItem('Data source', 'dataSource', <CloudServerOutlined />)
    ]),
    getItem('User', 'user', <UserOutlined />, [
        getItem('Info', 'info', <InfoCircleOutlined />),
        getItem('Log out', 'logout', <LogoutOutlined />)
    ]),
];

export default class MySider extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
        });
    };

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
                <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline" items={items} />
            </Layout.Sider>
        );
    }
}
