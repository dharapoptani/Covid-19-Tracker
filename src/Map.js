import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

const getColor = (caseType) => {
  if (caseType === "cases") return "red";
  else if (caseType === "recovered") return "green";
  else return "red";
};
const Map = ({ center, zoom, countries, caseType }) => {
  const clr = getColor(caseType);
  return (
    <div className="map" style={{ color: clr }}>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        {showDataOnMap(countries, caseType)}
      </LeafletMap>
    </div>
  );
};

export default Map;
