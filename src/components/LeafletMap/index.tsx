import { MapContainer, TileLayer } from 'react-leaflet';
import { useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

import ZoomOnPopup from '../ZoomOnPopup';
import ClickHandler from '../ClickHandler';
import { SiteType } from '../../store/sites';
import { CostType } from '../../store/costs';
import styles from './style.module.scss';
import { COORDINATES_OF_MOSCOW, INITIAL_ZOOM } from '../../const';

interface Props {
  sites: SiteType[];
  costs: CostType[];
}

const LeafletMap = (props: Props) => {
  const { sites, costs } = props;
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const filteredCostsBySelectedMarker = costs.filter(cost => cost.site_id_from === selectedMarker);

  const handleMarkerClick = (id: string) => {
    setSelectedMarker(id);
  };

  return (
    <div className={styles.LeafletMap}>
      <Link to="/" style={{ marginBottom: '20px' }}>
        Back to Home
      </Link>
      <MapContainer 
        center={COORDINATES_OF_MOSCOW}
        zoom={INITIAL_ZOOM}
        scrollWheelZoom
        style={{ height: "700px", width: "80%" }}
      >
        {/* include OpenStreetMap */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler clearSelection={() => setSelectedMarker(null)} />

        {sites.map(site => {
          const costBySiteId = filteredCostsBySelectedMarker.find(cost => cost.site_id_to === site.siteId);

          return (
            <ZoomOnPopup
              key={site.siteId}
              siteId={site.siteId}
              name={site.siteName}
              position={site.position as LatLngExpression}
              selectedMarker={selectedMarker}
              costBySiteId={costBySiteId}
              onMarkerClick={handleMarkerClick}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
