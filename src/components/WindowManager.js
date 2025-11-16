import React, { useState } from 'react';

function Window({ window: win, onClose, onMinimize, onMaximize, onFocus }) {
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [size, setSize] = useState({ width: win.width, height: win.height });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    onFocus(win.id);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: Math.max(22, e.clientY - dragStart.y)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (win.minimized) return null;

  return (
    <div
      className="window"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: win.zIndex || 1
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="window-header" onMouseDown={handleMouseDown}>
        <div className="window-controls">
          <div className="control red" onClick={() => onClose(win.id)}></div>
          <div className="control yellow" onClick={() => onMinimize(win.id)}></div>
          <div className="control green" onClick={() => onMaximize(win.id)}></div>
        </div>
        <div className="window-title">{win.title}</div>
      </div>
      <div className="window-content">
        {win.content}
      </div>
    </div>
  );
}

function WindowManager({ windows, onClose, onMinimize, onMaximize, onFocus }) {
  return (
    <div id="windows-container">
      {windows.map(win => (
        <Window
          key={win.id}
          window={win}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onFocus={onFocus}
        />
      ))}
    </div>
  );
}

export default WindowManager;