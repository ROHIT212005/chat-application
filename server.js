const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const users = {};
const rooms = ['general', 'javascript', 'webdev'];

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', ({ username, room }) => {
        users[socket.id] = { username, room };
        socket.join(room);
        io.to(room).emit('message', { text: `${username} joined the room`, sender: 'System', time: new Date().toLocaleTimeString() });
        io.to(room).emit('updateUsers', Object.values(users).filter(u => u.room === room));
        io.emit('updateRooms', rooms);
    });

    socket.on('sendMessage', ({ message, username, room }) => {
        io.to(room).emit('message', {
            text: message,
            sender: username,
            time: new Date().toLocaleTimeString()
        });
    });

    socket.on('createRoom', (newRoom) => {
        if (!rooms.includes(newRoom)) {
            rooms.push(newRoom);
            io.emit('updateRooms', rooms);
        }
    });

    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            io.to(user.room).emit('message', { text: `${user.username} left the room`, sender: 'System', time: new Date().toLocaleTimeString() });
            delete users[socket.id];
            io.to(user.room).emit('updateUsers', Object.values(users).filter(u => u.room === user.room));
        }
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});