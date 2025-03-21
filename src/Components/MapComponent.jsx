import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapComponent.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const MapComponent = ({ locationQuery }) => {
    const mapRef = useRef(null);
    const geocoderRef = useRef(null); //Added geocoderRef

    useEffect(() => {
        const map = L.map('map').setView([0, 0], 2);
        mapRef.current = map;

        L.tileLayer(
            'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=oVpi9wwBzP5Bjh3WKrzI	',
            {
                attribution:
                    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }
        ).addTo(map);

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: marker2x,
            iconUrl: marker,
            shadowUrl: markerShadow,
        });

        geocoderRef.current = L.Control.geocoder().addTo(map); // Store geocoder instance

        return () => {
            map.remove();
        };
    }, []);

    useEffect(() => {
        if (locationQuery && mapRef.current && geocoderRef.current) {
            geocoderRef.current.geocode(locationQuery); // Use geocoderRef to call geocode
        }
    }, [locationQuery]);

    return <div id="map" className="map-container"></div>;
};

export default MapComponent;