import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  console.log('costsData', costs);
  console.log('sites', sites);

  return (
    <div>
      App
    </div>
  )
}

export default App
