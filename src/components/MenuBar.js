import React, { useState, useEffect } from 'react';

function MenuBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="menu-bar">
      <div className="menu-item">Apple</div>
      <div className="menu-item">Finder</div>
      <div className="menu-item">File</div>
      <div className="menu-item">Edit</div>
      <div className="menu-item">View</div>
      <div className="menu-item">Go</div>
      <div className="menu-item">Window</div>
      <div className="menu-item">Help</div>
      <div className="right-menu">
        <div className="menu-item">Wi-Fi</div>
        <div className="menu-item">Battery</div>
        <div className="menu-item">{time}</div>
      </div>
    </div>
  );
}

export default MenuBar;