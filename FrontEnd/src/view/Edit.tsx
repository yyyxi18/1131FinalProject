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
  const { email, phone } = location.state || {}; // 從路由參數取得 email 和 phone

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    email: email || '', // 來自 location.state
    phone: phone || '', // 來自 location.state
  });

  // 倒數計時
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

  // 從後端獲取資料
  useEffect(() => {
    const fetchData = async () => {
      if (!email || !phone) {
        console.error('缺少 email 或 phone，無法獲取資料');
        return;
      }
  
      try {
        const response = await fetch(
          `http://127.0.0.1:2004/api/v1/user/getUserDataByEmailAndPhone?email=${email}&phone=${phone}`
        );
  
        if (!response.ok) {
          throw new Error(`獲取資料失敗，HTTP 狀態碼: ${response.status}`);
        }
  
        const userData = await response.json();
        console.log('獲取的使用者資料:', userData);
  
        if (userData.body && userData.body._id) {
          // 確保 `formData` 被正確設置
          const newFormData = {
            id: userData.body._id,
            name: userData.body.name || '',
            gender: userData.body.gender || '',
            email: userData.body.email || '',
            phone: userData.body.phone || '',
          };
          console.log("新設置的使用者資料:", newFormData);
          setFormData(newFormData);
        } else {
          console.error('未找到有效的使用者 ID');
        }
      } catch (error) {
        console.error('獲取資料失敗:', error);
      }
    };
  
    fetchData();
  }, [email, phone]);
  

  // 提交更新請求
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('提交前檢查的資料:', formData);

    const { id, name, gender, email, phone } = formData;

    if (!id || !name.trim() || !gender.trim() || !email.trim() || !phone.trim()) {
      console.error('檢查的值有缺失:', { id, name, gender, email, phone });
      alert('請確認所有欄位都有值');
      return;
    }

    try {
      const payload = { id, name, gender, email, phone }; // 包括所有必要的數據
      console.log('發送的資料:', payload);

      const response = await fetch('http://127.0.0.1:2004/api/v1/user/updateUserByID?_id=${id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        console.error('錯誤細節:', errorDetail);
        throw new Error(`更新資料失敗，HTTP 狀態碼: ${response.status}`);
      }

      const data = await response.json();
      console.log('資料已更新:', data);
      alert('資料已更新');
      navigate('/Main'); // 跳轉到指定頁面
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
      <h1 className="title">2025 TKU IM</h1>
      <h1 className="title">MARATHON</h1>
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              電話：
              <input
                type="text"
                className="form-input"
                value={formData.phone}
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
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email：
              <input
                type="email"
                className="form-input"
                value={formData.email}
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
