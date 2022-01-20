import React, { useState, useEffect } from "react";
import Table from "./Table";
import InfoBox from "./InfoBox";
import Map from "./Map";
import LineGraph from "./LineGraph";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { sortedData } from "./util";
import "./App.css";
import "leaflet/dist/leaflet.css";

import mask from "./mask.png";

const App = () => {
  const [country, setCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [caseType, setCaseType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [center, setCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [zoom, setZoom] = useState(3);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      let res = await fetch("https://disease.sh/v3/covid-19/countries");
      let data = await res.json();
      let countries = data.map((country) => {
        return { name: country.country, value: country.countryInfo.iso2 };
      });

      setCountries(countries);
      setMapData(data);
      setTableData(sortedData(data));
    };

    getData();
  }, []);

  const countryChanged = async (e) => {
    const code = e.target.value;
    const url =
      code === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${code}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
        setCountry(code);
        setCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
        setZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
            <h1>Covid-19 Tracker</h1>
            <img
              src={mask}
              className="app_pic"
              alt="mask"
              style={{ width: "5rem" }}
            />
          </div>
          <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={countryChanged}
            >
              <MenuItem value="worldwide" key="worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem value={country.value} key={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox
            title="Infected"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
            onClick={() => setCaseType("cases")}
          ></InfoBox>

          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
            onClick={() => setCaseType("recovered")}
          ></InfoBox>

          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
            onClick={() => setCaseType("deaths")}
          ></InfoBox>
        </div>
        <Map
          center={center}
          zoom={zoom}
          countries={mapData}
          caseType={caseType}
        />
      </div>
      <div className="app_right">
        <h3>Live Cases By Country</h3>
        <Table tableData={tableData} />
        <h3>Variation During Last 120 Days</h3>
        <LineGraph casesType={caseType} />
      </div>
    </div>
  );
};

export default App;
