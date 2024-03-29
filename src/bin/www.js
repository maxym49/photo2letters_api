#!/usr/bin/env node

/**
 * Module dependencies.
 */

const config = require("../../config.js");
const app = require("../app");
const debug = require("debug")("photo2letters-api:server");
const https = require("https");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

const options = {
  key: fs
    .readFileSync(path.join(__dirname, "../../static", "pk.key"))
    .toString(),
  cert: fs
    .readFileSync(path.join(__dirname, "../../static", "certificate.crt"))
    .toString()
};

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || global.gConfig.node_port;
app.set("port", port);

/**
 * Create HTTPS server.
 */

const server = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

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
 * Event listener for HTTPS server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question("Please specify the port to use:\n", answer => {
        server.listen(answer);
        rl.close();
      });
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTPS server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.info("\x1b[32m%s\x1b[0m", `App is running on port:${addr.port}`);
}
