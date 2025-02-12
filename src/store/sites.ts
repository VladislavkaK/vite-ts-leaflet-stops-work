import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SiteType = {
  site_id: number;
  site_name: string;
  longitude: number;
  latitude: number;
};

interface SitesState {
  sitesData: SiteType[];
}

const initialState: SitesState = {
  sitesData: [],
};

export const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSitesData: (state, action: PayloadAction<SiteType[]>) => {
      state.sitesData = action.payload;
    },
  },
});

export const { setSitesData } = sitesSlice.actions;
export default sitesSlice.reducer;
