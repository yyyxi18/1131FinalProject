//倒數
import React from 'react';
import styles from './Marathon.module.css';
import { TimerBox } from './TimerBox';
import { CountdownDisplayProps } from './types';

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ hours, minutes, seconds }) => (
  <div className={styles.countdown}>
    <TimerBox value={hours} />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3e6050c9b31471f0665d02d7795395388dd785841c1865721620049b8da7c38?placeholderIfAbsent=true&apiKey=2ae34a784b504fd09cd9cc5215760974" className={styles.separator} alt="" />
    <TimerBox value={minutes} />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d5c5284ae65f76f083d232fb9984f0435a45fb7d9669208cd4ad9481476d4c2?placeholderIfAbsent=true&apiKey=2ae34a784b504fd09cd9cc5215760974" className={styles.separator} alt="" />
    <TimerBox value={seconds} />
  </div>
);
