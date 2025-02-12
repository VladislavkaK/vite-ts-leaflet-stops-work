import { configureStore } from '@reduxjs/toolkit';

import sitesReducer from './sites';
import costsReducer from './costs';

export const store = configureStore({
  reducer: {
    sites: sitesReducer,
    costs: costsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
