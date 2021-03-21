import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            };
          });
          setCountries(countries);
        });
    };

    getCountryData();
  }, []);

  const onCountryChange = async (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={4000} total={400000} />
        <InfoBox title="Recovered" cases={4000} total={400000} />
        <InfoBox title="Death" cases={4000} total={400000} />
      </div>
    </div>
  );
}

export default App;
