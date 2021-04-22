import React from 'react';

export default function MarkerInfoBox( {info} ) {
  
  return (
    <div className="location-info">
      <h2>{info.firstName}</h2>
    </div>
  );
}
