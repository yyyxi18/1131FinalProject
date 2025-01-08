//主頁

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 引入 Link 用于导航
import styles from '../style/Mainpage.module.css'; // 引入模块化 CSS 文件
import { Countdown } from '../view/CountDown';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export const Mainpage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00'); // 设置倒计时目标日期

  const navigate = useNavigate(); // 使用 useNavigate

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
    { text: '活動簡章', path: '/activity-details' },
    { text: '活動路線', path: '/route-map' },
    { text: '線上客服', path: '/online-service' },
    { text: '登入', path: '/login' },
  ];

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

      <h1 className={styles.title}>2025 TKU IM</h1>
      <h1 className={styles.title}>MARATHON</h1>

      <div className={styles.heroImage}>
        <div className={styles.sloganContainer}>
          <div className={styles.slogan}>怕輸 ! 還不快跑</div>
          <div className={styles.slogan}>怕輸 ! 還不快跑</div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.registerButton}
          tabIndex={0}
          onClick={() => navigate('/login')}
        >
          報名
        </button>

        <button
          className={styles.modifyButton}
          tabIndex={0}
          onClick={() => navigate('/edit')}
        >
          修改與查詢
        </button>
      </div>

      <nav className={styles.navigation}>
        {navigationItems.map(({ text, path }) => (
          <Link key={path} to={path} className={styles.navigationLink}>
            {text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Mainpage;
