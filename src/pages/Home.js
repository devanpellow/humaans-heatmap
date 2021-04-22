import { useState, useEffect } from 'react';
import Map from '../components/Map';
import Loading from '../components/Loading';

export default function Home() {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchEmployees = async () => {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_API_HUMAANS_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.REACT_APP_API_KEY_HUMAANS,
        },
      });
      const { data } = await res.json();
      setEmployeeData(data);
      setLoading(false);
    };
    setTimeout(fetchEmployees, 3000);
  }, []);

  console.log({ employeeData });
  return (
    <div>
      <h1>Where are your colleagues?</h1>
      <div>{!loading ? <Map /> : <Loading />}</div>
    </div>
  );
}
