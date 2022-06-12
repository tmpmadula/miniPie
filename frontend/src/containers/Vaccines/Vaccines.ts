import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import AlertDismis from '../../components/AlertDismis';

function Vaccines() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [vaccines, setVaccines] = useState({
        administered: 0,
        peopleVaccinated: 0,
        peoplePartiallyVaccinated: 0,
        country: ''
    });

    const updateVaccines = ({ 
      administered,
      peopleVaccinated,
      peoplePartiallyVaccinated,
      country
    }) => {
      setVaccines(previousState => {
          return { 
            ...previousState,
            administered,
            peopleVaccinated,
            peoplePartiallyVaccinated,
            country
          }
      });
    }

  useEffect(() => {
      fetch(`http://127.0.0.1:5000/vaccines?country=France`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            updateVaccines(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
  }, [])
  
  if (error) {
      return <AlertDismis error={error} />;
  } else if (!isLoaded) {
      return <Spinner animation="grow" />;
  } else {
    return (
      <div className="Vaccine">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Administered</th>
              <th>People Vaccinated</th>
              <th>People Partially Vaccinated</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{vaccines.administered ?? 0}</td>
              <td>{vaccines.peopleVaccinated ?? 0}</td>
              <td>{vaccines.peoplePartiallyVaccinated?? 0}</td>
              <td>{vaccines.country}</td>
            </tr>
          </tbody>
      </Table>
      </div>
    );
  }
}
  
export default Vaccines;
