import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  fetchAllPelanggan,
  fetchDeletePelanggan,
} from '../../redux/pelanggan/actions';

import Sidebar from '../../components/Sidebar';
import PopUp from '../../components/PopUp';
import AddPelangganModal from './addPelangganModal';

export default function DataPelanggan() {
  const { pelangganS, error } = useSelector((state) => state.pelangganS);
  const [selectedPelanggan, setSelectedPelanggan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPelanggan());
  }, [dispatch]);

  const handleCreateTalent = () => {
    setIsEdit(false);
    setSelectedPelanggan(null);
    setIsModalOpen(true);
  };

  const handleEdit = (dataPelanggan) => {
    setIsEdit(true);
    setSelectedPelanggan(dataPelanggan);
    setIsModalOpen(true);
  };

  const handlePopUpDelete = () => {
    setIsPopUpOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(fetchDeletePelanggan(id));
    setIsPopUpOpen(false);
  };

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data Pelanggan</h1>
          <button
            onClick={handleCreateTalent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tambah
          </button>
        </div>
        <hr className="border border-gray-300 mb-10" />
        {error && (
          <p className="text-red-500">Gagal memuat Data Pelanggan {error}</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">No</th>
                <th className="px-4 py-2 border border-gray-300">Avatar</th>
                <th className="px-4 py-2 border border-gray-300">Nama</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">
                  Nomor Telepon
                </th>
                <th className="px-4 py-2 border border-gray-300">Role</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pelangganS && pelangganS.length > 0 ? (
                pelangganS.map((pelanggan, index) => (
                  <tr key={pelanggan._id} className="border-t">
                    <td className="text-center px-4 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-gray-300">
                      <img
                        src={pelanggan.avatar}
                        alt="Avatar"
                        className="w-10"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.no_telp}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.role}
                    </td>
                    <td className="grid grid-cols-2 px-4 py-2 border-gray-300">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEdit(pelanggan)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={handlePopUpDelete}
                      >
                        Hapus
                      </button>
                      {isPopUpOpen && (
                        <PopUp
                          handle={() => handleDelete(pelanggan._id)}
                          onClose={() => setIsPopUpOpen(false)}
                          textPopUp="Apakah anda yakin ingin menghapus data ini?"
                          classNameBtn="bg-red-500"
                          textBtn="Hapus"
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center px-4 py-2 border border-gray-300"
                  >
                    Tidak ada data pelanggan yang tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {isModalOpen && (
        <AddPelangganModal
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          dataPelanggan={selectedPelanggan}
        />
      )}
    </div>
  );
}
