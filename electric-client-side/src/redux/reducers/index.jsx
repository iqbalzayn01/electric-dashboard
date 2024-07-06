import { combineReducers } from '@reduxjs/toolkit';
// import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import usersReducer from '../users/reducer';
import tarifReducer from '../tarifListrik/reducer';
import pelangganReducer from '../pelanggan/reducer';
import uploadImagesReducer from '../uploadImages/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tarifS: tarifReducer,
  images: uploadImagesReducer,
  pelangganS: pelangganReducer,
  // loadingBar: loadingBarReducer,
});

export default rootReducer;
