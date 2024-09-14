import { combineReducers } from '@reduxjs/toolkit';
// import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import usersReducer from '../users/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  // loadingBar: loadingBarReducer,
});

export default rootReducer;
