import React, { useState } from 'react';

function AppStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Games', 'Productivity', 'Social', 'Entertainment'];
  const apps = [
    { id: 1, name: 'App 1', category: 'Games', price: 'Free', rating: 4.5 },
    { id: 2, name: 'App 2', category: 'Productivity', price: '$4.99', rating: 4.8 },
    { id: 3, name: 'App 3', category: 'Social', price: 'Free', rating: 4.2 }
  ];

  const filteredApps = apps.filter(app =>
    (selectedCategory === 'All' || app.category === selectedCategory) &&
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="appstore">
      <div className="appstore-header">
        <input
          type="text"
          placeholder="Search apps"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={cat === selectedCategory ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="apps-grid">
        {filteredApps.map(app => (
          <div key={app.id} className="app-card">
            <div className="app-icon">📱</div>
            <div className="app-info">
              <div className="app-name">{app.name}</div>
              <div className="app-category">{app.category}</div>
              <div className="app-rating">⭐ {app.rating}</div>
            </div>
            <button className="download-btn">
              {app.price === 'Free' ? 'Get' : app.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppStore;