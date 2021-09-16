import io from 'socket.io-client';


const ENDPOINT = 'localhost:3000';

const getSocket = (token) => io(ENDPOINT, {
  auth: {
    token: `Bearer ${token}`,
  },
});

export default getSocket;