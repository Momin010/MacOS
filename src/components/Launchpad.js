import React, { useState } from 'react';
import {
  FaSearch, FaCompass, FaCalculator, FaStickyNote, FaTerminal, FaCog,
  FaEnvelope, FaCamera, FaComments, FaCalendarAlt, FaBell, FaMap,
  FaMusic, FaTv, FaMicrophone, FaShoppingCart
} from 'react-icons/fa';

function Launchpad({ onOpenApp, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  const apps = [
    { name: 'finder', label: 'Finder', icon: <FaSearch /> },
    { name: 'safari', label: 'Safari', icon: <FaCompass /> },
    { name: 'calculator', label: 'Calculator', icon: <FaCalculator /> },
    { name: 'notes', label: 'Notes', icon: <FaStickyNote /> },
    { name: 'terminal', label: 'Terminal', icon: <FaTerminal /> },
    { name: 'settings', label: 'System Preferences', icon: <FaCog /> },
    { name: 'mail', label: 'Mail', icon: <FaEnvelope /> },
    { name: 'photos', label: 'Photos', icon: <FaCamera /> },
    { name: 'messages', label: 'Messages', icon: <FaComments /> },
    { name: 'calendar', label: 'Calendar', icon: <FaCalendarAlt /> },
    { name: 'reminders', label: 'Reminders', icon: <FaBell /> },
    { name: 'maps', label: 'Maps', icon: <FaMap /> },
    { name: 'music', label: 'Music', icon: <FaMusic /> },
    { name: 'tv', label: 'TV', icon: <FaTv /> },
    { name: 'podcasts', label: 'Podcasts', icon: <FaMicrophone /> },
    { name: 'appstore', label: 'App Store', icon: <FaShoppingCart /> }
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