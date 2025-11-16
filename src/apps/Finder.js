import React, { useState, useEffect } from 'react';

function Finder() {
  const [currentPath, setCurrentPath] = useState('/Users/user');
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // list or grid

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const loadDirectory = (path) => {
    // Mock file system
    const mockFiles = [
      { name: 'Desktop', type: 'folder', path: '/Users/user/Desktop' },
      { name: 'Documents', type: 'folder', path: '/Users/user/Documents' },
      { name: 'Downloads', type: 'folder', path: '/Users/user/Downloads' },
      { name: 'file1.txt', type: 'file', path: '/Users/user/file1.txt' },
      { name: 'file2.jpg', type: 'file', path: '/Users/user/file2.jpg' }
    ];
    setFiles(mockFiles);
  };

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setCurrentPath(item.path);
    } else {
      // Open file
      console.log('Open file:', item.name);
    }
  };

  const goBack = () => {
    const parts = currentPath.split('/');
    parts.pop();
    setCurrentPath(parts.join('/') || '/');
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="finder">
      <div className="finder-toolbar">
        <button onClick={goBack}>←</button>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
          {viewMode === 'list' ? 'Grid' : 'List'}
        </button>
      </div>
      <div className="finder-sidebar">
        <div className="sidebar-item" onClick={() => setCurrentPath('/Users/user')}>Home</div>
        <div className="sidebar-item" onClick={() => setCurrentPath('/Users/user/Desktop')}>Desktop</div>
        <div className="sidebar-item" onClick={() => setCurrentPath('/Users/user/Documents')}>Documents</div>
        <div className="sidebar-item" onClick={() => setCurrentPath('/Users/user/Downloads')}>Downloads</div>
      </div>
      <div className={`finder-content ${viewMode}`}>
        {filteredFiles.map((file, index) => (
          <div
            key={index}
            className={`finder-item ${file.type}`}
            onClick={() => handleItemClick(file)}
          >
            <div className="item-icon">{file.type === 'folder' ? '📁' : '📄'}</div>
            <div className="item-name">{file.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Finder;