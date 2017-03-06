require('dotenv').config();

import 'reflect-metadata';
import * as http from 'http';
import {app} from '../app';


const port = normalizePort(process.env.PORT);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listen', onListen);

function normalizePort(val) : boolean | number {
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
