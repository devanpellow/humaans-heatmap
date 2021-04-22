import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'


export default function Map({employeesList, center, zoom}) {


  console.log(employeesList)


  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS}}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <LocationMarker lat={55.688035} lng={12.5609429}/>
      </GoogleMapReact>
    </div>
  )
}

Map.defaultProps = {
  center: {
    lat: 55.688035,
    lng: 12.5609429,
  },
  zoom: 6
}