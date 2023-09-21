import { io } from 'socket.io-client';

const socket = io('https://socketserver-production-67f4.up.railway.app/chat',{
  withCredentials: true,
});

export default socket;