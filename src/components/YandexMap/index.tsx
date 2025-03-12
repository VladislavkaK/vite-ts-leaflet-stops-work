import { Link } from 'react-router-dom';
import { useState, ChangeEvent, useEffect } from 'react';

import { COORDINATES_OF_MOSCOW, INITIAL_ZOOM } from '../../const';
import { SiteType } from '../../store/sites';
import { CostType } from '../../store/costs';
import styles from './style.module.scss';
import './yandexMap.scss';

interface Props {
  sites: SiteType[];
  costs: CostType[];
}

const YandexMap = (props: Props) => {
  const { sites } = props;
  const [keyYandexAPI, setKeyYandexAPI] = useState<string>('');
  const [currentValue, setCurrentValue] = useState<string>('');
  const [showYandexMap, setShowYandexMap] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!import.meta.env.VITE_YANDEX_API_KEY) return;

    setKeyYandexAPI(import.meta.env.VITE_YANDEX_API_KEY);
  }, []);

  useEffect(() => {
    if (!keyYandexAPI) return;

    const initMap = () => {
      const map = new (window as any).ymaps.Map('map', {
        center: COORDINATES_OF_MOSCOW,
        zoom: INITIAL_ZOOM,
      });

      sites.forEach(({ siteName, position }) => {
        const placemark = new (window as any).ymaps.Placemark(position, {
          balloonContent: siteName
        });

        placemark.events.add('click', () => {
          map.setCenter(position, 18, { duration: 500 });
        });

        placemark.events.add('balloonclose', () => {
          map.setCenter(COORDINATES_OF_MOSCOW, INITIAL_ZOOM, { duration: 500 });
        });
    
        map.geoObjects.add(placemark);
      });
      setMapLoaded(true);
    };

    const loadYandexMaps = async () => {
      try {
        if ((window as any).ymaps) {
          initMap();
          return;
        }
  
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${keyYandexAPI}`;
        script.async = true;

        script.onload = async () => {
          try {
            if (!(window as any).ymaps) {
              throw new Error("API error: An invalid API key may have been specified.");
            }

            (window as any).ymaps.ready(() => {
              if (!(window as any).ymaps.Map) {
                throw new Error("API error: Invalid key or expired.");
              }
  
              initMap();
            });

            setShowYandexMap(true);
          } catch (err) {
            console.error("Error during card initialization:", err);
            setShowYandexMap(false);
          }
        };

        document.body.appendChild(script);
      } catch(err) {
        console.error("Error loading the script:", err);
      }
    };

    loadYandexMaps();
  }, [keyYandexAPI, sites]);

  const handleChangeKeyYandexAPI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCurrentValue(value);
  };

  const handleAccept = () => {
    setKeyYandexAPI(currentValue);
    setCurrentValue('');
  };

  return (
    <div className={styles.YandexMap}>
      <Link to="/" style={{ marginBottom: '20px' }}>
        Back to Home
      </Link>
      {showYandexMap ? (
        <div className={styles.YandexMap__MapContainer}>
          {!mapLoaded && <p>Загрузка карты...</p>}
          <div className={styles.YandexMap__Map} id="map"></div>
        </div>
      ) : (
        <div className={styles.YandexMap__InputContainer}>
          <input
            type="text"
            className={styles.YandexMap__Input}
            value={currentValue}
            onChange={handleChangeKeyYandexAPI}
          />
          <button className={styles.YandexMap__Button} type="button" onClick={handleAccept}>
            Accept
          </button>
        </div>
      )}
    </div>
  );
}

export default YandexMap;
