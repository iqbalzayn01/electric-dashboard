import { createAction } from '@reduxjs/toolkit';
import {
  createTarif,
  getAllTarif,
  updateTarif,
  deleteTarif,
} from '../../utils/fetch';

export const setTarif = createAction('tarif/setTarif');
export const setOneTarif = createAction('tarif/setOneTarif');
export const addTarif = createAction('tarif/addTarif');
export const editTarif = createAction('tarif/editTarif');
export const removeTarif = createAction('tarif/removeTarif');

export const fetchAllTarif = () => async (dispatch) => {
  try {
    const res = await getAllTarif();
    const dataTarif = res.data;
    dispatch(setTarif(dataTarif));
  } catch (error) {
    console.error('Get All Tarif Error:', error);
  }
};

export const fetchCreateTarif = (dataTarif) => async (dispatch) => {
  try {
    const res = await createTarif(dataTarif);
    const dataCreateTarif = res.data;
    dispatch(addTarif(dataCreateTarif));
  } catch (error) {
    console.error('Create Tarif Error:', error);
  }
};

export const fetchUpdateTarif = (id, dataTarif) => async (dispatch) => {
  try {
    const res = await updateTarif(id, dataTarif);
    const dataUpdateTarif = res.data;
    dispatch(editTarif(dataUpdateTarif));
  } catch (error) {
    console.error('Update Tarif Error:', error);
  }
};

export const fetchDeleteTarif = (id) => async (dispatch) => {
  try {
    await deleteTarif(id);
    dispatch(removeTarif(id));
  } catch (error) {
    console.error('Delete Tarif Error:', error);
  }
};
