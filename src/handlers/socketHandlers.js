function connectIO(io) {
    io.sockets.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log('user disconnect');
        });
        socket.on('message', (event) => {
            io.emit('addMessage', event);
        });
    });
}

module.exports = connectIO;
