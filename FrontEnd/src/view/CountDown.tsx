// components/Countdown.tsx
import React from 'react';
import '../style/CountDowm.css';

interface CountdownProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ hours, minutes, seconds }) => {
  return (
    <div className="countdown">
      <div className="timerBox">{hours}</div>
      <span className="unit">:</span>
      <div className="timerBox">{minutes}</div>
      <span className="unit">:</span>
      <div className="timerBox">{seconds}</div>
      <span className="unit"></span>
    </div>
  );
};

