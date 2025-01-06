
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import styles from '../style/Mainpage.module.css';  // 引入 CSS 文件
import { NavigationLink } from '../view/NavigationLink';
import { Countdown } from '../view/CountDown';
import { Helmet } from 'react-helmet';

export const LoginMainPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00');  // 設定倒數目標日期
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


  const navigationItems = [
    { text: '活動簡章', path: '/activity' },
    { text: '活動路線', path: '/map' },
    { text: '線上客服', path: '/onlineservice' },
    { text: '登入', path: '/login' }
  ];
 const handleQuickLogin = () => {
    navigate('/Mainpage'); // 跳轉到  頁面（新增的）
  };
   

  return (
    <div className={styles.container}>
      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>

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
        <div className={styles.slogan}>怕輸 ! 還不快跑</div>
        <div className={styles.slogan}>怕輸 ! 還不快跑</div>
      </div> 

      <div className={styles.actionButtons}>
        <button className={styles.registerButton} tabIndex={0}>報名</button>
        <button className={styles.modifyButton} tabIndex={0}>修改與查詢</button>
      </div>

      <nav className={styles.navigation}>
        {navigationItems.map((item) => (
          <NavigationLink key={item} text={item} />
        ))}
      </nav>


      <div className={styles.flexContainer}>
         登入</div>
    <div className={styles.box}>
        快速登入</div>

    <button className={styles.boxGoole}>
        G
    </button>
    <button className= {styles.boxWord} onClick={handleQuickLogin}> 
        訪客
    </button>
<div className={styles.boxLine}>
</div>
<div className={styles.boxLine2}>
</div>
<div className={styles.boxLine3}>
</div>


</div>

   
  );
};

export default LoginMainPage;
