import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

function Window({ window: win, onClose, onMinimize, onMaximize, onFocus }) {
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [size, setSize] = useState({ width: win.width, height: win.height });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(win.maximized);
  const [originalBounds, setOriginalBounds] = useState({ position, size });

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    onFocus(win.id);
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: Math.max(22, e.clientY - dragStart.y)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResize = (event, { size: newSize }) => {
    if (!isMaximized) {
      setSize(newSize);
    }
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(originalBounds.position);
      setSize(originalBounds.size);
      setIsMaximized(false);
    } else {
      setOriginalBounds({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMaximized(true);
    }
    onMaximize(win.id);
  };

  if (win.minimized) return null;

  const windowStyle = {
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    zIndex: win.zIndex || 1
  };

  return (
    <Resizable
      width={size.width}
      height={size.height}
      onResize={handleResize}
      minConstraints={[300, 200]}
      maxConstraints={[window.innerWidth, window.innerHeight - 22]}
      handle={<div className="resize-handle" />}
    >
      <div
        className="window"
        style={windowStyle}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="window-header" onMouseDown={handleMouseDown}>
          <div className="window-controls">
            <div className="control red" onClick={() => onClose(win.id)}></div>
            <div className="control yellow" onClick={() => onMinimize(win.id)}></div>
            <div className="control green" onClick={handleMaximize}></div>
          </div>
          <div className="window-title">{win.title}</div>
        </div>
        <div className="window-content">
          {win.content}
        </div>
      </div>
    </Resizable>
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