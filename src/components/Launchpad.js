import React, { useState } from 'react';

function Launchpad({ onOpenApp, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  const apps = [
    { name: 'finder', label: 'Finder', icon: '🔍' },
    { name: 'safari', label: 'Safari', icon: '🌐' },
    { name: 'calculator', label: 'Calculator', icon: '🧮' },
    { name: 'notes', label: 'Notes', icon: '📝' },
    { name: 'terminal', label: 'Terminal', icon: '💻' },
    { name: 'settings', label: 'System Preferences', icon: '⚙️' },
    { name: 'mail', label: 'Mail', icon: '✉️' },
    { name: 'photos', label: 'Photos', icon: '📸' },
    { name: 'messages', label: 'Messages', icon: '💬' },
    { name: 'calendar', label: 'Calendar', icon: '📅' },
    { name: 'reminders', label: 'Reminders', icon: '🔔' },
    { name: 'maps', label: 'Maps', icon: '🗺️' },
    { name: 'music', label: 'Music', icon: '🎵' },
    { name: 'tv', label: 'TV', icon: '📺' },
    { name: 'podcasts', label: 'Podcasts', icon: '🎙️' },
    { name: 'appstore', label: 'App Store', icon: '🛒' }
  ];

  const filteredApps = apps.filter(app =>
    app.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="launchpad-overlay" onClick={onClose}>
      <div className="launchpad" onClick={(e) => e.stopPropagation()}>
        <div className="launchpad-header">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="launchpad-search"
          />
        </div>
        <div className="launchpad-grid">
          {filteredApps.map(app => (
            <div
              key={app.name}
              className="launchpad-item"
              onClick={() => {
                onOpenApp(app.name);
                onClose();
              }}
            >
              <div className="launchpad-icon">{app.icon}</div>
              <div className="launchpad-label">{app.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Launchpad;