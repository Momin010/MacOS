import React, { useState } from 'react';

function Settings() {
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = [
    { id: 'general', name: 'General' },
    { id: 'desktop', name: 'Desktop & Screen Saver' },
    { id: 'dock', name: 'Dock' },
    { id: 'display', name: 'Displays' },
    { id: 'sound', name: 'Sound' },
    { id: 'network', name: 'Network' }
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'general':
        return (
          <div>
            <h2>General</h2>
            <div className="setting-item">
              <label>Appearance:</label>
              <select>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
        );
      case 'dock':
        return (
          <div>
            <h2>Dock</h2>
            <div className="setting-item">
              <label>Size:</label>
              <input type="range" min="16" max="128" />
            </div>
            <div className="setting-item">
              <label>Position:</label>
              <select>
                <option>Bottom</option>
                <option>Left</option>
                <option>Right</option>
              </select>
            </div>
          </div>
        );
      default:
        return <div>Select a category</div>;
    }
  };

  return (
    <div className="settings">
      <div className="settings-sidebar">
        {categories.map(cat => (
          <div
            key={cat.id}
            className={`category ${cat.id === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </div>
        ))}
      </div>
      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Settings;