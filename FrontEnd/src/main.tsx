import React from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router'; // 匯入預設匯出的 router 配置
import { GoogleOAuthProvider } from '@react-oauth/google'; // 匯入 GoogleOAuthProvider

// 使用 createRoot 初始化 React 應用
const root = createRoot(document.getElementById('root')!);

// Google OAuth clientId - 替換為你的 Google OAuth 客戶端 ID
const GOOGLE_CLIENT_ID = '1072667935053-3q3h89f58iq9v2ss4uied1n6g7q3g68u.apps.googleusercontent.com';

root.render(
  <React.StrictMode>
    {/* 使用 GoogleOAuthProvider 提供 Google OAuth 上下文 */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} /> {/* 使用 RouterProvider 提供路由 */}
    </GoogleOAuthProvider>
  </React.StrictMode>
);
