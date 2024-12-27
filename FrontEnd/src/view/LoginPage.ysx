import React from 'react';
import styles from './LoginPage.module.css';
import { InputField } from './InputField';
import { Divider } from './Divider';

export const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6403f477ccb6a76c6be4a7b9bf97f46988d258850c732a633c527aa0ca86c034?placeholderIfAbsent=true&apiKey=2ae34a784b504fd09cd9cc5215760974"
          className={styles.backgroundImage}
          alt=""
        />
        <h1 className={styles.title}>登入</h1>
        
        <form className={styles.formContainer}>
          <InputField
            label="Email"
            type="email"
            id="email"
          />
          <InputField
            label="Password"
            type="password"
            id="password"
          />
          
          <button 
            type="submit"
            className={styles.loginButton}
            aria-label="Login"
          >
            登入
          </button>
          
          <Divider className={styles.separator} />
          
          <div className={styles.socialContainer}>
            <Divider className={styles.divider} />
            <button 
              className={styles.googleButton}
              aria-label="Login with Google"
            >
              G
            </button>
            <Divider className={styles.divider} />
          </div>
        </form>
      </div>
    </div>
  );
};
