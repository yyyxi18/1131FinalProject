import React from 'react';
import '../style//MarathonBanner.css'; // 引入 CSS 檔案
import { useNavigate } from 'react-router-dom'; // React Router 的導航 hook

const EnterPage: React.FC = () => {

    const navigate = useNavigate(); // 用於導航到下一頁

  const handleGoClick = () => {
    navigate('/Mainpage'); // 替換為目標頁面的路徑
  };
  return (
    <div className="banner-container">
      <div className="banner-title">
        2025 TKU IM
        <br />
        MARATHO 
      </div>
      <button className='banner-subtitle' onClick={handleGoClick}>
  Go
</button>

    </div>
  );
};

export default EnterPage;
