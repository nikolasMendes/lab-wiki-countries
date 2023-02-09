import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetails({ allCountries }) {
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { alpha3 } = useParams();

  useEffect(() => {
    setIsLoading(true);
    async function fetchCountry() {
      const response = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries/${alpha3}`
      );
      setCountry(response.data);
      setIsLoading(false);
    }

    fetchCountry();
  }, [alpha3]);

  function findName(code) {
    const countryName = allCountries.filter(
      (country) => country.alpha3Code === code
    )[0];
    return countryName.name.common;
  }

  return (
    <>
      {!isLoading && (
        <div className="col-7">
          <h1>{country.name.official}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{country.capital[0]}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {country.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {country.borders.map((border) => {
                      return (
                        <li key={border}>
                          <Link to={`/${border}`}>{findName(border)}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default CountryDetails;
