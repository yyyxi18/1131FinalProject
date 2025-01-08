import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style/Mainpage.module.css';
import { UseCountdown } from '../interface/UseCountdown';  // 引入 useCountdown
import { Countdown } from '../view/CountDown'; // 引入 Countdown 組件
import { Helmet } from 'react-helmet';

const navigationItems = [
  { text: '活動簡章', path: '/activity-details' },
  { text: '活動路線', path: '/route-map' },
  { text: '線上客服', path: '/online-service' },
  { text: '登入', path: '/login' },
];

export const Mainpage: React.FC = () => {
  const targetDate = new Date('2025-07-24T00:00:00');
  const timeLeft = UseCountdown(targetDate);  // 使用自定義的 UseCountdown hook
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>

      <h1 className={styles.title}>2025 TKU IM</h1>
      <h1 className={styles.title}>MARATHON</h1>
      <div className={styles.heroImage}>
        <div className={styles.sloganContainer}>怕輸 ! 還不快跑</div>
      </div>

      <div className={styles.countdownSection}>
        <div className={styles.deadlineText}>剩餘報名截止日期</div>
        {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
          <div className={styles.countdownEnd}>報名已截止</div>
        ) : (
          //countdow
          <Countdown hours={timeLeft.hours} minutes={timeLeft.minutes} seconds={timeLeft.seconds} />
        )}
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.registerButton}
          onClick={() => navigate('/login')}
        >
          報名
        </button>
        <button
          className={styles.modifyButton}
          onClick={() => navigate('/edit')}
        >
          修改與查詢
        </button>
      </div>

      <nav className={styles.navigation}>
        {navigationItems.map(({ text, path }) => (
          <Link key={path} to={path} className={styles.navLink}>
            {text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Mainpage;
