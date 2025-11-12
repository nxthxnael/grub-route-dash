import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation, X } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string[];
  location: [number, number]; // [lng, lat]
}

interface MapViewProps {
  restaurants: Restaurant[];
  onRestaurantClick: (id: string) => void;
}

export const MapView = ({ restaurants, onRestaurantClick }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem('mapbox_token') || '');
  const [tokenInput, setTokenInput] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const saveToken = () => {
    localStorage.setItem('mapbox_token', tokenInput);
    setMapboxToken(tokenInput);
    setShowTokenInput(false);
  };

  const goToUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            essential: true,
          });

          // Add user location marker
          new mapboxgl.Marker({ color: '#FF6B35' })
            .setLngLat([longitude, latitude])
            .addTo(map.current!);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [37.15, -0.72], // Murang'a, Kenya
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers with clustering
    map.current.on('load', () => {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Create GeoJSON data
      const geojsonData: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: restaurants.map((restaurant) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: restaurant.location,
          },
          properties: {
            id: restaurant.id,
            name: restaurant.name,
            rating: restaurant.rating,
            image: restaurant.image,
          },
        })),
      };

      // Add source
      map.current!.addSource('restaurants', {
        type: 'geojson',
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Add cluster circles
      map.current!.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'restaurants',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#00A86B',
            5,
            '#FF6B35',
            10,
            '#E02424',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            5,
            30,
            10,
            40,
          ],
        },
      });

      // Add cluster count
      map.current!.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'restaurants',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#ffffff',
        },
      });

      // Add unclustered points
      map.current!.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'restaurants',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#FF6B35',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff',
        },
      });

      // Click on cluster to zoom
      map.current!.on('click', 'clusters', (e) => {
        const features = map.current!.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        const clusterId = features[0].properties.cluster_id;
        (map.current!.getSource('restaurants') as mapboxgl.GeoJSONSource)
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            map.current!.easeTo({
              center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
              zoom: zoom,
            });
          });
      });

      // Click on unclustered point to show restaurant
      map.current!.on('click', 'unclustered-point', (e) => {
        const features = map.current!.queryRenderedFeatures(e.point, {
          layers: ['unclustered-point'],
        });
        if (features.length > 0) {
          const restaurantId = features[0].properties.id;
          onRestaurantClick(restaurantId);
        }
      });

      // Change cursor on hover
      map.current!.on('mouseenter', 'clusters', () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      });
      map.current!.on('mouseleave', 'clusters', () => {
        map.current!.getCanvas().style.cursor = '';
      });
      map.current!.on('mouseenter', 'unclustered-point', () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      });
      map.current!.on('mouseleave', 'unclustered-point', () => {
        map.current!.getCanvas().style.cursor = '';
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, restaurants, onRestaurantClick]);

  if (showTokenInput) {
    return (
      <div className="flex items-center justify-center h-full bg-background p-6">
        <div className="max-w-md w-full space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Enter Mapbox Token
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get your free token at{' '}
              <a
                href="https://mapbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="pk.eyJ1..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
            <Button onClick={saveToken} className="w-full">
              Save Token
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Geolocation Button */}
      <Button
        size="icon"
        className="absolute bottom-6 right-6 rounded-full shadow-lg"
        onClick={goToUserLocation}
        aria-label="Go to my location"
      >
        <Navigation className="h-5 w-5" />
      </Button>

      {/* Reset Token Button */}
      <Button
        size="icon"
        variant="outline"
        className="absolute top-6 left-6 rounded-full shadow-lg"
        onClick={() => {
          setShowTokenInput(true);
          setTokenInput('');
        }}
        aria-label="Change Mapbox token"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
