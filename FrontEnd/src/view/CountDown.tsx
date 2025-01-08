// components/Countdown.tsx
import React from 'react';
import styles from '../style/Countdown.module.css';

interface CountdownProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ hours, minutes, seconds }) => {
  return (
    <div className={styles.countdown}>
      <div className={styles.timerBox}>{hours}</div>
      <span className={styles.unit}>小時</span>
      <div className={styles.timerBox}>{minutes}</div>
      <span className={styles.unit}>分鐘</span>
      <div className={styles.timerBox}>{seconds}</div>
      <span className={styles.unit}>秒</span>
    </div>
  );
};
