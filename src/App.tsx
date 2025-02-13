import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeafletMap from './components/LeafletMap';
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
        <div>
          Loading...
        </div>
      ) : (
        <LeafletMap sites={sites} costs={costs} />
      )}
    </div>
  )
}

export default App
