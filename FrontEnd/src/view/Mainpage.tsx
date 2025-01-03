import React from 'react';
import styles from '../style/Mainpage.css';  // 引入 CSS 文件
import { NavigationLink } from './NavigationLink';
import { CountdownDisplay } from '../view/CountDown';

const navigationItems = ['活動簡章', '活動路線', '線上客服', '登入'];

export const Mainpage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.countdownSection}>
        <div className={styles.deadlineText}>剩餘報名截止日期</div>
        <CountdownDisplay hours="00" minutes="00" seconds="03" />
      </div>
      
      <h1 className={styles.title}>2025 TKU IM marathon</h1>
      
      <div className={styles.heroImage}></div>  {/* 改為空 div，圖片會透過 CSS 顯示 */}
      
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
    </div>
  );
}

export default Mainpage;
