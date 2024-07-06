import { createReducer } from '@reduxjs/toolkit';
import {
  setTarif,
  setOneTarif,
  addTarif,
  editTarif,
  removeTarif,
} from './actions';

const initialState = {
  tarifS: [],
  tarif: {},
};

const tarifReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTarif, (state, action) => {
      state.tarifS = action.payload;
    })
    .addCase(setOneTarif, (state, action) => {
      const index = state.tarifS.findIndex(
        (tarif) => tarif._id === action.payload._id
      );
      if (index !== -1) {
        state.tarifS[index] = action.payload;
      }
    })
    .addCase(addTarif, (state, action) => {
      state.tarifS.push(action.payload);
    })
    .addCase(editTarif, (state, action) => {
      const index = state.tarifS.findIndex(
        (tarif) => tarif._id === action.payload._id
      );
      if (index !== -1) {
        state.tarifS[index] = action.payload;
      }
    })
    .addCase(removeTarif, (state, action) => {
      state.tarifS = state.tarifS.filter(
        (tarif) => tarif._id !== action.payload
      );
    });
});

export default tarifReducer;
