import { useState, useEffect } from 'react';
import GoogleMap from '../components/Map';
import Loading from '../components/Loading';

export default function Home() {
  const humaansURL = process.env.REACT_APP_API_HUMAANS_URL;
  const humaansKey = process.env.REACT_APP_API_KEY_HUMAANS;
  const googleMapsKey = process.env.REACT_APP_API_KEY_GOOGLE_MAPS;

  const [employeesList, setEmployeesList] = useState([]);
  const [remoteEmployeesList, setRemoteEmployeesList] = useState([]);
  const [
    remoteEmployeesListLatLong,
    setRemoteEmployeesListLatLong,
  ] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllEmployees = async () => {
    setLoading(true);
    const res = await fetch(humaansURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + humaansKey,
      },
    });
    const { data } = await res.json();
    setEmployeesList(data);
    console.log('setEmployeesList');
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchAllEmployees();
  }, []);

  const getRemoteEmployees = () => {
    const remoteEmployees = employeesList.filter(
      (employee) => employee.locationId === 'remote'
    );
    setRemoteEmployeesList(remoteEmployees);
    console.log('setRemotes woithout lat');
  };

  useEffect(() => {
    setLoading(true);
    getRemoteEmployees();
  }, [employeesList]);

  const fetchEmployeeLatLng = async (employee) => {
    const res = await fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        employee.remoteCity +
        employee.remoteCountry +
        '&key=' +
        googleMapsKey
    );

    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    const { results } = await res.json();
    const updatedEmployee = { ...employee, location: results } 
    
    // console.log(updatedEmployee)
    setRemoteEmployeesListLatLong(oldArray => [...oldArray, updatedEmployee]);
    setLoading(false);
  };

  const getEmployeesLocation = () => {
    remoteEmployeesList.map(
      async (employee) => await fetchEmployeeLatLng(employee)
    );
  };

  useEffect(() => {
    getEmployeesLocation();
  }, [remoteEmployeesList]);

  return (
    <div>
      <h1>Where are your colleagues?</h1>
      <div>
        {!loading ? (
          <GoogleMap employeesList={remoteEmployeesListLatLong} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
