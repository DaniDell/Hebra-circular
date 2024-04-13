import { combineReducers } from '@reduxjs/toolkit';
import impactReducer from './impactSlice';
import userReducer from './userSlice';
import measuresReducer from './measuresSlice'; 

const rootReducer = combineReducers({
    impact: impactReducer,
    user: userReducer,
    measures: measuresReducer, 
});

export default rootReducer;
