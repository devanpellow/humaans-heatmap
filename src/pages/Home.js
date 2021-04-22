import { useState, useEffect } from 'react';
import Map from '../components/Map';
import Loading from '../components/Loading';

export default function Home() {
  const [employeesList, setEmployeesList] = useState([]);
  const [remoteEmployeesList, setRemoteEmployeesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllEmployees = async () => {
    setLoading(true);
    const res = await fetch(process.env.REACT_APP_API_HUMAANS_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_API_KEY_HUMAANS,
      },
    });
    const { data } = await res.json();
    setEmployeesList(data);
    getRemoteEmployees()
    setLoading(false);
  };

  const getRemoteEmployees = () => {
    const remoteEmployees = employeesList.filter(
      (employee) => employee.remoteCity !== null
    );
    setRemoteEmployeesList(remoteEmployees);
  };

  useEffect(() => {
    setLoading(true);
    // add timeout so the Pleo gif plays at least one cycle
    fetchAllEmployees();
  }, []);


  return (
    <div>
      <h1>Where are your colleagues?</h1>
      <div>
        {!loading ? <Map employeesList={remoteEmployeesList} /> : <Loading />}
      </div>
    </div>
  );
}
