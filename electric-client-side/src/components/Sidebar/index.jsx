import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { clearToken } from '../../redux/auth/actions';

import PopUp from '../PopUp';

export default function Sidebar() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePopUpLogout = () => {
    setIsPopUpOpen(true);
  };

  const handleLogout = () => {
    dispatch(clearToken());
    setIsPopUpOpen(false);
    navigate('/signin');
  };

  return (
    <div className="w-64 h-screen bg-cyan-600 text-white fixed">
      <div className="flex flex-col justify-between h-screen">
        <ul className="py-4">
          <li className="px-4 mb-5">
            <Link to="/dashboard" className="text-3xl font-medium">
              Electric
              {/* <i>Admin</i> */}
            </Link>
          </li>
          <hr className="mx-4 mb-4" />
          <li className="w-full hover:bg-cyan-700 px-4 py-4 mb-4">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="w-full hover:bg-cyan-700 px-4 py-4 mb-4">
            <Link to="/data-user">Data User</Link>
          </li>
          <li className="w-full hover:bg-cyan-700 px-4 py-4 mb-4">
            <Link to="/data-pelanggan">Data Pelanggan</Link>
          </li>
          <li className="w-full hover:bg-cyan-700 px-4 py-4 mb-4">
            <Link to="/data-tarif">Data Tarif Listrik</Link>
          </li>
          <li className="w-full hover:bg-cyan-700 px-4 py-4 mb-4">
            <Link to="/data-tagihan">Data Tagihan</Link>
          </li>
        </ul>
        <div className="w-full hover:bg-cyan-700 px-4 py-4 mb-4">
          <button onClick={handlePopUpLogout} className="">
            Log out
          </button>
        </div>
      </div>
      {isPopUpOpen && (
        <PopUp
          handle={handleLogout}
          onClose={() => setIsPopUpOpen(false)}
          textPopUp="Apakah anda yakin ingin keluar?"
          classNameBtn="bg-red-500"
          textBtn="Log out"
        />
      )}
    </div>
  );
}
