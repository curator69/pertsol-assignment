import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const Map = ({ tasks }) => {
  const mapContainer = useRef(null);

  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(72.8822);
  const [lng, setLng] = useState(19.0714);
  const [zoom, setZoom] = useState(15);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map) return; // initialize map only once
    setMap(
      new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lat, lng],
        zoom: zoom,
        accessToken:
          "pk.eyJ1IjoiY3VyYXRvcjY5IiwiYSI6ImNrejA2NGwzZTAyZjYyd3BuNzIyZzA3ZzAifQ.foqIs3Sq5H6QJGCAi9tXdg",
      })
    );
  });

  useEffect(() => {
    if (map) {
      // Remove old markers
      markers.forEach((marker) => marker.remove());

      // Add new markers
      const newMarkers = tasks.map(({ location }) => {
        const newMarker = new mapboxgl.Marker().setLngLat(location).addTo(map);
        return newMarker;
      });

      setMarkers(newMarkers);
    }
  }, [tasks, map]);

  return (
    <div
      ref={mapContainer}
      className="map-container h-full w-full max-h-screen"
    ></div>
  );
};

export default Map;
