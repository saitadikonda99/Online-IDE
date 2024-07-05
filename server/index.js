const http = require('http');
const express = require('express');
const { Server: SocketServer } = require('socket.io');
const pty = require('node-pty');

const app = express();
const server = http.createServer(app);
const PORT = 3001;


const io = new SocketServer(server, {
    cors: {
        origin: '*',

        methods:["POST","GET"]
    }
});

// io.attach(server);

const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD,
    env: process.env
});

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    
    socket.on('terminal:data', (data) => {
        ptyProcess.write(data);
    });

});

ptyProcess.onData((data) => {
    io.emit('terminal:data', data);
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🐳`);
})