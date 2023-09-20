import { io } from 'socket.io-client';

const socket = io('http://localhost:5050/chat',{
  withCredentials: true,
});

export default socket;