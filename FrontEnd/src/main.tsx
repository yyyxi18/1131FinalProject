import React from 'react';
import * as ReactDOM from "react-dom/client";  // 可能会导致错误，取决于库的导出方式
//import ReactDOM from 'react-dom/client'; // 使用 createRoot 從 react-dom/client
import './style/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router'; // 匯入預設匯出的 router 配置
import { createRoot } from 'react-dom/client';

// 使用 createRoot 初始化 React 應用
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* 使用 RouterProvider 提供路由 */}
  </React.StrictMode>
);
