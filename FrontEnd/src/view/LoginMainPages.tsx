//登入

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/CountDowm.css'; // 改用非模組化的 CSS
import '../style/Signup.css';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


export const LoginMainPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00'); // 設定倒數目標日期
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (response: any) => {
    console.log('Google Login Success:', response);

    const handleGoogleLoginSuccess = async (response: any) => {
      console.log('Google Login Success:', response);
      /**
       * 保存jwt
       */
      localStorage.setItem("token",response.credential)
      try {
        // 假設 response.credential 包含 Google 返回的 JWT Token
        const res = await axios.post('http://localhost:2004/api/v1/user/check', {
          /**
           * response.credential => jwt
           * 持久化
           * localstorge
           */
          token: response.credential,
        });
    
        console.log('API 回應:', res.data);
    
        // 登入成功後跳轉至主頁面
        navigate('/Mainpage');
      } catch (error) {
        console.error('Google 登入 API 發送失敗:', error);
      }
    };

    try {
      // 假設 response.credential 包含 Google 返回的 JWT Token
      const res = await axios.post('http://127.0.0.1:2004/google/callback', {
        token: response.credential,
      });

      console.log('API 回應:', res.data);

      // 登入成功後跳轉至主頁面
      navigate('/Mainpage');
    } catch (error) {
      console.error('Google 登入 API 發送失敗:', error);
    }
  };


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


  // 跳轉到其他頁面
  const handleAnotherButtonClick = () => {
    navigate('/Main'); // 跳轉到指定頁
  };
  const handleuserButtonClick = () => {
    navigate('/user'); // 跳轉到指定頁
  };


  function handleGoogleLoginFailure(): void {
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
          登入
        </div>
        <div className="festlogin">


          <div className="loginText">
            快速登入
          </div>



          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />



          <div className="buttonContainer">
            <button className="Loginbutton" onClick={handleAnotherButtonClick}>
              訪客登入
            </button>

            <button className="Loginbutton" onClick={handleuserButtonClick}>
              開發人員登入
            </button>
            </div>
        </div>
      </div>
    </div>








        );
};

        export default LoginMainPage;