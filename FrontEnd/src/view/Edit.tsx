//編輯
//登入

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/CountDowm.css'; // 改用非模組化的 CSS
import '../style/Signup.css'
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
        const response = await axios.get('http://127.0.0.1:2004/api/v1/user/getUserDataByID', { params: { email, phone } });
        const { name, gender } = response.data as { name: string, gender: string };
        setName(name);
        setGender(gender);
      } catch (error) {
        console.error('獲取資料失敗:', error);
      }
    };

    if (email && phone) {
      fetchData();
    }
  }, [email, phone]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.put('hhttp://127.0.0.1:2004/api/v1/user/updateUserByID', { name, phone, gender, email });
      console.log('資料已更新:', response.data);
      alert('資料已更新');
      navigate('/Main'); // 跳轉到指定頁
    } catch (error) {
      console.error('更新資料失敗:', error);
      alert('更新資料失敗');
    }
  };



  function setEmail(value: string): void {
    throw new Error('Function not implemented.');
  }

  function setPhone(value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="container">


      <Helmet>
        <title>怕輸還不快跑</title>
      </Helmet>
      {/*<div className="blurBackground"></div>

      <div className="countdownSection">
        <div className="deadlineText">剩餘報名截止日期</div>
        <Countdown
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
        />
      </div> */}

      <h1 className="title">2025 TKU IM </h1>
      <h1 className="title">MARATHON </h1>
      {/*
      <div className="heroImage">
        <div className="sloganContainer">
          <div className="slogan">怕輸 ! 還不快跑</div>
          <div className="slogan2">怕輸 ! 還不快跑</div>
        </div>
      </div>
*/}
      <div className="heroImage"></div>

      <div className="box">


        <div className="boxText">
          編輯資料
        </div>

        <div className="form">
          <div className="form-group">
            <label>
              姓名：
              <input type="text" className="form-input" placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)} />
            </label>
          </div>

          <div className="form-group">
          <label>
            電話：
            <input type="text" className="form-input" placeholder=""
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled />
          </label>
          </div>
          
          <div className="form-group">
          <label>
            性別：
            <input type="text" className="form-input" placeholder="" 
             value={gender}
             onChange={(e) => setGender(e.target.value)}
           
            />
          </label>
          </div>

          <div className="form-group">
          <label>
            Email：
            <input type="email" className="form-input" placeholder="" 
            value={email}
             onChange={(e) => setEmail(e.target.value)}
             disabled/>
          </label>

          </div>
          <button type="submit" className="form-button"
          onClick={handleSubmit}>確定</button>






        </div>



      </div>






    </div>
  );
};

export default Edit;