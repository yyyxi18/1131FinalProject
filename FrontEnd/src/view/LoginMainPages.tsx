import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style/Mainpage.module.css'; // 引入 CSS 文件
import { Countdown } from '../view/CountDown';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from '@react-oauth/google';

export const LoginMainPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00'); // 設定倒數目標日期
  const navigate = useNavigate();

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

  // Google 登入成功處理
  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Google Login Success:', response);
    navigate('/Mainpage'); // 登入成功後跳轉至主頁面
  };

  // 跳轉到其他頁面
  const handleAnotherButtonClick = () => {
    navigate('/Main); // 跳轉到指定頁面
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>
      <div className={styles.heroImagefilter}> </div>
      <div className={styles.countdownSection}>
        <div className={styles.deadlineText}>剩餘報名截止日期</div>
        <Countdown
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
        />
      </div>

      <h1 className={styles.title}>2025 TKU IM marathon</h1>

      <div className={styles.heroImage}></div>

      <div className={styles.sloganContainer}>
        <div className={styles.slogan}>歡迎登入</div>
      </div>

      <div className={styles.actionButtons}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
      </div>

      <nav className={styles.navigation}>
        <Link to="/" className={styles.navigationLink}>返回主頁</Link>
      </nav>

      <div className={styles.flexContainer}>登入</div>
      <div className={styles.box}>快速登入</div>

      

      <button className={styles.quickLoginButton} onClick={handleQuickLogin}>
        訪客
      </button>

      {/* 新增按鈕並實現跳轉 */}
      <button className={styles.boxGoogle} onClick={handleAnotherButtonClick}>
        G
      </button>

      <div className={styles.boxLine}></div>
      <div className={styles.boxLine2}></div>
      <div className={styles.boxLine3}></div>
    </div>
  );
};

export default LoginMainPage;