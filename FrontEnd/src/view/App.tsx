import { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { People } from '../interface/People';
import { resp } from '../interface/resp';
import { LoginPage } from './LoginPage'; // 引入 LoginPage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarathonBanner from '../view/EnterPage'; // Banner 頁面
import NextPage from '../view/Mainpage'; // 目標頁面

function App() {
  const [students, setStudents] = useState<Array<People>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 管理登入狀態
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 錯誤訊息狀態
  const cache = useRef<boolean>(false);

  useEffect(() => {
    if (isLoggedIn && !cache.current) {
      // 已登入且未進行緩存時，獲取數據
      cache.current = true;
      asyncGet(api.getAll).then((res: resp<Array<People>>) => {
        if (res.code === 200) {
          setStudents(res.body);
        } else {
          console.error('Failed to fetch students:', res.message);
        }
      });
    }
  }, [isLoggedIn]); // 依賴 isLoggedIn

  const handleLogin = (email: string, password: string) => {
    // 假登入驗證邏輯
    if (email === 'test@example.com' && password === 'password') {
      setIsLoggedIn(true); // 登入成功，切換狀態
      setErrorMessage(null); // 清除錯誤訊息
    } else {
      setErrorMessage('帳號或密碼錯誤，請重新嘗試。'); // 更新錯誤訊息
    }
  };

//轉化頁面
return (
  <Router>
    <Routes>
      <Route path="/" element={<MarathonBanner />} />
      <Route path="/nextpage" element={<NextPage />} />
    </Routes>
  </Router>
);
}


  

export default App;
