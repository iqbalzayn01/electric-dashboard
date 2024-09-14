import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  PiHouse,
  PiUserCircleDashed,
  PiUsersThree,
  PiBagSimple,
  PiInvoice,
} from 'react-icons/pi';

import { clearToken } from '../../redux/auth/actions';

import PopUp from '../PopUp';

const dataMenus = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: <PiHouse />,
  },
  {
    name: 'Users',
    to: '/users',
    icon: <PiUserCircleDashed />,
  },
  {
    name: 'Customers',
    to: '/customers',
    icon: <PiUsersThree />,
  },
  {
    name: 'Cost of Electricity',
    to: '/cost-of-electricity',
    icon: <PiBagSimple />,
  },
  {
    name: 'Invoices',
    to: '/invoices',
    icon: <PiInvoice />,
  },
];

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
    <div className="w-64 bg-white text-white fixed rounded-xl m-5">
      <div className="flex flex-col justify-between h-[792px]">
        <ul className="py-4">
          <li className="px-4 mb-5">
            <Link
              to="/dashboard"
              className="flex items-center text-3xl font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="48px"
                className="fill-cyan-500"
              >
                <path d="M440-400v154q0 15 14.5 19t22.5-8l142-214q7-10 1.5-20.5T603-480h-83v-154q0-15-14.5-19t-22.5 8L341-431q-7 10-1.5 20.5T357-400h83Zm40 320q-137 0-228.5-94T160-408q0-62 28-124t70-119q42-57 91-107t91-87q8-8 18.5-11.5T480-860q11 0 21.5 3.5T520-845q42 37 91 87t91 107q42 57 70 119t28 124q0 140-91.5 234T480-80Zm0-80q104 0 172-70.5T720-408q0-73-60.5-165T480-774Q361-665 300.5-573T240-408q0 107 68 177.5T480-160Zm0-320Z" />
              </svg>
              <span className="text-cyan-500">Electric</span>
            </Link>
          </li>
          {dataMenus.map((menu) => {
            return (
              <li key={menu.name} className="w-full text-black px-4 py-2">
                <Link to={menu.to} className="flex items-center gap-1">
                  {menu.icon}
                  <span>{menu.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="w-full px-4 py-4">
          <button onClick={handlePopUpLogout} className="text-black">
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
