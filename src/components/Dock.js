import React from 'react';

function Dock({ onOpenApp }) {
  const apps = [
    'finder',
    'safari',
    'calculator',
    'notes',
    'terminal',
    'settings'
  ];

  return (
    <div id="dock">
      {apps.map(app => (
        <div key={app} className="dock-item" onClick={() => onOpenApp(app)}>
          <img src={`/icons/${app}.png`} alt={app} />
        </div>
      ))}
    </div>
  );
}

export default Dock;