//開發人員
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Mainpage.css';
import '../style/F12.css';
import { UseCountdown } from '../interface/UseCountdown';  // 引入 useCountdown
import { Countdown } from '../view/CountDown'; // 引入 Countdown 組件
import { Helmet } from 'react-helmet';

const navigationItems = [
    { text: '返回', path: '/main' },
];

export const F12usePage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
  const [participantNumber, setParticipantNumber] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [participantPhone, setParticipantPhone] = useState('');
  const [participantGender, setParticipantGender] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://你的API端點', {
        params: { name: inputValue }
      });
      const data = response.data as {
        participantNumber: string;
        participantName: string;
        participantPhone: string;
        participantGender: string;
        participantEmail: string;
      };
      setParticipantNumber(data.participantNumber);
      setParticipantName(data.participantName);
      setParticipantPhone(data.participantPhone);
      setParticipantGender(data.participantGender);
      setParticipantEmail(data.participantEmail);
    } catch (error) {
      console.error('查詢資料失敗:', error);
    }
  };


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
                <div className="heroImagF">
                    <div className="sloganContaineractivity">怕輸 ! 還不快跑</div>
                </div>
            </div>

            <div className="inputContainer">
                <input
                    type="text"
                    id="inputField"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="inputField"
                    placeholder="輸入參賽者姓名查詢"
                />
            </div>

            <div className="participantContainer">
                <div className="participantInfo">
                    <div className="participantNumber">參賽者編號: {participantNumber}</div>
                    <div className="participantName">姓名: {participantName}</div>
                    <div className="participantPhone">電話: {participantPhone}</div>
                    <div className="participantGender">性別: {participantGender}</div>
                    <div className="participantEmail">Email: {participantEmail}</div>
          
                </div>
            </div>
        </div>
    );
};

export default F12usePage;