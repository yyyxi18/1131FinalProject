//進入頁
import React, { useEffect } from 'react';
import '../style/Enter.css'; // 引入 CSS 檔案
import { useNavigate } from 'react-router-dom'; // React Router 的導航 hook
import { check } from '../utils/fetch';

const EnterPage: React.FC = () => {
  const navigate = useNavigate(); // 用於導航到下一頁

  const handleGoClick = () => {
    navigate('/login'); // 替換為目標頁面的路徑
  };

  useEffect(()=>{

    /**
     * 先檢查有無登入
     */
    check().then(info=>{
      if (info.user == null) {
        /**
         * 沒有登入
         */
        alert("先登入")
        navigate('/login'); // 替換為目標頁面的路徑
      }else{
        /**
         * 有登入
         */
        navigate('/enter'); // 替換為目標頁面的路徑
      }
    })

  },[])

  return (
    <div className="enterPageContainer">
      <button className="go-word" onClick={handleGoClick}>
        Go
      </button>
    </div>
  );
};

export default EnterPage;