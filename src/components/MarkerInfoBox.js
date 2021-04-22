import React from 'react';

export default function MarkerInfoBox({ info }) {
  return (
    <div className="location-info">
      <img src={info.profilePhoto.variants[156]} alt="employee" />
      <div className="info">
        <h2>{info.firstName}</h2>
        <h4>
          📍 {info.remoteCity}, {info.remoteCountry}
        </h4>
        <p>🎂 {info.shortBirthday}</p>
      </div>
    </div>
  );
}
