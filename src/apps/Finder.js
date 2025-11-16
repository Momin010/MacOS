// Expanded Finder App with enhanced UI and more code
import React, { useState, useEffect, useRef } from 'react';

function Finder() {
  const [currentPath, setCurrentPath] = useState('/Users/user');
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedItems, setSelectedItems] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showHidden, setShowHidden] = useState(false);
  const [favorites, setFavorites] = useState(['/Users/user/Desktop', '/Users/user/Documents']);
  const [recentFolders, setRecentFolders] = useState(['/Users/user/Downloads']);
  const [clipboard, setClipboard] = useState(null);
  const [isCut, setIsCut] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath, sortBy, sortOrder, showHidden]);

  const loadDirectory = (path) => {
    // Mock file system with more details
    const mockFiles = [
      { name: 'Desktop', type: 'folder', path: '/Users/user/Desktop', size: '-', modified: '2023-10-01', permissions: 'drwxr-xr-x', owner: 'user' },
      { name: 'Documents', type: 'folder', path: '/Users/user/Documents', size: '-', modified: '2023-10-01', permissions: 'drwxr-xr-x', owner: 'user' },
      { name: 'Downloads', type: 'folder', path: '/Users/user/Downloads', size: '-', modified: '2023-10-01', permissions: 'drwxr-xr-x', owner: 'user' },
      { name: 'Pictures', type: 'folder', path: '/Users/user/Pictures', size: '-', modified: '2023-10-01', permissions: 'drwxr-xr-x', owner: 'user' },
      { name: 'Music', type: 'folder', path: '/Users/user/Music', size: '-', modified: '2023-10-01', permissions: 'drwxr-xr-x', owner: 'user' },
      { name: 'Movies', type: 'folder', path: '/Users/user/Movies', size: '-', modified: '2023-10-01', permissions: 'drwxr-xr-x', owner: 'user' },
      { name: 'file1.txt', type: 'file', path: '/Users/user/file1.txt', size: '1.2 KB', modified: '2023-10-05', permissions: '-rw-r--r--', owner: 'user' },
      { name: 'file2.jpg', type: 'file', path: '/Users/user/file2.jpg', size: '2.5 MB', modified: '2023-10-03', permissions: '-rw-r--r--', owner: 'user' },
      { name: 'presentation.pdf', type: 'file', path: '/Users/user/presentation.pdf', size: '5.1 MB', modified: '2023-10-02', permissions: '-rw-r--r--', owner: 'user' },
      { name: '.hidden_file', type: 'file', path: '/Users/user/.hidden_file', size: '512 B', modified: '2023-10-01', permissions: '-rw-------', owner: 'user', hidden: true }
    ];

    let filteredFiles = mockFiles;
    if (!showHidden) {
      filteredFiles = filteredFiles.filter(f => !f.hidden);
    }

    // Sort files
    filteredFiles.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === 'size') {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      } else if (sortBy === 'modified') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFiles(filteredFiles);
  };

  const handleItemClick = (item, event) => {
    if (event.ctrlKey || event.metaKey) {
      // Multi-select
      if (selectedItems.includes(item.name)) {
        setSelectedItems(selectedItems.filter(i => i !== item.name));
      } else {
        setSelectedItems([...selectedItems, item.name]);
      }
    } else {
      setSelectedItems([item.name]);
    }

    if (event.detail === 2) {
      // Double click
      if (item.type === 'folder') {
        setCurrentPath(item.path);
        setRecentFolders([item.path, ...recentFolders.slice(0, 4)]);
      } else {
        // Open file
        console.log('Open file:', item.name);
      }
    }
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      item: item
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const goBack = () => {
    const parts = currentPath.split('/');
    parts.pop();
    setCurrentPath(parts.join('/') || '/');
  };

  const goForward = () => {
    // Implement forward history
  };

  const goUp = () => {
    goBack();
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const sortFiles = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const toggleHiddenFiles = () => {
    setShowHidden(!showHidden);
  };

  const addToFavorites = (path) => {
    if (!favorites.includes(path)) {
      setFavorites([...favorites, path]);
    }
  };

  const removeFromFavorites = (path) => {
    setFavorites(favorites.filter(f => f !== path));
  };

  const copyItems = () => {
    setClipboard(selectedItems);
    setIsCut(false);
  };

  const cutItems = () => {
    setClipboard(selectedItems);
    setIsCut(true);
  };

  const pasteItems = () => {
    if (clipboard) {
      // Implement paste logic
      console.log('Pasting:', clipboard, isCut ? 'cut' : 'copy');
      setClipboard(null);
      setIsCut(false);
    }
  };

  const deleteItems = () => {
    if (selectedItems.length > 0 && window.confirm(`Delete ${selectedItems.length} items?`)) {
      // Implement delete logic
      console.log('Deleting:', selectedItems);
      setSelectedItems([]);
    }
  };

  const renameItem = (oldName, newName) => {
    // Implement rename logic
    console.log('Renaming:', oldName, 'to', newName);
    setIsRenaming(null);
    setNewName('');
  };

  const startRename = (item) => {
    setIsRenaming(item.name);
    setNewName(item.name);
  };

  const finishRename = () => {
    if (isRenaming && newName.trim()) {
      renameItem(isRenaming, newName.trim());
    }
  };

  const createNewFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      // Implement create folder logic
      console.log('Creating folder:', folderName);
      loadDirectory(currentPath);
    }
  };

  const uploadFiles = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    // Implement file upload logic
    console.log('Uploading files:', files);
  };

  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(p => p);
    return parts.map((part, index) => ({
      name: part,
      path: '/' + parts.slice(0, index + 1).join('/')
    }));
  };

  const navigateToBreadcrumb = (path) => {
    setCurrentPath(path);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="finder" onClick={closeContextMenu}>
      <div className="finder-toolbar">
        <button onClick={goBack} title="Back">←</button>
        <button onClick={goForward} title="Forward" disabled>→</button>
        <button onClick={goUp} title="Up">↑</button>
        <div className="breadcrumb">
          {getBreadcrumbs().map((crumb, index) => (
            <span key={index}>
              <button onClick={() => navigateToBreadcrumb(crumb.path)}>{crumb.name}</button>
              {index < getBreadcrumbs().length - 1 && ' > '}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={toggleViewMode}>
          {viewMode === 'grid' ? 'List' : 'Grid'}
        </button>
        <select value={sortBy} onChange={(e) => sortFiles(e.target.value)}>
          <option value="name">Name</option>
          <option value="size">Size</option>
          <option value="modified">Date Modified</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <label>
          <input type="checkbox" checked={showHidden} onChange={toggleHiddenFiles} />
          Show Hidden Files
        </label>
        <button onClick={createNewFolder}>New Folder</button>
        <button onClick={uploadFiles}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileUpload}
        />
      </div>
      <div className="finder-main">
        <div className="finder-sidebar">
          <div className="sidebar-section">
            <h4>Favorites</h4>
            {favorites.map(fav => (
              <div
                key={fav}
                className={`sidebar-item ${fav === currentPath ? 'active' : ''}`}
                onClick={() => setCurrentPath(fav)}
              >
                📁 {fav.split('/').pop()}
              </div>
            ))}
          </div>
          <div className="sidebar-section">
            <h4>Recent</h4>
            {recentFolders.map(folder => (
              <div
                key={folder}
                className="sidebar-item"
                onClick={() => setCurrentPath(folder)}
              >
                🕒 {folder.split('/').pop()}
              </div>
            ))}
          </div>
          <div className="sidebar-section">
            <h4>Devices</h4>
            <div className="sidebar-item">💻 MacBook Pro</div>
            <div className="sidebar-item">💾 External Drive</div>
          </div>
        </div>
        <div className={`finder-content ${viewMode}`}>
          {filteredFiles.map((file, index) => (
            <div
              key={index}
              className={`finder-item ${file.type} ${selectedItems.includes(file.name) ? 'selected' : ''} ${isRenaming === file.name ? 'renaming' : ''}`}
              onClick={(e) => handleItemClick(file, e)}
              onContextMenu={(e) => handleContextMenu(e, file)}
              onDoubleClick={(e) => handleItemClick(file, e)}
            >
              {isRenaming === file.name ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onBlur={finishRename}
                  onKeyPress={(e) => e.key === 'Enter' && finishRename()}
                  autoFocus
                />
              ) : (
                <>
                  <div className="item-icon">
                    {file.type === 'folder' ? '📁' : file.name.endsWith('.jpg') || file.name.endsWith('.png') ? '🖼️' : file.name.endsWith('.pdf') ? '📄' : '📄'}
                  </div>
                  <div className="item-name">{file.name}</div>
                  {viewMode === 'list' && (
                    <div className="item-details">
                      <span>{file.size}</span>
                      <span>{file.modified}</span>
                      <span>{file.permissions}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div onClick={() => startRename(contextMenu.item)}>Rename</div>
          <div onClick={copyItems}>Copy</div>
          <div onClick={cutItems}>Cut</div>
          <div onClick={pasteItems}>Paste</div>
          <div onClick={deleteItems}>Delete</div>
          <div onClick={() => addToFavorites(contextMenu.item.path)}>Add to Favorites</div>
        </div>
      )}
    </div>
  );
}
export default Finder;