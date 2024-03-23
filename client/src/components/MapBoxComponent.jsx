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
import { useLocation } from "react-router";

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
    const finalPoints = [];
    if (this.props.data.length > 0) {
      for (let i = 0; i < this.props.data.length; i++) {
        finalPoints.push([
          this.props.data[i].longitude,
          this.props.data[i].latitude,
        ]);
      }
    }

    if (finalPoints.length > 0) {
      finalPoints.map((d, i) => new mapboxgl.Marker().setLngLat(d).addTo(map));
    }

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

const MapboxComponent = () => {
  const location = useLocation();

  return <PolyLineComponent data={location.state} />;
};

export default MapboxComponent;
