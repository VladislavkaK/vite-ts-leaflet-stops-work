import { Link } from 'react-router-dom';

import styles from './style.module.scss';

const Index = () => {
  return (
    <div className={styles.Index}>
      <Link className={styles.Button} to="/leaflet-map">
        Go to Leaflet Map
      </Link>
      <Link className={styles.Button} to="/yandex-map">
        Go to Yandex Map
      </Link>
    </div>
  );
};

export default Index;
