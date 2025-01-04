//數字組件
import React from 'react';
import styles from '../style/TimeBox.module.css';

interface TimerBoxProps {
  value: number; // 傳入的數值
}

export const TimerBox: React.FC<TimerBoxProps> = ({ value }) => (
  <div className={styles.timerBox}>
    {value.toString().padStart(2, '0')} {/* 確保數字是兩位，例如 01, 09 */}
  </div>
);


export default TimerBox;