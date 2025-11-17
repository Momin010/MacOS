import React, { useState } from 'react';

function Maps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('San Francisco, CA');

  const searchLocation = () => {
    // Mock search
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="maps">
      <div className="maps-header">
        <input
          type="text"
          placeholder="Search for places"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
        />
        <button onClick={searchLocation}>Search</button>
      </div>
      <div className="maps-content">
        <div className="map-placeholder">
          <div className="map-grid">
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i} className="map-cell"></div>
            ))}
          </div>
          <div className="current-location">{currentLocation}</div>
        </div>
        <div className="maps-sidebar">
          <div className="directions">
            <h3>Directions</h3>
            <div className="route">
              <div className="step">Start at {currentLocation}</div>
              <div className="step">Head north on Main St</div>
              <div className="step">Turn left on Oak Ave</div>
              <div className="step">Arrive at destination</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maps;