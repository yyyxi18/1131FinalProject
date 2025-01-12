import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Mainpage.css';
import '../style/Activity.css';
import { UseCountdown } from '../interface/UseCountdown';  // 引入 useCountdown
import { Countdown } from '../view/CountDown'; // 引入 Countdown 組件
import { Helmet } from 'react-helmet';

const navigationItems = [
  { text: '主頁', path: '/main' },
  { text: '活動簡章', path: '/activity' },
  { text: '活動路線', path: '/map' },
  { text: '線上客服', path: '/onlineService' },
  { text: '登入', path: '/login' },
];

export const ActivityPage: React.FC = () => {
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
        <div className="heroImageactivity">
          <div className="sloganContaineractivity">怕輸 ! 還不快跑</div>

        </div>
      </div>

      <div className="bottom">
        <div className="countdownSectionactivity">
          <div className="deadlineText">剩餘報名截止日期</div>
          {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
            <div className="countdownEnd">報名已截止</div>
          ) : (
            //countdow
            <Countdown hours={timeLeft.hours} minutes={timeLeft.minutes} seconds={timeLeft.seconds} />
          )}
        </div>

        <div className="boxT">

          <div className='textactivity'>
            活動宗旨

          </div>
          <div className='textactivity2'>
          輸在起跑點，還不跑起來！還要等裁判來提醒你輸得有多徹底？跑步<br/>
          還不如人生輕鬆，人生至少可以坐下來罵天罵地，跑步只能一路罵自己的膝<br/>
          蓋。記住，這場馬拉松的意義不是完成，而是讓你重新認識膝蓋、腳趾頭<br/>
          和肺，它們在用疼痛提醒你：<span className="underlineHighlight">老子不幹了！</span>
          </div>
<div className='textactivity2'>
7月24日是國際笑話日，就跟你的人生一樣！為了讓各位重新證明自己<br/>
不是笑話,我們準備了一場屬於輸家的比賽！等你來參加。<br/>
我們．．．
</div>
<div className='textactivity3'>
不見不散
</div>
          <button
            className="activitybutton"
            onClick={() => navigate('/signup')} >

            報名
          </button>

        </div>
      </div>

    </div>
  );
};

export default ActivityPage;

