const Fastify = require("fastify");
const path = require("path");
const fastifyStatic = require("@fastify/static");
const { Server } = require("socket.io");

const fastify = Fastify({ logger: true });

// Serve static files
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
});

// Create an HTTP server for Socket.IO
const server = fastify.server;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("uiData", ({ speed, person }) => {
    const data = {
      latitude: -13,
      longitude: -71,
      speed,
      person,
      fixQuality: 1,
      satellites: 10,
      altitude: 1000,
      timestamp: Date.now(),
      bearing: 10,
      fix: 3,
      hdop: null,
      vdop: null,
      pdop: null,
    };
    io.emit("gpsData", data);
  });
});

fastify.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
