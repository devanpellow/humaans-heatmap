import React from 'react';

export default function LocationMarker({ lat, lng, onClick }) {
  return (
    <div className="location-marker" onClick={onClick}>
      <img className="location-marker" src="/assets/pleo-logo.jpeg" alt="pleo office" />
    </div>
  );
}
