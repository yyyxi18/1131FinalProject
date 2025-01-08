import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { InputField } from './InputField';
import { Divider } from './Divider';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void; // 傳入登入函數
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 防止默認表單提交行為
    onLogin(email, password); // 調用傳入的 onLogin 函數，傳遞 email 和 password
  };

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

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            id="email"
            value={email} // 綁定 email 狀態
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // 更新 email 狀態
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            value={password} // 綁定 password 狀態
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // 更新 password 狀態
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
