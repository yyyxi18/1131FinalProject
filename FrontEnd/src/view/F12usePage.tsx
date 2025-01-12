//開發人員
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../style/Mainpage.css';
import '../style/F12.css';
//import { UseCountdown } from '../interface/UseCountdown';  // 引入 useCountdown
//import { Countdown } from '../view/CountDown'; // 引入 Countdown 組件
import { Helmet } from 'react-helmet';

const navigationItems = [
    { text: '返回', path: '/main' },
];

export const F12usePage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    const [participants, setParticipants] = useState<
        {
            no: string;
            name: string;
            phone: string;
            gender: string;
            email: string;
        }[]
    >([]);
    const handleFetchAllParticipants = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:2004/api/v1/admin/getAll`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.body);
            setParticipants(data.body);
        } catch (error) {
            console.error('獲取資料失敗:', error);
        }
    };
    useEffect(() => {
        handleFetchAllParticipants();
    }, []);

    const handleSearchParticipant = async (name: string) => {
        try {
            console.log(participants);
            const response = await fetch(`http://127.0.0.1:2004/api/v1/admin/getPersonByID?id=${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // 將查詢結果顯示到畫面上，這裡假設 API 僅返回單一物件。
            setParticipants([data]);
        } catch (error) {
            setError('查詢失敗:', error);
            console.error('查詢失敗:', error);
        }
    };

    function setError(arg0: string, error: unknown) {
        throw new Error('Function not implemented.');
    }

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
                <div className="F12button">
                    <button className="F12text" onClick={() => handleSearchParticipant(inputValue)}>
                        查詢
                    </button>
                </div>
            </div>


            <div className="participantGrid">
                {participants.map((participant, index) => (
                    <div className="participantCard" key={index}>
                        <div className="participantNumber">參賽者編號: {participant.no}</div>
                        <div className="participantName">姓名: {participant.name}</div>
                        <div className="participantPhone">電話: {participant.phone}</div>
                        <div className="participantGender">性別: {participant.gender}</div>
                        <div className="participantEmail">Email: {participant.email}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default F12usePage;



