import axios from 'axios';

const LoginRequest = async (email, password) => {
  return await axios.post('/login', {
    user: { email, password }
  }).then((resp) => {
    const { data: { status: { data: { user } } }, headers: { authorization } } = resp;
    return { status: true, user: { ...user, token: authorization } };
  }).catch((error) => {
    const message = error.response.data;
    return { status: false, message };
  });
};

const LogoutRequest = async () => {
  return await axios.delete('/logout').then((resp) => {
    return { status: true };
  }).catch((error) => {
    const message = error.response.data;
    return { status: false, message };
  });
};

export {
  LoginRequest,
  LogoutRequest,
}