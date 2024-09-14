import axios from 'axios';
import config from '../config';

const BASE_URL = config.base_url;

async function fetchWithToken(url, options = {}) {
  const authData = sessionStorage.getItem('auth');
  let token = null;
  if (authData) {
    const parsedAuthData = JSON.parse(authData);
    token = parsedAuthData.token;
  }

  try {
    return await axios(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    sessionStorage.removeItem('auth');
    console.error('Fetch error:', error);
    throw error;
  }
}

async function login({ email, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error response:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

async function signup({
  name,
  email,
  password,
  confirmPassword,
  no_telp,
  role,
}) {
  try {
    const response = await axios.post(`${BASE_URL}/sign-up`, {
      name,
      email,
      password,
      confirmPassword,
      no_telp,
      role,
    });
    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || 'An error occurred during signup');
    return { error: true, data: null };
  }
}

async function getUserLogged() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    return { error: false, data: response.data.data };
  } catch (error) {
    if (
      error.response &&
      error.response.status === 500 &&
      error.response.data.msg === 'jwt expired'
    ) {
      sessionStorage.removeItem('auth');
      window.location.href = '/signin';
      return { error: true, data: null, message: 'Token expired' };
    }
    return {
      error: true,
      data: null,
      message: error.response?.data?.msg || 'Fetch failed',
    };
  }
}

async function getAllUsers() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { error: true, data: null };
  }
}

async function updateUsers(id, userData) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: userData,
    });
    return { error: false, data: response.data.data };
  } catch (error) {
    alert(
      error.response?.data?.message || 'An error occurred while updating user'
    );
    return { error: true, data: null };
  }
}

async function deleteUser(id) {
  try {
    await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: false };
  } catch (error) {
    alert(
      error.response?.data?.message || 'An error occurred while deleting user'
    );
    return { error: true };
  }
}

async function createCustomers({ name, email, tariffID, address, no_telp }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/create-customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        tariffID,
        address,
        no_telp,
      },
    });
    return { error: false, data: response.data.data };
  } catch (error) {
    alert(
      error.response?.data?.message ||
        'An error occurred while creating Customers'
    );
    return { error: true, data: null };
  }
}

async function getAllCustomers() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/customers`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching Customers:', error);
    return { error: true, data: null };
  }
}

async function updateCustomers(id, dataCustomers) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataCustomers,
    });
    return { error: false, data: response.data.data };
  } catch (error) {
    alert(
      error.response?.data?.message ||
        'An error occurred while updating Customers'
    );
    return { error: true, data: null };
  }
}

async function deleteCustomers(id) {
  try {
    await fetchWithToken(`${BASE_URL}/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: false };
  } catch (error) {
    alert(
      error.response?.data?.message ||
        'An error occurred while deleting Customers'
    );
    return { error: true };
  }
}

async function registration({ userID, documentID, eventID }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/create-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userID,
        documentID,
        eventID,
      },
    });
    return { error: false, data: response.data.data };
  } catch (error) {
    alert(
      error.response?.data?.message ||
        'An error occurred while creating registration'
    );
    return { error: true, data: null };
  }
}

async function getAllRegistration() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/registration`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return { error: true, data: null };
  }
}

async function deleteRegistration(id) {
  try {
    await fetchWithToken(`${BASE_URL}/registration/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: false };
  } catch (error) {
    alert(
      error.response?.data?.message ||
        'An error occurred while deleting registration'
    );
    return { error: true };
  }
}

async function createTariff({ tariff, electrical_power }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/create-tariff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        tariff,
        electrical_power,
      },
    });
    return { error: false, data: response.data.data };
  } catch (error) {
    alert(
      error.response?.data?.message || 'An error occurred while creating tariff'
    );
    return { error: true, data: null };
  }
}

async function getAllTariff() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/tariff`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching tariff:', error);
    return { error: true, data: null };
  }
}

async function updateTariff(id, dataTariff) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/tariff/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataTariff,
    });
    return { error: false, data: response.data.data };
  } catch (error) {
    alert(
      error.response?.data?.message || 'An error occurred while updating tariff'
    );
    return { error: true, data: null };
  }
}

async function deleteTariff(id) {
  try {
    await fetchWithToken(`${BASE_URL}/tariff/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: false };
  } catch (error) {
    alert(
      error.response?.data?.message || 'An error occurred while deleting tariff'
    );
    return { error: true };
  }
}

export {
  login,
  signup,
  getUserLogged,
  getAllUsers,
  updateUsers,
  deleteUser,
  createCustomers,
  getAllCustomers,
  updateCustomers,
  deleteCustomers,
  registration,
  getAllRegistration,
  deleteRegistration,
  createTariff,
  getAllTariff,
  updateTariff,
  deleteTariff,
};
