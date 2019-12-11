const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const engine = require('../engine/engine');
const { promisify } = require('util');

const connectIO = require('../handlers/socketHandlers');
const router = require('../router/router');

// Constants
const PORT = 3000 || process.env.PORT;

const init = async function() {
    const app = express();
    const server = http.createServer(app);
    const io = require('socket.io').listen(server);

    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use('/', router);

    engine.init(app);
    connectIO(io);

    await promisify(server.listen).call(server, PORT);

    console.log(`>>> Server has been running at port ${PORT}`);
};

module.exports = { init };
