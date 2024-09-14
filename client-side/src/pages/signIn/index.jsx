import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { signIn } from '../../redux/auth/actions';

import FormSignIn from './formSignIn';

export default function SignIn() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(showLoading());
    setIsLoading(true);
    try {
      await dispatch(signIn(formData));
      setIsLoading(false);
      // dispatch(hideLoading());
      navigate('/dashboard');
    } catch (error) {
      console.error('Error login:', error);
      setError('email atau password salah!');
      setIsLoading(false);
      // dispatch(hideLoading());
    }
  };

  if (token) return <Navigate to="/dashboard" replace />;

  return (
    <section className="">
      <div className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
        <div className="self-center flex items-center text-3xl font-medium">
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
        </div>
        <h3 className="font-semibold text-2xl text-cyan-500 text-center">
          Sign In
        </h3>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <FormSignIn
          valueEmail={formData.email}
          valuePassword={formData.password}
          handleSubmit={handleSubmit}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
