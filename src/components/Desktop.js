import React from 'react';
import LazyLoad from 'react-lazyload';

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
          <LazyLoad height={48} offset={100}>
            <img src={`/icons/${app.name}.png`} alt={app.label} loading="lazy" />
          </LazyLoad>
          <span>{app.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Desktop;