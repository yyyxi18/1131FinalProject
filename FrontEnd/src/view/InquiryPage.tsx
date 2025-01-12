import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Mainpage.css';
import '../style/Inquiry.css';
import { Helmet } from 'react-helmet';

const navigationItems = [
  { text: '活動簡章', path: '/activity' },
  { text: '活動路線', path: '/map' },
  { text: '線上客服', path: '/onlineService' },
  { text: '登入', path: '/login' },
];

export const InquiryPage: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 獲取輸入值並確保是 string
    const email = (event.target as any).elements.email.value.toString().trim();
    const phone = (event.target as any).elements.phone.value.toString().trim();

    try {
      // 拼接查詢字符串
      const query = `?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
      const url = `http://127.0.0.1:2004/api/v1/user/getUserDataByEmailAndPhone${query}`;

      const response = await fetch(url, {
        method: 'GET', // 使用 GET 方法
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('查詢失敗:', error);
    }
  };

  const handleCancelRegistration = async () => {
    const { id } = result || {};
    if (!id) {
      alert('找不到使用者資料，無法取消報名');
      return;
    }

    // 確認操作
    const confirmCancel = window.confirm('確定要取消報名嗎？此操作無法復原！');
    if (!confirmCancel) return;

    try {
      const url = `http://127.0.0.1:2004/api/v1/user/cancelRunByID?id=${id}`;

      const response = await fetch(url, { method: 'DELETE' });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP error! Status: ${response.status}`);
      }

      alert('報名已取消');
      setResult(null); // 清空結果
      navigate('/main'); // 選擇跳轉到首頁或其他頁面
    } catch (error) {
      if (error instanceof Error) {
        console.error('取消報名失敗:', error.message);
        alert(`取消報名失敗: ${error.message}`);
      } else {
        console.error('取消報名失敗:', error);
        alert('取消報名失敗，請稍後再試');
      }
    }
  };


  const handleEditRegistration = () => {
    const { email, phone, name } = result || {};
    navigate('/edit', { state: { email, phone, name, result } });
  };

  return (
    <div className="container">
      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>

      <div className="top">
        <div className="left">
          <h1 className="title">2025 TKU IM</h1>
          <h1 className="title">MARATHON</h1>
        </div>

        <div className="right">
          <nav className="navigation">
            {navigationItems.map(({ text, path }) => (
              <Link key={path} to={path} className="navLink">
                {text}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mid">
        <div className="heroImageinquiry">
          <div className="sloganContainerinquiry">怕輸 ! 還不快跑</div>
        </div>
      </div>

      <div className="boxTinquiry">
        <div className="textinquiry">報名查詢</div>

        <form onSubmit={handleSubmit} className="inquiryForm">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="inquiryInput"
          />

          <input
            type="text"
            name="phone"
            placeholder="電話"
            className="inquiryInput"
          />

          <button type="submit" className="inquiryButton">查詢</button>
        </form>

        <div className="textinquiry2">資料</div>
        {result && (
          <div className="textinquiry2">
            <pre>{JSON.stringify(result, null, 2)}</pre>

            <button className="editButton" onClick={handleEditRegistration}>編輯資料</button>
            <button className="cancelButton" onClick={handleCancelRegistration}>老子反悔不想跑了！</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryPage;