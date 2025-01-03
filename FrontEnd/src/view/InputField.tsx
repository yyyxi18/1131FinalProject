import React from 'react';
import styles from './InputField.module.css';

export interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value: string; // 新增 value 屬性
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 新增 onChange 屬性
}

export const InputField: React.FC<InputFieldProps> = ({ label, type, id, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value} // 綁定輸入框的值
        onChange={onChange} // 處理輸入變更
        className={styles.input}
      />
    </div>
  );
};
