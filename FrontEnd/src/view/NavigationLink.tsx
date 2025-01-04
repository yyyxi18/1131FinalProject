import React from 'react';
import styles from '../style/Marathon.module.css';
import { NavigationLinkProps } from '../interface/types';

export const NavigationLink: React.FC<NavigationLinkProps> = ({ text }) => (
  <button className={styles.navLink} tabIndex={0}>
    {text}
  </button>
);



export default NavigationLink;

/* NavigationLink 是一個功能單一的按鈕元件，用於顯示導航選項。
你可以將它作為頁面中的導航按鈕來使用，
並通過傳入不同的 text 屬性來顯示不同的按鈕文字。   */