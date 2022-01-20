import React from "react";
import { Card, CardContent } from "@material-ui/core";
import "./InfoBox.css";
import { prettyPrintStat } from "./util";

const getColor = (caseType) => {
  if (caseType === "Infected") return "blue";
  else if (caseType === "Recovered") return "greenyellow";
  else return "red";
};

const InfoBox = ({ title, cases, total, ...props }) => {
  const clr = getColor(title);
  return (
    <>
      <Card className="infobox" style={{ color: clr }} onClick={props.onClick}>
        <CardContent>
          <h3 className="infobox_title">{title}</h3>
          <div className="underline" style={{ backgroundColor: clr }}></div>
          <h3 className="infobox_cases" style={{ color: clr }}>
            {prettyPrintStat(cases)}
          </h3>
          <p className="infobox_total">{prettyPrintStat(total)} Total</p>
        </CardContent>
      </Card>
    </>
  );
};

export default InfoBox;
