import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PayloadType = {
  site_id: string;
  site_name: string;
  longitude: number;
  latitude: number;
}

export type SiteType = {
  siteId: string;
  siteName: string;
  position: number[];
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
    setSitesData: (state, action: PayloadAction<PayloadType[]>) => {
      const sites = action.payload.map(item => ({
        siteId: item.site_id,
        siteName: item.site_name,
        position: [Number(item.latitude), Number(item.longitude)],
      }));

      state.sitesData = sites;
    },
  },
});

export const { setSitesData } = sitesSlice.actions;
export default sitesSlice.reducer;
