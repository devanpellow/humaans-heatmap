import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import MarkerInfoBox from './MarkerInfoBox';

export default function GoogleMap({ employeesList, center, zoom }) {
  const googleMapsKey = process.env.REACT_APP_API_KEY_GOOGLE_MAPS;
  const [markerInfo, setMarkerInfo] = useState(null);

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapsKey }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {employeesList &&
          employeesList.map((marker) => (
            <LocationMarker
              key={marker.id}
              lat={marker.location[0].geometry.location.lat}
              lng={marker.location[0].geometry.location.lng}
              src={marker.profilePhoto.variants[64]}
              onClick={() => setMarkerInfo(marker)}
            />
          ))}

        <LocationMarker lat={55.688035} lng={12.5609429} />
      </GoogleMapReact>
      {markerInfo && <MarkerInfoBox info={markerInfo} />}
    </div>
  );
}

GoogleMap.defaultProps = {
  center: {
    lat: 36.7212,
    lng: 4.4217,
  },
  zoom: 1,
};
