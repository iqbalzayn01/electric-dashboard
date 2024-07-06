import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchCreateTarif,
  fetchUpdateTarif,
} from '../../redux/tarifListrik/actions';

export default function AddTarifModal({ onClose, isEdit, dataTarif }) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    harga_tarif: '',
    daya_listrik: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && dataTarif) {
      setFormData({
        ...dataTarif,
      });
    }
  }, [isEdit, dataTarif]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { harga_tarif, daya_listrik } = formData;

    if (!harga_tarif || !daya_listrik) {
      setError('Data harus diisi.');
      return;
    }

    if (isEdit) {
      dispatch(fetchUpdateTarif(dataTarif._id, formData));
    } else {
      dispatch(fetchCreateTarif(formData));
    }

    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl mb-4">
          {isEdit ? 'Edit Tarif Listrik' : 'Tambah Tarif Listrik Baru'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Harga</label>
            <input
              type="number"
              name="harga_tarif"
              value={formData.harga_tarif}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Daya Listrik</label>
            <input
              type="text"
              name="daya_listrik"
              value={formData.daya_listrik}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddTarifModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  dataTarif: PropTypes.object,
};
