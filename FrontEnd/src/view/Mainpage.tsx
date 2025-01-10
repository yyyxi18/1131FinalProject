import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Mainpage.css';
import { UseCountdown } from '../interface/UseCountdown'; // 引入 useCountdown
import { Countdown } from '../view/CountDown'; // 引入 Countdown 組件
import { Helmet } from 'react-helmet';

// 新增 User 型別
interface User {
  picture: string;
  family_name: string;
  given_name: string;
}

const navigationItems = [
  { text: '活動簡章', path: '/activity-details' },
  { text: '活動路線', path: '/route-map' },
  { text: '線上客服', path: '/online-service' },
];

export const Mainpage: React.FC = () => {
  const targetDate = new Date('2025-07-24T00:00:00');
  const timeLeft = UseCountdown(targetDate); // 使用自定義的 UseCountdown hook
  const navigate = useNavigate();

  // 新增 user 狀態
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 驗證 Google Token 並取得使用者資訊
      fetch('http://localhost:2004/api/v1/user/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser({
              picture: data.user.picture,
              family_name: data.user.family_name,
              given_name: data.user.given_name,
            });
          }
        })
        .catch((err) => console.error('驗證失敗:', err));
    }
  }, []);

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
            {/* 新增條件渲染：登入或顯示使用者資訊 */}
            {user ? (
              <div className="user-info">
                <img src={user.picture} alt="User Avatar" className="user-avatar" />
                <span className="user-name">{`${user.family_name} ${user.given_name}`}</span>
              </div>
            ) : (
              <Link to="/login" className="navLink">
                登入
              </Link>
            )}
          </nav>
        </div>
      </div>

      <div className="mid">
        <div className="heroImage2">
          <div className="sloganContainer">怕輸 ! 還不快跑</div>
        </div>
      </div>

      <div className="bottom">
        <div className="countdownSection">
          <div className="deadlineText">剩餘報名截止日期</div>
          {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
            <div className="countdownEnd">報名已截止</div>
          ) : (
            <Countdown hours={timeLeft.hours} minutes={timeLeft.minutes} seconds={timeLeft.seconds} />
          )}
        </div>

        <div className="actionButtons">
          <button
            className="registerButton"
            onClick={() => navigate('/signup')}
          >
            報名
          </button>
          <button
            className="modifyButton"
            onClick={() => navigate('/edit')}
          >
            修改與查詢
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
