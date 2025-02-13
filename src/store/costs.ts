import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CostType = {
  site_id_from: string;
  site_id_to: string;
  iwait: string;
  inveht: string;
  xpen: string;
  xnum: string;
  cost: string;
};

interface CostsState {
  costsData: CostType[];
}

const initialState: CostsState = {
  costsData: [],
};

export const costsSlice = createSlice({
  name: 'costs',
  initialState,
  reducers: {
    setCostsData: (state, action: PayloadAction<CostType[]>) => {
      state.costsData = action.payload;
    },
  },
});

export const { setCostsData } = costsSlice.actions;
export default costsSlice.reducer;
