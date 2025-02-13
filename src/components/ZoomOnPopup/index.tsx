import { useMap, Marker, Tooltip } from 'react-leaflet';
import L, { LeafletMouseEventHandlerFn, LatLngExpression } from 'leaflet';

import markeIconBlue from '../../assets/marker-icon-blue.png';
import markeIconGreen from '../../assets/marker-icon-green.png';
import markeIconYellow from '../../assets/marker-icon-yellow.png';
import markeIconRed from '../../assets/marker-icon-red.png';
import markeIconViolet from '../../assets/marker-icon-violet.png';
import markeIconBlack from '../../assets/marker-icon-black.png';
import { CostType } from '../../store/costs';
import styles from './styles.module.scss';

interface Props {
  siteId: string;
  name: string;
  position: LatLngExpression;
  selectedMarker: string | null;
  onMarkerClick: (id: string) => void;
  costBySiteId?: CostType;
}
  
const markerIconSelected = new L.Icon({
  iconUrl: markeIconBlue,
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [35, 51],
  iconAnchor: [17, 51],
  popupAnchor: [1, -41],
});

const getIconUrl = (costBySiteId?: CostType) => {
  if (!costBySiteId) {
    return markeIconBlack;
  }

  if (parseFloat(costBySiteId.cost) <= 5) {
    return markeIconGreen;
  } else if (parseFloat(costBySiteId.cost) <= 15) {
    return markeIconYellow;
  } else if (parseFloat(costBySiteId.cost) <= 30) {
    return markeIconRed;
  } else if (parseFloat(costBySiteId.cost) > 30) {
    return markeIconViolet;
  }
};

const createCustomIcon = (selectedMarker: string | null, costBySiteId?: CostType) => {
  return new L.Icon({
    iconUrl: selectedMarker ? getIconUrl(costBySiteId) : markeIconBlue,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

const ZoomOnPopup = (props: Props) => {
  const { position, siteId, name, selectedMarker, costBySiteId, onMarkerClick } = props;
  const map = useMap();

  const handleMarkerClick: LeafletMouseEventHandlerFn = e => {
    e.originalEvent.stopPropagation();
    map.setView(position, 18, { animate: true });
    onMarkerClick(siteId)
  }
  
  return (
    <Marker
      position={position}
      icon={selectedMarker === siteId ? markerIconSelected : createCustomIcon(selectedMarker, costBySiteId)}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    >
      {(selectedMarker && selectedMarker !== siteId && costBySiteId) ? (
        <Tooltip className={styles.Tooltip} direction="top" offset={[0, -35]}>
          <div>id: {siteId}</div>
          <div>Остановка: {name}</div>
          <div>Параметры перемещения:</div>
          <div>Время ожидания: {costBySiteId.iwait}</div>
          <div>Время в салоне: {costBySiteId.inveht}</div>
          <div>Число пересадок: {costBySiteId.xnum}</div>
          <div>Штраф за пересадки: {costBySiteId.xpen}</div>
        </Tooltip>
      ) : (
        <Tooltip className={styles.Tooltip} direction="top" offset={[0, -35]}>
          <div>id: {siteId}</div>
          <div>Остановка: {name}</div>
        </Tooltip>
      )}
    </Marker>
  );
};

export default ZoomOnPopup;
