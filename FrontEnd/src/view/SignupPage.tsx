//報名

//import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Signup.css';
import { Helmet } from 'react-helmet';

export const LoginMainPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    email: '',
  });
  const navigate = useNavigate();

  // 更新表單資料
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const randomAbsences = Math.floor(Math.random() * 10); // 隨機生成缺席次數
      const newPeople = {
        _id: "",  // 暫時設為空字符串或 undefined，等待後端返回
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        email: formData.email,
      };
      
      // 發送 POST 請求到後端 API
      const response = await fetch('http://127.0.0.1:2004/api/v1/user/addPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPeople),
      });

      if (!response.ok) {
        throw new Error('新增失敗，請檢查輸入內容！');
      }

      alert("新增成功！");

      // 清空表單
      setFormData({
        name: '',
        phone: '',
        gender: '',
        email: '',
      });

      // 提交成功後，重新加載學生列表
      // onSubmit(newStudent); // 如果有 onSubmit 函數，請取消註釋這行
    } catch (error: any) {
      console.error("新增失敗:", error);
      alert("新增失敗，請檢查輸入內容！");
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>
      <h1 className="title">2025 TKU IM</h1>
      <h1 className="title">MARATHON</h1>

      <div className="box">
        <div className="boxText">報名</div>
        <div className="form">
          <div className="form-group">
            <label>
              姓名：
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="輸入您的姓名"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              電話：
              <input
                type="text"
                name="phone"
                className="form-input"
                placeholder="輸入您的電話"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              性別：
              <input
                type="text"
                name="gender"
                className="form-input"
                placeholder="輸入您的性別"
                value={formData.gender}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Email：
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="輸入您的 Email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit" className="form-button" onClick={handleSubmit}>
            報名
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginMainPage;
