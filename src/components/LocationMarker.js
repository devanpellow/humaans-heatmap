import React from 'react';

export default function LocationMarker({ onClick, src }) {
  return (
    <div className="" onClick={onClick}>
      <img className="location-marker" src={src} alt="pleo office" />
    </div>
  );
}

LocationMarker.defaultProps = {
  src: '/assets/pleo-logo.jpeg',
};
