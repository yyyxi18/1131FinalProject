//報名
//還沒連資料庫

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Signup.css'; // 改用非模組化的 CSS
import { Countdown } from '../view/CountDown';
import { Helmet } from 'react-helmet';


export const SignupPage: React.FC = () => {
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
    navigate('/Main'); // 跳轉到指定頁
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
        <div className=".flexContainerWord">
            報名
        </div>
      </div>
      <div className="box">
       <div className=".boxWord">
        姓名：
       </div>
       <div className=".boxWord2">
        電話：
       </div>
       <div className=".boxWord3">
        性別：
       </div>
       <div className=".boxWord4">
        email：
        </div>

        <button className=".buttonsign " onClick={handleAnotherButtonClick}>
          報名
        </button>


        <div className="boxLine"></div>
        <div className="boxLine2"></div>
        <div className="boxLine3"></div>
      </div>
    </div>
  );
};

export default SignupPage ;
