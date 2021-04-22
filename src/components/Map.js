import {useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'


export default function Map({employeesList, center, zoom}) {

  const googleMapsKey = process.env.REACT_APP_API_KEY_GOOGLE_MAPS

  const [employeeListWithLatLng, setEmployeeListWithLatLng] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchEmployeeLatLng = async (employee) => {
    setLoading(true)
    const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + employee.remoteCity + employee.remoteCountry + '&key=' + googleMapsKey)
    const {results} = await res.json()   
    setLoading(false)
    return {...employee, results}
  }
  
  const getEmployeesLocation = () => {
    const employees = new Map([
      employeesList.map(employee => fetchEmployeeLatLng(employee))
    ])
    setEmployeeListWithLatLng(employees)
  }

  useEffect(() => {
    getEmployeesLocation()
  })


  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{key: googleMapsKey}}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* {employeeListWithLatLng && 
          employeeListWithLatLng.map(marker => <LocationMarker lat={marker} lng={marker}/>)
        }  */}
        
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