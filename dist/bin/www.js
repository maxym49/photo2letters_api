#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var config = require('../../config.js');

var app = require('../app');

var debug = require('debug')('photo2letters-api:server');

var http = require('http');

var readline = require('readline');
/**
 * Get port from environment and store in Express.
 */


var port = process.env.PORT || global.gConfig.node_port;
app.set('port', port);
/**
 * Create HTTP server.
 */

var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Please specify the port to use:\n', function (answer) {
        server.listen(answer);
        rl.close();
      });
      break;

    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.info('\x1b[32m%s\x1b[0m', "App is running on port:".concat(addr.port));
}
//# sourceMappingURL=www.js.map