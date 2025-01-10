import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Mainpage.css';
import '../style/Map.css';
import { UseCountdown } from '../interface/UseCountdown';  // 引入 useCountdown
import { Countdown } from '../view/CountDown'; // 引入 Countdown 組件
import { Helmet } from 'react-helmet';
import additionalImage from '../assets/map.png'; // 使用 import 引入圖片

const navigationItems = [
  { text: '活動簡章', path: '/activity' },
  { text: '活動路線', path: '/map' },
  { text: '線上客服', path: '/onlineService' },
  { text: '登入', path: '/login' },
];

export const MapPage: React.FC = () => {
  const targetDate = new Date('2025-07-24T00:00:00');
  const timeLeft = UseCountdown(targetDate);  // 使用自定義的 UseCountdown hook
  const navigate = useNavigate();

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
        <div className="heroImagemap">
          <div className="sloganContaineractivity">怕輸 ! 還不快跑</div>
        </div>
      </div>

      <div className="bottom">
        <div className="countdownSectionmap">
          <div className="deadlineText">剩餘報名截止日期</div>
          {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
            <div className="countdownEnd">報名已截止</div>
          ) : (
            <Countdown hours={timeLeft.hours} minutes={timeLeft.minutes} seconds={timeLeft.seconds} />
          )}
          <button
            className="mapbutton"
            onClick={() => navigate('/signup')} >
            報名
          </button>
        </div>

        <div className="boxTMap">
          <div className='textmap'>
            活動路線
          </div>
          
          <div className="additionalImageContainer">
            <img src={additionalImage} alt="Additional" className="additionalImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;