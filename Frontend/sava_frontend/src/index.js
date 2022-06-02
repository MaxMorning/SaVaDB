import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import reportWebVitals from './reportWebVitals';

// 设置懒加载
const LoginPage = lazy(()=>import('./pages/Login'))
const App = lazy(()=>import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='login' element={<LoginPage/>} />
                <Route path='/' element={<App AppType='HomeApp'/>} />
                <Route path='/SubRegions' element={<App AppType='SubRegions'/>} />
                <Route path='/SubLineages' element={<App AppType='SubLineages'/>} />
                <Route path='/Search' element={<App AppType='Search'/>} />
                <Route path='/Lineages' element={<App AppType='Lineages'/>} />
            </Routes>
        </Suspense>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
