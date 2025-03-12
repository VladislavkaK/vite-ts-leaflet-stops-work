import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import LeafletMap from './components/LeafletMap';
import YandexMap from './components/YandexMap';
import Index from './components/Index';
import { loadCsvData } from './utils/loadCsvData';
import { setCostsData } from './store/costs';
import { setSitesData } from './store/sites';
import { RootState } from './store';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const costs = useSelector((state: RootState) => state.costs.costsData);
  const sites = useSelector((state: RootState) => state.sites.sitesData);

  useEffect(() => {
    loadCsvData<typeof setCostsData>(
      '/data/costs.csv',
      dispatch,
      setCostsData,
    );
  }, [dispatch]);

  useEffect(() => {
    loadCsvData<typeof setSitesData>(
      '/data/sites.csv',
      dispatch,
      setSitesData,
    );
  }, [dispatch]);

  return (
    <div className='App'>
      {costs.length === 0 && sites.length === 0 ? (
        <div className='Loader'>
          Loading...
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leaflet-map" element={<LeafletMap sites={sites} costs={costs} />} />
          <Route path="/yandex-map" element={<YandexMap sites={sites} costs={costs} />} />
        </Routes>
      )}
    </div>
  );
}

export default App
