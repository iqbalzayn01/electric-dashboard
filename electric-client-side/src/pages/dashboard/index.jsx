import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { userLogged } from '../../redux/auth/actions';
import { fetchAllUsers } from '../../redux/users/actions';
import { fetchAllPelanggan } from '../../redux/pelanggan/actions';
import { fetchAllTarif } from '../../redux/tarifListrik/actions';

import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { pelangganS } = useSelector((state) => state.pelangganS);
  const { tarifS } = useSelector((state) => state.tarifS);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      dispatch(fetchAllUsers());
      dispatch(fetchAllPelanggan());
      dispatch(fetchAllTarif());
    }
  }, [token, dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-10">
        <h1 className="text-3xl mb-1">Dashboard</h1>
        <p className="text-lg mb-3">Selamat datang di dashboard admin!</p>
        {token && (
          <>
            <h1 className="text-2xl">{`Halo, ${user.name}`}</h1>
          </>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-2">Total Users</h2>
            <p className="text-2xl">{users ? users.length : 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-2">Total Pelanggan</h2>
            <p className="text-2xl">{pelangganS ? pelangganS.length : 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-2">Total Tarif Listrik</h2>
            <p className="text-2xl">{tarifS ? tarifS.length : 0}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
