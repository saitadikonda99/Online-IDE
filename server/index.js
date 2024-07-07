const http = require('http');
const express = require('express');
const { Server: SocketServer } = require('socket.io');
const pty = require('node-pty');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const PORT = 3001;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const io = new SocketServer(server, {
    cors: {
        origin: '*',
        methods:["POST","GET"]
    }
});

io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    const ptyProcess = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 120,
        rows: 50,
        cwd: process.env.PWD + '/IDE',
        env: process.env
    });
    
    socket.on('terminal:data', (data) => {
        ptyProcess.write(data);
    });

    ptyProcess.onData((data) => {
        socket.emit('terminal:data', data);
    });
    
    socket.on('disconnect', () => {
        console.log('Disconnected', socket.id);
        ptyProcess.kill();
    });
    
});

// imports start here
const fileTreeRoute = require('./routes/fileTree.Route');


// routes start here
app.use('/fileTree', fileTreeRoute);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🐳`);
})