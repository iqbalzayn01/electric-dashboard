import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchAllPelanggan } from '../../redux/pelanggan/actions';

import Sidebar from '../../components/Sidebar';

export default function DataTagihan() {
  const { pelangganS, error } = useSelector((state) => state.pelangganS);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPelanggan());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data Tagihan Pelanggan</h1>
        </div>
        <hr className="border border-gray-300 mb-10" />
        {error && (
          <p className="text-red-500">Gagal memuat Data Pelanggan {error}</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border border-gray-300">
                  No
                </th>
                <th className="text-left px-4 py-2 border border-gray-300">
                  Nama
                </th>
                <th className="text-left px-4 py-2 border border-gray-300">
                  Nomor Telepon
                </th>
                <th className="text-left px-4 py-2 border border-gray-300">
                  Alamat
                </th>
                <th className="text-left px-4 py-2 border border-gray-300">
                  Tagihan
                </th>
                <th className="text-left px-4 py-2 border border-gray-300">
                  Daya Listrik
                </th>
              </tr>
            </thead>
            <tbody>
              {pelangganS && pelangganS.length > 0 ? (
                pelangganS.map((pelanggan, index) => (
                  <tr key={pelanggan._id} className="border-t">
                    <td className="px-4 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.no_telp}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.alamat}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.tarifID.harga_tarif}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pelanggan.tarifID.daya_listrik}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
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
    </div>
  );
}
