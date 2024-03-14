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
  "API_KEY";

class MapboxComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [-73.985664, 40.748514],
      zoom: 12,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    // Directions
    map.addControl(directions, "bottom-left");

    // map.on("load", function () {
    //   directions.setOrigin("Toronto, Ontario"); // On load, set the origin to "Toronto, Ontario".
    //   directions.setDestination("Montreal, Quebec"); // On load, set the destination to "Montreal, Quebec".
    // });

    directions.on("route", (e) => {
      // routes is an array of route objects as documented here:
      // https://docs.mapbox.com/api/navigation/#route-object

      let routes = e.route;

      // // Each route object has a distance property
      // console.log(
      //   'Route lengths',
      //   routes.map((r) => r.distance)
      //);
      this.props.setPath(routes[0].distance);
      this.props.setTime(routes[0].duration);
      this.props.setSource(directions.getOrigin().geometry.coordinates);
      this.props.setDestination(
        directions.getDestination().geometry.coordinates
      );
    });

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
export default MapboxComponent;