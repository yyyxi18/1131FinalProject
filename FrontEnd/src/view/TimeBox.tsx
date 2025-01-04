//數字組件
import React from 'react';
<<<<<<< HEAD
import styles from '../style/TimeBox.module.css';
=======
import styles from '../style/TimeBox.modul.css';
>>>>>>> 1401c362bd289cd71ffba3d9a743614e76785d87

interface TimerBoxProps {
  value: number; // 傳入的數值
}

export const TimerBox: React.FC<TimerBoxProps> = ({ value }) => (
  <div className={styles.timerBox}>
    {value.toString().padStart(2, '0')} {/* 確保數字是兩位，例如 01, 09 */}
  </div>
);


<<<<<<< HEAD
export default TimerBox;
=======
export default TimerBox;
>>>>>>> 1401c362bd289cd71ffba3d9a743614e76785d87
