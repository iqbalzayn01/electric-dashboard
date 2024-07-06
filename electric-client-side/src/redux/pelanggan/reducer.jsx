import { createReducer } from '@reduxjs/toolkit';
import {
  setPelanggan,
  setOnePelanggan,
  addPelanggan,
  editPelanggan,
  removePelanggan,
} from './actions';

const initialState = {
  pelangganS: [],
  pelanggan: {},
};

const pelangganReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPelanggan, (state, action) => {
      state.pelangganS = action.payload;
    })
    .addCase(setOnePelanggan, (state, action) => {
      const index = state.pelangganS.findIndex(
        (pelanggan) => pelanggan._id === action.payload._id
      );
      if (index !== -1) {
        state.pelangganS[index] = action.payload;
      }
    })
    .addCase(addPelanggan, (state, action) => {
      state.pelangganS.push(action.payload);
    })
    .addCase(editPelanggan, (state, action) => {
      const index = state.pelangganS.findIndex(
        (pelanggan) => pelanggan._id === action.payload._id
      );
      if (index !== -1) {
        state.pelangganS[index] = action.payload;
      }
    })
    .addCase(removePelanggan, (state, action) => {
      state.pelangganS = state.pelangganS.filter(
        (pelanggan) => pelanggan._id !== action.payload
      );
    });
});

export default pelangganReducer;
