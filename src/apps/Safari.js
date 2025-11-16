import React, { useState } from 'react';

function Safari() {
  const [tabs, setTabs] = useState([{ id: 1, title: 'New Tab', url: '', content: 'Welcome to Safari' }]);
  const [activeTab, setActiveTab] = useState(1);
  const [address, setAddress] = useState('');

  const navigate = (url) => {
    const tab = tabs.find(t => t.id === activeTab);
    if (tab) {
      tab.url = url;
      tab.title = url.includes('google') ? 'Google' : url.includes('apple') ? 'Apple' : 'Web Page';
      tab.content = `<h1>${tab.title}</h1><p>Content for ${url}</p>`;
      setTabs([...tabs]);
    }
  };

  const addTab = () => {
    const newTab = { id: Date.now(), title: 'New Tab', url: '', content: 'New Tab' };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (tabId) => {
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="safari">
      <div className="safari-toolbar">
        <button>←</button>
        <button>→</button>
        <button>↻</button>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && navigate(address)}
          placeholder="Search or enter website name"
        />
        <button onClick={() => navigate(address)}>Go</button>
      </div>
      <div className="safari-tab-bar">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            <button onClick={() => closeTab(tab.id)}>×</button>
          </div>
        ))}
        <button onClick={addTab}>+</button>
      </div>
      <div className="safari-content">
        <div dangerouslySetInnerHTML={{ __html: currentTab ? currentTab.content : '' }} />
      </div>
    </div>
  );
}

export default Safari;