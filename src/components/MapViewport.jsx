import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Resolve Leaflet marker icons in Vite bundling environment
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
});

// Environment variable configuration with safe development fallback (Esri World Imagery)
const MAP_TILE_URL = import.meta.env.VITE_MAP_TILE_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const MAP_ATTRIBUTION = import.meta.env.VITE_MAP_ATTRIBUTION || 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

// Component to dynamically update map center and zoom when props change
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

// Component to handle map click and append vertex when editing
function MapClickHandler({ isEditable, polygonCoords, onPolygonChange }) {
  useMapEvents({
    click(e) {
      if (!isEditable) return;
      const newPoint = [e.latlng.lat, e.latlng.lng];
      const updated = [...(polygonCoords || []), newPoint];
      if (onPolygonChange) {
        onPolygonChange(updated);
      }
    }
  });
  return null;
}

export default function MapViewport({ 
  latitude, 
  longitude, 
  polygon, 
  zoom = 18, 
  isEditable = false,
  onPolygonChange,
  children 
}) {
  // Use coordinates supplied, or mock coordinate fallback for Safdarjung Enclave, New Delhi
  const lat = latitude !== undefined && latitude !== null ? latitude : 28.5562;
  const lng = longitude !== undefined && longitude !== null ? longitude : 77.2001;
  const center = [lat, lng];

  // Helper to extract Leaflet coordinates [[lat, lng]] from GeoJSON or Array format
  const getPolygonCoords = (poly) => {
    if (!poly) return null;
    if (Array.isArray(poly)) {
      if (Array.isArray(poly[0]) && typeof poly[0][0] === 'number') {
        return poly;
      }
      // If it's nested GeoJSON coordinate ring
      if (Array.isArray(poly[0]) && Array.isArray(poly[0][0]) && typeof poly[0][0][0] === 'number') {
        return poly[0].map(coord => [coord[1], coord[0]]);
      }
    }
    if (poly.type === 'Feature') {
      return getPolygonCoords(poly.geometry);
    }
    if (poly.type === 'Polygon' && Array.isArray(poly.coordinates)) {
      return poly.coordinates[0].map(coord => [coord[1], coord[0]]);
    }
    return null;
  };

  const polygonCoords = getPolygonCoords(polygon);

  return (
    <div className="map-viewport relative w-full h-full min-h-[300px] z-0 select-none">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        zoomControl={false} // Disable default zoom control so we can keep Stitch overlays uncluttered
      >
        <ChangeView center={center} zoom={zoom} />
        
        <MapClickHandler 
          isEditable={isEditable} 
          polygonCoords={polygonCoords} 
          onPolygonChange={onPolygonChange} 
        />
        
        <TileLayer
          url={MAP_TILE_URL}
          attribution={MAP_ATTRIBUTION}
          maxZoom={19}
        />
        
        {/* Render selected location marker */}
        <Marker position={center} />

        {/* Render read-only or editable GeoJSON rooftop polygon with Terracotta accents */}
        {polygonCoords && polygonCoords.length > 0 && (
          <Polygon 
            positions={polygonCoords} 
            pathOptions={{
              color: '#aa3618',      // Terracotta outline
              fillColor: '#aa3618',  // Terracotta fill
              fillOpacity: 0.2,
              weight: 2,
              dashArray: '4,4'
            }}
          />
        )}

        {/* Render draggable vertex markers if in editing mode */}
        {isEditable && polygonCoords && polygonCoords.map((coord, idx) => (
          <Marker
            key={`vertex-${idx}-${coord[0]}-${coord[1]}`}
            position={coord}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const newLatLng = e.target.getLatLng();
                const updated = [...polygonCoords];
                updated[idx] = [newLatLng.lat, newLatLng.lng];
                if (onPolygonChange) {
                  onPolygonChange(updated);
                }
              }
            }}
          >
            <Popup>
              <div className="p-1 flex flex-col gap-1.5 select-none">
                <span className="font-bold text-xs text-primary">Vertex {idx + 1}</span>
                <button
                  onClick={() => {
                    const updated = polygonCoords.filter((_, i) => i !== idx);
                    if (onPolygonChange) {
                      onPolygonChange(updated);
                    }
                  }}
                  className="bg-red-600 text-white text-[10px] px-2 py-1 rounded hover:bg-red-700 transition-colors font-bold cursor-pointer"
                >
                  Delete Vertex
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Stitch overlay panels and control buttons slot */}
      {children}
    </div>
  );
}
