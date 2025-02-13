import { useMap, useMapEvents } from 'react-leaflet';

import { COORDINATES_OF_MOSCOW, INITIAL_ZOOM } from '../../const';

const ClickHandler = ({ clearSelection }: { clearSelection: () => void }) => {
  const map = useMap();

  const handleMapClick = () => {
    clearSelection();
    map.setView(COORDINATES_OF_MOSCOW, INITIAL_ZOOM, { animate: true });
  };

  useMapEvents({
    click: handleMapClick
  });

  return null;
};

export default ClickHandler;
