import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#1034CC",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 200,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 300,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 400,
  },
};

export const sortedData = (data) => {
  let sortData = [...data];
  sortData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, caseType = "cases") => {
  console.log("hello show data", data);
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[caseType].hex}
      fillColor={casesTypeColors[caseType].hex}
      fillOpacity={0.2}
      radius={
        Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
      }
    >
      <Popup>
        <div className="popup_container">
          <img src={country.countryInfo.flag} alt="flag image" />
          <h2>{country.country}</h2>
          <div>
            <strong>Infected</strong> : {numeral(country.cases).format("+0,0")}
          </div>
          <div></div>
          <div>
            <strong>Recovered</strong> :{" "}
            {numeral(country.recovered).format("+0,0")}
          </div>
          <div>
            <strong>Deaths</strong> : {numeral(country.deaths).format("+0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
