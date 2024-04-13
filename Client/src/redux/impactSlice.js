import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  waterImpactLandfill: 0,
  waterImpact2dnChance: 0,
  carbonImpactLandfill: 0,
  carbonImpact2dnChance: 0
};

const impactSlice = createSlice({
  name: 'impact',
  initialState,
  reducers: {
    setImpact(state, action) {
      Object.assign(state, action.payload);
    },
    clearImpact(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setImpact, clearImpact } = impactSlice.actions;

export default impactSlice.reducer;