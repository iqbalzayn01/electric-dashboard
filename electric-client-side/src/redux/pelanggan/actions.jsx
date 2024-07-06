import { createAction } from '@reduxjs/toolkit';
import {
  createPelanggan,
  getAllPelanggan,
  updatePelanggan,
  deletePelanggan,
} from '../../utils/fetch';

export const setPelanggan = createAction('pelanggan/setPelanggan');
export const setOnePelanggan = createAction('pelanggan/setOnePelanggan');
export const addPelanggan = createAction('pelanggan/createPelanggan');
export const editPelanggan = createAction('pelanggan/updatePelanggan');
export const removePelanggan = createAction('pelanggan/removePelanggan');

export const fetchAllPelanggan = () => async (dispatch) => {
  try {
    const res = await getAllPelanggan();
    const dataPelanggan = res.data;
    dispatch(setPelanggan(dataPelanggan));
  } catch (error) {
    console.error('Get All Pelanggan Error:', error);
  }
};

export const fetchCreatePelanggan = (dataPelanggan) => async (dispatch) => {
  try {
    const res = await createPelanggan(dataPelanggan);
    const dataCreatePelanggan = res.data;
    dispatch(addPelanggan(dataCreatePelanggan));
  } catch (error) {
    console.error('Create Pelanggan Error:', error);
  }
};

export const fetchUpdatePelanggan = (id, dataPelanggan) => async (dispatch) => {
  try {
    const res = await updatePelanggan(id, dataPelanggan);
    const dataUpdatePelanggan = res.data;
    dispatch(editPelanggan(dataUpdatePelanggan));
  } catch (error) {
    console.error('Update Pelanggan Error:', error);
  }
};

export const fetchDeletePelanggan = (id) => async (dispatch) => {
  try {
    await deletePelanggan(id);
    dispatch(removePelanggan(id));
  } catch (error) {
    console.error('Delete Pelanggan Error:', error);
  }
};
