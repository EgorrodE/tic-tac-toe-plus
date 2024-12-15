import axios from 'axios';

const CreateRequest = async () => {
  if (!axios.defaults.headers.common['Authorization']) return { status: false };

  return await axios.post('/sessions', {}).then((resp) => {
    const { data: { secret } } = resp;
    return { status: true, secret };
  }).catch((error) => {
    const message = error.response.data;
    return { status: false, message };
  });
};

const JoinRequest = async (secret) => {
  if (!axios.defaults.headers.common['Authorization']) return { status: false, message: '' };

  return await axios.post('/sessions/join', { secret }).then((resp) => {
    const { data: { session } } = resp;
    return { status: true, session };
  }).catch((error) => {
    const message = error.response.data;
    return { status: false, message };
  });
};

const MoveRequest = async (secret, move) => {
  if (!axios.defaults.headers.common['Authorization']) return { status: false, message: '' };

  return await axios.post('/sessions/move', { secret, move }).then((resp) => {
    const { data: { session } } = resp;
    return { status: true, session };
  }).catch((error) => {
    const message = error.response.data;
    return { status: false, message };
  });
};

export {
  CreateRequest,
  JoinRequest,
  MoveRequest
}