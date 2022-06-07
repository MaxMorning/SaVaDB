import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'


import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import 'moment/locale/zh-cn'
// moment.locale('zh-cn')

// 设置懒加载
const LoginPage = lazy(()=>import('./pages/Login'))
const App = lazy(()=>import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path='zh_CN/*' element={
                <ConfigProvider locale={zh_CN}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path='login' element={<LoginPage locale='zh-cn'/>}/>
                            <Route path='' element={<App AppType='HomeApp' locale='zh-cn'/>}/>
                            <Route path='SubRegions' element={<App AppType='SubRegions' locale='zh-cn'/>}/>
                            <Route path='SubLineages' element={<App AppType='SubLineages' locale='zh-cn'/>}/>
                            <Route path='Search' element={<App AppType='Search' locale='zh-cn'/>}/>
                            <Route path='Status' element={<App AppType='Status' locale='zh-cn'/>}/>
                            <Route path='Lineages' element={<App AppType='Lineages' locale='zh-cn'/>}/>
                            <Route path='Compare' element={<App AppType='Compare' locale='zh-cn'/>}/>
                            <Route path='Statistics' element={<App AppType='Statistics' locale='zh-cn'/>}/>
                            <Route path='Api' element={<App AppType='Api' locale='zh-cn'/>}/>
                            <Route path='DataSource' element={<App AppType='DataSource' locale='zh-cn'/>}/>
                            <Route path='EditInfo' element={<App AppType='EditInfo' locale='zh-cn'/>}/>
                            <Route path='lineage/:variant' element={<App AppType='LineageDetail' locale='zh-cn'/>}/>
                            <Route path='region/:region' element={<App AppType='RegionDetail' locale='zh-cn'/>}/>
                        </Routes>
                    </Suspense>
                </ConfigProvider>
            }/>

            <Route path='en_US/*' element={
                <ConfigProvider locale={en_US}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path='login' element={<LoginPage/>} />
                            <Route path='' element={<App AppType='HomeApp' locale='en-us' />}/>
                            <Route path='SubRegions' element={<App AppType='SubRegions' locale='en-us' />}/>
                            <Route path='SubLineages' element={<App AppType='SubLineages' locale='en-us' />} />
                            <Route path='Search' element={<App AppType='Search' locale='en-us' />}/>
                            <Route path='Status' element={<App AppType='Status' locale='en-us'/>}/>
                            <Route path='Lineages' element={<App AppType='Lineages' locale='en-us' />}/>
                            <Route path='Compare' element={<App AppType='Compare' locale='en-us' />}/>
                            <Route path='Statistics' element={<App AppType='Statistics' locale='en-us' />}/>
                            <Route path='Api' element={<App AppType='Api' locale='en-us'/>}/>
                            <Route path='DataSource' element={<App AppType='DataSource' locale='en-us'/>}/>
                            <Route path='EditInfo' element={<App AppType='EditInfo' locale='en-us'/>}/>
                            <Route path='lineage/:variant' element={<App AppType='LineageDetail' locale='en-us'/>}/>
                            <Route path='region/:region' element={<App AppType='RegionDetail' locale='en-us'/>}/>
                        </Routes>
                    </Suspense>
                </ConfigProvider>
            }/>

            <Route path='/' element={<Navigate to="zh_CN/" replace />} />

        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
