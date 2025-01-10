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

    if (!email || !phone) {
      alert('請輸入有效的 Email 和電話！');
      return;
    }
    
    try {
      const response = await fetch('http://127.0.0.1:2004/api/v1/user/getUserDataByID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
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
    const { id, name, phone, gender } = result || {};
    try {
      const response = await fetch('http://127.0.0.1:2004/api/v1/admin/deleteUserByID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, phone, gender }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert('報名已取消');
      setResult(null); // 清除結果
    } catch (error) {
      console.error('取消報名失敗:', error);
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
