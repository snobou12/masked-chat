import io from 'socket.io-client';

const socket = io('http://localhost:3001',{
    query: { token: localStorage.getItem("masked-token") }
    
});

export default socket;