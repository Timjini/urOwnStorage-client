import { useState } from "react";
import { useRouter } from "expo-router";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

interface Poi {
  id: string;
  key: string;
  location: google.maps.LatLngLiteral;
  title: string;
  price?: number | string;
  info?: string;
}

interface MapMarkerData {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  price?: number | string;
  info?: string;
}

interface StorageSpaceMapProps {
  markers: MapMarkerData[];
  defaultLatitude?: number;
  defaultLongitude?: number;
}

export default function StorageSpaceMap({
  markers,
  defaultLatitude = 42.348,
  defaultLongitude = -72.613,
}: StorageSpaceMapProps) {
  const router = useRouter();
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  const locations: Poi[] = markers.map((m, index) => ({
    id: m.id,
    key: m.id || index.toString(),
    location: {
      lat: m.latitude,
      lng: m.longitude,
    },
    title: m.title || "Storage Location",
    price: m.price,
    info: m.info,
  }));

  const centerLat = markers.length > 0 ? markers[0].latitude : defaultLatitude;
  const centerLng =
    markers.length > 0 ? markers[0].longitude : defaultLongitude;

  const handleNavigate = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <APIProvider apiKey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={{ lat: centerLat, lng: centerLng }}
        defaultZoom={6}
        gestureHandling="greedy"
        disableDefaultUI
        mapId="DEMO_MAP_ID"
      >
        {locations.map((poi) => (
          <div key={poi.key}>
            <AdvancedMarker
              position={poi.location}
              title={poi.title}
              onClick={() => setActiveMarkerId(poi.id)}
            >
              <Pin
                background={"#C83803"}
                glyphColor={"#fff"}
                borderColor={"#A02C02"}
              />
            </AdvancedMarker>

            {activeMarkerId === poi.id && (
              <InfoWindow
                position={poi.location}
                onCloseClick={() => setActiveMarkerId(null)}
              >
                <div style={infoWindowStyles.container}>
                  <h4 style={infoWindowStyles.title}>{poi.title}</h4>
                  <p style={infoWindowStyles.info}>{poi.info}</p>
                  {poi.price && (
                    <p style={infoWindowStyles.price}>
                      ${poi.price}{" "}
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "normal",
                          color: "#666",
                        }}
                      >
                        /mo
                      </span>
                    </p>
                  )}
                  <button
                    onClick={() => handleNavigate(poi.id)}
                    style={infoWindowStyles.button}
                  >
                    View Details
                  </button>
                </div>
              </InfoWindow>
            )}
          </div>
        ))}
      </Map>
    </APIProvider>
  );
}

const infoWindowStyles = {
  container: {
    padding: "4px",
    maxWidth: "180px",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#111",
  },
  info: {
    margin: "0 0 6px 0",
    fontSize: "12px",
    color: "#666",
  },
  price: {
    margin: "0 0 10px 0",
    fontSize: "15px",
    fontWeight: "700",
    color: "#C83803",
  },
  button: {
    width: "100%",
    backgroundColor: "#C83803",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center" as const,
  },
};
