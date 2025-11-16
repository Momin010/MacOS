import React, { useState, useEffect } from 'react';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [albums, setAlbums] = useState(['All Photos', 'Recents', 'Favorites']);
  const [currentAlbum, setCurrentAlbum] = useState('All Photos');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    // Mock photos
    const mockPhotos = [
      { id: 1, src: 'https://via.placeholder.com/300x200', title: 'Photo 1', date: '2023-10-01', album: 'All Photos' },
      { id: 2, src: 'https://via.placeholder.com/300x200', title: 'Photo 2', date: '2023-10-02', album: 'All Photos' },
      { id: 3, src: 'https://via.placeholder.com/300x200', title: 'Photo 3', date: '2023-10-03', album: 'Favorites' }
    ];
    setPhotos(mockPhotos);
  }, []);

  const filteredPhotos = photos.filter(photo =>
    currentAlbum === 'All Photos' || photo.album === currentAlbum
  );

  return (
    <div className="photos">
      <div className="photos-sidebar">
        <div className="albums">
          {albums.map(album => (
            <div
              key={album}
              className={`album ${album === currentAlbum ? 'active' : ''}`}
              onClick={() => setCurrentAlbum(album)}
            >
              {album}
            </div>
          ))}
        </div>
      </div>
      <div className="photos-content">
        <div className="photos-toolbar">
          <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? 'List' : 'Grid'}
          </button>
        </div>
        <div className={`photos-${viewMode}`}>
          {filteredPhotos.map(photo => (
            <div
              key={photo.id}
              className="photo-item"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.src} alt={photo.title} />
              <div className="photo-info">
                <div className="photo-title">{photo.title}</div>
                <div className="photo-date">{photo.date}</div>
              </div>
            </div>
          ))}
        </div>
        {selectedPhoto && (
          <div className="photo-viewer">
            <img src={selectedPhoto.src} alt={selectedPhoto.title} />
            <div className="photo-details">
              <h2>{selectedPhoto.title}</h2>
              <p>Date: {selectedPhoto.date}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Photos;