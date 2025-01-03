import React from 'react';
import styles from './Marathon.module.css';
import { NavigationLinkProps } from './types';

export const NavigationLink: React.FC<NavigationLinkProps> = ({ text }) => (
  <button className={styles.navLink} tabIndex={0}>
    {text}
  </button>
);
