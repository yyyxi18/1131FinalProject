//線上客服


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/CountDowm.css'; // 改用非模組化的 CSS
import '../style/Signup.css'
import { Helmet } from 'react-helmet';



export const LoginMainPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2025-07-24T00:00:00'); // 設定倒數目標日期
  const navigate = useNavigate();




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
    navigate('/main'); // 跳轉到指定頁
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
          
          線上客服
          <div></div>
          <button className='buttononline' onClick={handleAnotherButtonClick}>返回</button>
        </div>

        <div className="form">
          <div className="form-group">
            <div className='textonline'>
              小編鐵腿送醫休息三個禮拜 :)
            </div>
            
          </div>



        </div>





      </div>
    </div>
  );
};

export default LoginMainPage;