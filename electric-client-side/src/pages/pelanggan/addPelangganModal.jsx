import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchCreatePelanggan,
  fetchUpdatePelanggan,
} from '../../redux/pelanggan/actions';

import { fetchAllTarif } from '../../redux/tarifListrik/actions';

export default function AddPelangganModal({ onClose, isEdit, dataPelanggan }) {
  const { tarifS } = useSelector((state) => state.tarifS);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tarifID: '',
    alamat: '',
    no_telp: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && dataPelanggan) {
      setFormData({
        ...dataPelanggan,
      });
    }
    dispatch(fetchAllTarif());
  }, [isEdit, dispatch, dataPelanggan]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTarifChange = (e) => {
    setFormData({ ...formData, tarifID: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name && !formData.email && !formData.no_telp) {
      setError('Data harus diisi');
      return;
    }

    if (dataPelanggan) {
      dispatch(fetchUpdatePelanggan(dataPelanggan._id, formData));
    } else {
      dispatch(fetchCreatePelanggan(formData));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl mb-4">
          {isEdit ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Alamat</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tarif Listrik</label>
            <select
              name="tarifID"
              value={formData.tarifID}
              onChange={handleTarifChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Pilih Tarif</option>
              {tarifS.map((tarif) => (
                <option key={tarif._id} value={tarif._id}>
                  {tarif.daya_listrik}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nomor Telepon</label>
            <input
              type="text"
              name="no_telp"
              value={formData.no_telp}
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

AddPelangganModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  dataPelanggan: PropTypes.object,
};
