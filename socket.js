let socket_io = require('socket.io');
const db = require('./queries');
let io = socket_io();
let socketApi = {};
//Your socket logic here
io.on('connection', (socket) => {
  console.log('a user connected');
  // socket.on('create', async function (msg) {
  //   const id = await db.createUser({ body: JSON.parse(msg) });
  //   if (id) socket.emit('created', id.toString());
  // })
});

socketApi.io = io;
module.exports = socketApi;