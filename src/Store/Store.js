
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import ModalSlice from '../Components/ModalSlice';
import AuthSilce from '../Components/AuthSilce';
import {loadState , saveState} from '../Utils/LocalStorageUtils'
import RestaurantSlice from '../Components/RestaurantSlice';
import MenuSlice from '../Components/MenuSlice';



export const resetState = createAction('RESET_STATE');

const appReducer = combineReducers({
   auth : AuthSilce,
   restaurant : RestaurantSlice,
   modal : ModalSlice,
   menu : MenuSlice
});

const rootReducer = (state, action) => {
  if (action.type === resetState.type) {
    state = undefined; // Reset state to undefined, triggering initial state
  }
  return appReducer(state, action);
};
const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Use the loaded state as the initial state
});

// Subscribe to store changes to save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
