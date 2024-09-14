import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { PiClock, PiCalendarDots } from 'react-icons/pi';
import moment from 'moment';
import 'moment-timezone';

import { userLogged } from '../../redux/auth/actions';
import { fetchAllUsers } from '../../redux/users/actions';

import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setCurrentTime(moment().tz(userTimeZone));

    const intervalId = setInterval(() => {
      setCurrentTime(moment().tz(userTimeZone));
    }, 1000);

    if (token) {
      dispatch(userLogged());
      dispatch(fetchAllUsers());
    }

    return () => clearInterval(intervalId);
  }, [token, dispatch]);

  const formattedDate = currentTime
    ? currentTime.format('dddd, DD MMMM YYYY')
    : '';
  const formattedTime = currentTime ? currentTime.format('h:mm:ss A') : '';

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1 ml-[276px] px-5 py-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-bold text-3xl mb-1">Dashboard</h1>
            <p className="text-lg mb-3">Welcome to the admin dashboard!</p>
            {token && (
              <>
                <h1 className="font-medium text-2xl">{`Hello, ${user?.name}`}</h1>
              </>
            )}
          </div>
          <div className="flex flex-col items-end gap-0">
            <div className="flex items-center gap-1">
              <PiCalendarDots />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <PiClock />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
