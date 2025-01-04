//倒數
import React, { useEffect, useState } from 'react';
import styles from '../style/Marathon.css';
import { TimerBox } from '../view/TimeBox';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00');

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

  return (
    <div className={styles.countdown}>
      <TimerBox value={timeLeft.hours} />
      <span className={styles.unit}>小時</span>
      <TimerBox value={timeLeft.minutes} />
      <span className={styles.unit}>分鐘</span>
      <TimerBox value={timeLeft.seconds} />
      <span className={styles.unit}>秒</span>
    </div>
  );
};


<<<<<<< HEAD
export default Countdown;
=======
export default Countdown;
>>>>>>> 1401c362bd289cd71ffba3d9a743614e76785d87
