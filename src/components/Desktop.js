import React from 'react';

function Desktop({ onOpenApp }) {
  const apps = [
    { name: 'finder', label: 'Finder' },
    { name: 'safari', label: 'Safari' },
    { name: 'calculator', label: 'Calculator' },
    { name: 'notes', label: 'Notes' },
    { name: 'terminal', label: 'Terminal' },
    { name: 'settings', label: 'System Preferences' }
  ];

  return (
    <div id="desktop">
      {apps.map(app => (
        <div key={app.name} className="desktop-icon" onClick={() => onOpenApp(app.name)}>
          <img src={`/icons/${app.name}.png`} alt={app.label} />
          <span>{app.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Desktop;