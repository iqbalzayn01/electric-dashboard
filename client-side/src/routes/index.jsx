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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/*" element={<SignIn />} />
      <Route path="/signup/*" element={<SignUp />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/users/*" element={<DataUser />} />
      </Route>
    </>
  )
);

export default router;
