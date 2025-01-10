//編輯

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 新增 useParams
import '../style/Signup.css'; // 改用非模組化的 CSS
import { Countdown } from '../view/CountDown';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { check } from '../utils/fetch';

interface UserData {
  name: string;
  phone: string;
  gender: string;
  email: string;
}

export const Edit: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00'); // 設定倒數目標日期
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // 取得使用者 ID
  const [userData, setUserData] = useState<UserData>({
    name: '',
    phone: '',
    gender: '',
    email: '',
  });

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
        navigate('/main'); // 替換為目標頁面的路徑
      }
    })

  },[])
  
  // 倒數計時功能
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

  // 查詢使用者資料
  interface ApiResponse {
    status: string;
    data: UserData;
  }
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`http://127.0.0.1:2004/api/v1/user/getUserDataByID/${id}`);
        setUserData(response.data.data); // 取出內部的 data
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
  
    if (id) {
      fetchUserData();
    }
  }, [id]);
  

  // 提交更新資料
  const handleUpdate = async () => {
    try {
      await axios.put(`http://127.0.0.1:2004/api/v1/user/updateUserByID/${id}`, userData);
      alert('使用者資料已成功更新');
      navigate('/Main');
    } catch (error) {
      console.error('Failed to update user data:', error);
      alert('更新失敗，請稍後再試');
    }
  };

  // 更新使用者輸入資料
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>

      <div className="countdownSection">
        <div className="deadlineText">剩餘報名截止日期</div>
        <Countdown
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
        />
      </div>

      <h1 className="title">2025 TKU IM </h1>
      <h1 className="title">MARATHON </h1>

      <div className="heroImage">
        <div className="sloganContainer">
          <div className="slogan">怕輸 ! 還不快跑</div>
          <div className="slogan2">怕輸 ! 還不快跑</div>
        </div>
      </div>

      <div className="flexContainer">
        <div className="flexContainerWord">報名</div>
      </div>
      <div className="box">
        <div className="boxWord">
          姓名：
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="boxWord2">
          電話：
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="boxWord3">
          性別：
          <input
            type="text"
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
          />
        </div>
        <div className="boxWord4">
          Email：
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>

        <button className="buttonsign" onClick={handleUpdate}>
          確定
        </button>

        <div className="boxLine"></div>
        <div className="boxLine2"></div>
        <div className="boxLine3"></div>
      </div>
    </div>
  );
};

export default Edit;
