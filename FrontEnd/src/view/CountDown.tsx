import React from 'react';
import styles from '../style/MarathonBanner.module.css';
import { TimerBox } from '../view/TimeBox';

interface CountdownProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ hours, minutes, seconds }) => {
  return (
    <div className={styles.countdown}>
      <TimerBox value={hours} />
      <span className={styles.unit}>小時</span>
      <TimerBox value={minutes} />
      <span className={styles.unit}>分鐘</span>
      <TimerBox value={seconds} />
      <span className={styles.unit}>秒</span>
    </div>
  );
};

export default Countdown;
