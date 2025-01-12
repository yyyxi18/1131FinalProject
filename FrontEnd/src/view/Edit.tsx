import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/CountDowm.css'; // 改用非模組化的 CSS
import '../style/Signup.css';
import { Helmet } from 'react-helmet';

export const Edit: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00'); // 設定倒數目標日期
  const navigate = useNavigate();
  const location = useLocation();
  const { email, phone } = location.state || {};

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:2004/api/v1/user/getUserDataByEmailAndPhone?email=${email}&phone=${phone}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setName(data.name);
        setGender(data.gender);
        setId(data._id); // 保存 ID 到狀態
      } catch (error) {
        console.error('獲取資料失敗:', error);
      }
    };

    if (email && phone) {
      fetchData();
    }
  }, [email, phone]);

  const [id, setId] = useState<string | null>(null); // 新增狀態
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 確認所有必填字段非空
    if (!name || !gender || !email || !phone) {
      alert('請確認所有欄位都有值');
      return;
    }

    try {
      const payload = { name, phone, gender, email }; // 添加 ID
      console.log('發送的資料:', payload);

      const response = await fetch(`http://127.0.0.1:2004/api/v1/user/updateUserByID?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetail = await response.text(); // 捕捉回傳的詳細錯誤
        console.error('錯誤細節:', errorDetail);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('資料已更新:', data);
      alert('資料已更新');
      navigate('/Main'); // 跳轉到指定頁
    } catch (error) {
      console.error('更新資料失敗:', error);
      alert('更新資料失敗，請檢查輸入內容');
    }
  };


  return (
    <div className="container">
      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>
      <h1 className="title">2025 TKU IM </h1>
      <h1 className="title">MARATHON </h1>
      <div className="heroImage"></div>
      <div className="box">
        <div className="boxText">編輯資料</div>
        <div className="form">
          <div className="form-group">
            <label>
              姓名：
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              電話：
              <input
                type="text"
                className="form-input"
                value={phone}
                disabled
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              性別：
              <input
                type="text"
                className="form-input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email：
              <input
                type="email"
                className="form-input"
                value={email}
                disabled
              />
            </label>
          </div>
          <button type="submit" className="form-button" onClick={handleSubmit}>
            確定
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;