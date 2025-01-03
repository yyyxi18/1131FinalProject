import React from 'react';
// 引入本地图片
import Frame from '../assets/Frame.png';


const MarathonBanner: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundImage: `url(${Frame})`, // 使用本地图片变量
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          width: 678,
          height: 115,
          color: '#FFFBFB',
          fontSize: 128,
          fontFamily: 'Anton SC',
          fontWeight: 400,
          lineHeight: '120%',
          wordWrap: 'break-word',
        }}
      >
        2025
        <br />
        TKU IM marathon
      </div>
      <div
        style={{
          width: 72,
          height: 96,
          color: 'white',
          fontSize: 64,
          fontFamily: 'Anton SC',
          fontWeight: 400,
          lineHeight: '120%',
          wordWrap: 'break-word',
        }}
      >
        go
      </div>
    </div>
  );
};

export default MarathonBanner;
