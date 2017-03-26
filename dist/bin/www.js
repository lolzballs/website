"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const fs = require("fs");
const http = require("http");
const app_1 = require("../app");
if (process.env.PORT.substring(0, 1) == "/") {
    fs.unlinkSync(process.env.PORT);
}
const port = normalizePort(process.env.PORT);
app_1.app.set('port', port);
const server = http.createServer(app_1.app);
server.listen(port);
server.on('error', onError);
server.on('listen', onListen);
function normalizePort(val) {
    const normalizedPort = parseInt(val, 10);
    if (isNaN(normalizedPort)) {
        return val;
    }
    if (normalizedPort >= 0) {
        return normalizedPort;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListen() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
