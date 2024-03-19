import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import { personsData } from "../../data";

const Map = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  // const map = useRef(null);
  const [lng, setLng] = useState(19.0714);
  const [lat, setLat] = useState(72.8822);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map) return; // initialize map only once
    setMap(
      new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
        accessToken:
          "pk.eyJ1IjoiY3VyYXRvcjY5IiwiYSI6ImNrejA2NGwzZTAyZjYyd3BuNzIyZzA3ZzAifQ.foqIs3Sq5H6QJGCAi9tXdg",
      })
    );
  });

  useEffect(() => {
    if (map) {
      let markers = [];
      const tasksArray = personsData.map((person) => person.tasks);
      for (let i = 0; i < tasksArray.length; i++) {
        const { call, sms, data } = tasksArray[i];
        // for call records
        for (let j = 0; j < call.callRecords.length; j++) {
          const { location } = call.callRecords[j];
          const marker = new mapboxgl.Marker().setLngLat(location).addTo(map);
          markers.push(marker);
        }
        // for data
        if (data) {
          const marker = new mapboxgl.Marker()
            .setLngLat(data.location)
            .addTo(map);
          markers.push(marker);
        }
        // for sms
        for (let k = 0; k < sms.length; k++) {
          const { location } = sms[k];
          const marker = new mapboxgl.Marker().setLngLat(location).addTo(map);
          markers.push(marker);
        }
      }
      console.log(markers);
    }
  }, [map]);

  return (
    <div
      ref={mapContainer}
      className="map-container"
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default Map;
