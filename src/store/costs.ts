import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CostType = {
  site_id_from: number;
  site_id_to: number;
  iwait: number;
  inveht: number;
  xwait: number;
  xpen: number;
  xnum: number;
  cost: number;
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
