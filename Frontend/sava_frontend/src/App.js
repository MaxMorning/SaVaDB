import './App.css';
import { Layout, Breadcrumb } from 'antd';
import MySider from './component/MySider';
import "antd/dist/antd.min.css";

const { Header, Content, Footer } = Layout;

function App() {
    let username = "Morning";

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}>
            <MySider user={username}/>

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
    );
}

export default App;
