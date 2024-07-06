import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import RequireAuth from './requireAuth';

// ADMIN
import Dashboard from '../pages/dashboard';
import DataUser from '../pages/users';
import DataPelanggan from '../pages/pelanggan';
import DataTarif from '../pages/tarifLIstrik';
import DataTagihan from '../pages/tagihan';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/*" element={<SignIn />} />
      <Route path="/signup/*" element={<SignUp />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/data-user/*" element={<DataUser />} />
        <Route path="/data-pelanggan/*" element={<DataPelanggan />} />
        <Route path="/data-tarif/*" element={<DataTarif />} />
        <Route path="/data-tagihan/*" element={<DataTagihan />} />
      </Route>
    </>
  )
);

export default router;
