import './App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import Navbar from './components/Navbar';
import countries from './countries.json';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function fetchCountries() {
      const response = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries`
      );
      setAllCountries(response.data);
      setIsLoading(false);
    }

    fetchCountries();
  }, []);

  return (
    <div className="App">
      <Navbar />
      {!isLoading && (
        <div className="container">
          <div className="row">
            <div
              className="col-5"
              style={{ maxHeight: '90vh', overflow: 'scroll' }}
            >
              <div className="list-group">
                b
                {allCountries
                  .map((country) => {
                    return (
                      <div key={country.name.official}>
                        <CountriesList country={country} />
                      </div>
                    );
                  })
                  .reverse()}
              </div>
            </div>

            <Routes>
              <Route
                path="/:alpha3"
                element={<CountryDetails allCountries={allCountries} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
