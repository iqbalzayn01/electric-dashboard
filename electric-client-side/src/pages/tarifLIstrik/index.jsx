import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  fetchAllTarif,
  fetchDeleteTarif,
} from '../../redux/tarifListrik/actions';

import Sidebar from '../../components/Sidebar';
import PopUp from '../../components/PopUp';
import AddTarifModal from './addTarifModal';

export default function DataTarif() {
  const { tarifS, error } = useSelector((state) => state.tarifS);
  const [selectedTarif, setSelectedTarif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTarif());
  }, [dispatch]);

  const handleCreateTarif = () => {
    setIsEdit(false);
    setSelectedTarif(null);
    setIsModalOpen(true);
  };

  const handleEdit = (dataTarif) => {
    setIsEdit(true);
    setSelectedTarif(dataTarif);
    setIsModalOpen(true);
  };

  const handlePopUpDelete = () => {
    setIsPopUpOpen(true);
  };

  const handleDeleteTarif = (id) => {
    dispatch(fetchDeleteTarif(id));
    setIsPopUpOpen(false);
  };

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data Tarif Listrik</h1>
          <button
            onClick={handleCreateTarif}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tambah
          </button>
        </div>
        <hr className=" border border-gray-300 mb-10" />
        {error && (
          <p className="text-red-500">Gagal Mendapatkan Data {error}</p>
        )}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Daya Listrik
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Harga Tarif
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tarifS && tarifS.length > 0 ? (
                tarifS.map((tarif) => (
                  <tr key={tarif._id}>
                    <td className="text-center border border-gray-300 px-4 py-2">
                      {tarif.daya_listrik}
                    </td>
                    <td className="text-center border border-gray-300 px-4 py-2">
                      {tarif.harga_tarif}
                    </td>
                    <td className="grid grid-cols-2 border border-gray-300 px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEdit(tarif)}
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
                          handle={() => handleDeleteTarif(tarif._id)}
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
                    colSpan="3"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    Belum ada data tarif listrik yang ditambahkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {isModalOpen && (
        <AddTarifModal
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          dataTarif={selectedTarif}
        />
      )}
    </div>
  );
}
