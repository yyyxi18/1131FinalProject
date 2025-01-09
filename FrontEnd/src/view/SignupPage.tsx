<<<<<<< HEAD
//報名
//已連後端
import axios from 'axios';
=======
//登入

>>>>>>> bd54849c4854727dc88db86f0d835fa0b5290f53
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/CountDowm.css'; // 改用非模組化的 CSS
import '../style/Signup.css'
import { Helmet } from 'react-helmet';

const handleSignup = async (name: string, phone: string, gender: string, email: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:2004/api/v1/user/addPerson', {
      name,
      phone,
      gender,
      email,
    });
    console.log('Signup successful:', response.data);
  } catch (error) {
    console.error('Error during signup:', error);
  }
};


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

<<<<<<< HEAD

=======
>>>>>>> bd54849c4854727dc88db86f0d835fa0b5290f53

  // 跳轉到其他頁面
  const handleAnotherButtonClick = () => {
    navigate('/Main'); // 跳轉到指定頁
  };

<<<<<<< HEAD
=======
  function handleGoogleLoginFailure(): void {
    throw new Error('Function not implemented.');
  }
>>>>>>> bd54849c4854727dc88db86f0d835fa0b5290f53

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

<<<<<<< HEAD

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
=======
      <div className="box">


        <div className="boxText">
          報名
        </div>

        <div className="form">
          <div className="form-group">
            <label>
              姓名：
              <input type="text" className="form-input" placeholder="輸入您的姓名" />
            </label>
          </div>

          <div className="form-group">
          <label>
            電話：
            <input type="text" className="form-input" placeholder="輸入您的電話" />
          </label>
          </div>
          
          <div className="form-group">
          <label>
            性別：
            <input type="text" className="form-input" placeholder="輸入您的性別" />
          </label>
          </div>

          <div className="form-group">
          <label>
            Email：
            <input type="email" className="form-input" placeholder="輸入您的 Email" />
          </label>

          </div>
          <button type="submit" className="form-button"
          onClick={handleAnotherButtonClick}>報名</button>






>>>>>>> bd54849c4854727dc88db86f0d835fa0b5290f53
        </div>



      </div>






    </div>
  );
};

<<<<<<< HEAD
export default SignupPage;
=======
export default LoginMainPage;
>>>>>>> bd54849c4854727dc88db86f0d835fa0b5290f53
