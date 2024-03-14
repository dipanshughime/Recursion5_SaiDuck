import React from "react";
import "../App.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import {
  RulerControl,
  StylesControl,
  CompassControl,
  ZoomControl,
} from "mapbox-gl-controls";
import "mapbox-gl-controls/lib/controls.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXJ1bmFsMTIzNDU2Nzg5IiwiYSI6ImNsbWhzbWF2cTBzajAzcXIybTVoa3g1anQifQ.66Fu05Ii8-NVd-w-C-FSgA";
// "pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g";

class PolyLineComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10",
      center: [73.867204, 18.470839],
      zoom: 12,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    // map.on("load", function () {
    //   directions.setOrigin("Toronto, Ontario"); // On load, set the origin to "Toronto, Ontario".
    //   directions.setDestination("Montreal, Quebec"); // On load, set the destination to "Montreal, Quebec".
    // });

    // Styles
    map.addControl(new StylesControl(), "bottom-left");

    // Compass
    map.addControl(new CompassControl(), "top-right");

    // Zoom
    map.addControl(new ZoomControl(), "top-right");
  }
  render() {
    return <div className="mapWrapper" id="map" />;
  }
}
export default PolyLineComponent;
