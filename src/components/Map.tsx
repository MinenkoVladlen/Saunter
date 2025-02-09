import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = { width: "100%", height: "500px" };
const defaultCenter = { lat: 48.468821526793775, lng: 35.03729389609859 };

interface MapProps {
  markers: google.maps.LatLngLiteral[];
  onMapClick: (event: google.maps.MapMouseEvent) => void;
  onMarkerClick: (index: number) => void;
}
const Map: React.FC<MapProps> = ({
  markers,
  onMapClick,
  onMarkerClick
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (isLoaded && markers.length >= 2 && window.google && window.google.maps && window.google.maps.DirectionsService) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: markers[0],
          destination: markers[1],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } 
        }
      );
    }
  }, [isLoaded, markers]); 

  if (loadError) return <p>Error</p>;
  if (!isLoaded) return <p>Loading...</p>;
  

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      onClick={onMapClick}
    >
      {markers?.map((position, index) => (
        <Marker
          key={index}
          position={position}
          onClick={() => onMarkerClick(index)}
        />
      ))}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;
