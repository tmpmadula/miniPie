import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import AlertDismis from "../../components/AlertDismis";

function Cases() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cases, setCases] = useState({
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    country: "",
  });

  const updateCases = ({ confirmed, recovered, deaths, country }) => {
    setCases((previousState) => {
      return { ...previousState, confirmed, recovered, deaths, country };
    });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/cases?country=South Africa`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          updateCases(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <AlertDismis error={error} />;
  } else if (!isLoaded) {
    return <Spinner animation="grow" />;
  } else {
    return (
      <div className="Case">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Confirmed</th>
              <th>Recovered</th>
              <th>Deaths</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{cases.confirmed ?? 0}</td>
              <td>{cases.recovered ?? 0}</td>
              <td>{cases.deaths ?? 0}</td>
              <td>{cases.country}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Cases;
