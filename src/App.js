import React, { useState, useEffect } from 'react';
import MenuBar from './components/MenuBar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import WindowManager from './components/WindowManager';
import Finder from './apps/Finder';
import Safari from './apps/Safari';
import Calculator from './apps/Calculator';
import Notes from './apps/Notes';
import Terminal from './apps/Terminal';
import Settings from './apps/Settings';
import Launchpad from './components/Launchpad';
import Mail from './apps/Mail';
import Photos from './apps/Photos';
import Messages from './apps/Messages';

function App() {
  const [windows, setWindows] = useState([]);
  const [activeApp, setActiveApp] = useState(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);

  const openApp = (appName) => {
    setActiveApp(appName);
    // Create window for the app
    const windowId = `window-${Date.now()}`;
    const newWindow = {
      id: windowId,
      title: appName,
      content: getAppComponent(appName),
      x: 100 + windows.length * 50,
      y: 100 + windows.length * 50,
      width: 600,
      height: 400,
      minimized: false,
      maximized: false
    };
    setWindows(prev => [...prev, newWindow]);
  };

  const getAppComponent = (appName) => {
    switch (appName) {
      case 'finder':
        return <Finder />;
      case 'safari':
        return <Safari />;
      case 'calculator':
        return <Calculator />;
      case 'notes':
        return <Notes />;
      case 'terminal':
        return <Terminal />;
      case 'settings':
        return <Settings />;
      case 'mail':
        return <Mail />;
      case 'photos':
        return <Photos />;
      case 'messages':
        return <Messages />;
      default:
        return <div>App not found</div>;
    }
  };

  const closeWindow = (windowId) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, minimized: !w.minimized } : w
    ));
  };

  const maximizeWindow = (windowId) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, maximized: !w.maximized } : w
    ));
  };

  const focusWindow = (windowId) => {
    // Bring to front
  };

  return (
    <div className="App">
      <MenuBar />
      <Desktop onOpenApp={openApp} />
      <Dock onOpenApp={openApp} onToggleLaunchpad={() => setShowLaunchpad(!showLaunchpad)} />
      <WindowManager
        windows={windows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        onFocus={focusWindow}
      />
      {showLaunchpad && (
        <Launchpad
          onOpenApp={openApp}
          onClose={() => setShowLaunchpad(false)}
        />
      )}
    </div>
  );
}

export default App;