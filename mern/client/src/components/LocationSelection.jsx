import map from "../assets/map.png";
import React from "react";

export default function LocationSelection() {
  return (
    <div className="location-selection">
      <img src={map} alt="Nashville" style={{ height: "2rem", width: "2rem" }}></img>
      <div style={{ fontWeight: "bold" }}>Nashville</div>
    </div>
  );
}
