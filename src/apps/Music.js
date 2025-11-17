import React, { useState } from 'react';

function Music() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Song 1', artist: 'Artist 1', duration: '3:45' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', duration: '4:12' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', duration: '2:58' }
  ]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music">
      <div className="music-sidebar">
        <div className="library-sections">
          <div className="section">Recently Added</div>
          <div className="section">Artists</div>
          <div className="section">Albums</div>
          <div className="section">Songs</div>
          <div className="section">Playlists</div>
        </div>
      </div>
      <div className="music-content">
        <div className="songs-list">
          {playlist.map(song => (
            <div
              key={song.id}
              className={`song-item ${currentSong?.id === song.id ? 'playing' : ''}`}
              onClick={() => playSong(song)}
            >
              <div className="song-info">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
              <div className="song-duration">{song.duration}</div>
            </div>
          ))}
        </div>
        <div className="music-player">
          <div className="player-controls">
            <button>⏮</button>
            <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
            <button>⏭</button>
          </div>
          {currentSong && (
            <div className="current-song">
              <div className="song-title">{currentSong.title}</div>
              <div className="song-artist">{currentSong.artist}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Music;