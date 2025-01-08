//登入

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Mainpage.css'; // 改用非模組化的 CSS
import { Countdown } from '../view/CountDown';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const LoginMainPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00'); // 設定倒數目標日期
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (response: any) => {
    console.log('Google Login Success:', response);
  
    try {
      // 假設 response.credential 包含 Google 返回的 JWT Token
      const res = await axios.post('http://127.0.0.1:2004/google', {
        token: response.credential,
      });
  
      console.log('API 回應:', res.data);
  
      // 登入成功後跳轉至主頁面
      navigate('/Mainpage');
    } catch (error) {
      console.error('Google 登入 API 發送失敗:', error);
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);


  // 跳轉到其他頁面
  const handleAnotherButtonClick = () => {
    navigate('/Main'); // 跳轉到指定頁
  };

  function handleGoogleLoginFailure(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={styles.container}>


      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>
      <div className={styles.blurBackground}></div>

      <div className={styles.countdownSection}>
        <div className={styles.deadlineText}>剩餘報名截止日期</div>
        <Countdown
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
        />
      </div>

      <h1 className={styles.title}>2025 TKU IM </h1>
      <h1 className={styles.title}>MARATHON </h1>

      <div className={styles.heroImage}>
        <div className={styles.sloganContainer}>
          <div className={styles.slogan}>怕輸 ! 還不快跑</div>
          <div className={styles.slogan2}>怕輸 ! 還不快跑</div>
        </div>
      </div>

      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />

      <div className={styles.flexContainer}>
        <div className={styles.flexContainerWord}>
          登入
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxword}>快速登入</div>

        <button
          className={styles.quickLoginButton}
          onClick={handleAnotherButtonClick}
        >
          訪客
        </button>

        {/* 新增按鈕並實現跳轉 */}
        <button className={styles.boxGoogle} onClick={handleGoogleLoginSuccess}>
          G
        </button>

        <div className={styles.boxLine}></div>
        <div className={styles.boxLine2}></div>
        <div className={styles.boxLine3}></div>
      </div>
    </div>
  );
};

export default LoginMainPage;
