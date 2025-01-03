import React from 'react';
import '../style//MarathonBanner.css'; // 引入 CSS 檔案

const MarathonBanner: React.FC = () => {
  return (
    <div className="banner-container">
      <div className="banner-title">
        2025
        <br />
        TKU IM marathon
      </div>
      <div className="banner-subtitle">go</div>
    </div>
  );
};

export default MarathonBanner;
