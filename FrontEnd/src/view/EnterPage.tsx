//進入頁
import React from 'react';
import '../style/Enter.css'; // 引入 CSS 檔案
import { useNavigate } from 'react-router-dom'; // React Router 的導航 hook

const EnterPage: React.FC = () => {
  const navigate = useNavigate(); // 用於導航到下一頁

  const handleGoClick = () => {
    navigate('/main'); // 替換為目標頁面的路徑
  };

  return (
    <div className="enterPageContainer">
      <button className="go-word" onClick={handleGoClick}>
        Go
      </button>
    </div>
  );
};

export default EnterPage;