const http = require("node:http");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = http.createServer((request, response) => {
  //clientSocket.emit('data',new Buffer([1,2,3,4])); 
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end('Done');
});

server.listen(1337, '127.0.0.1', () =>{
  const req = http.request({
    port: 1338,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  });
  req.end();
  req.on('upgrade', (res, socket, upgradeHead) => {
    //socket.emit('data', 'Hello from the client side')
    socket.on('data', (data) => {
      console.log(data.toString());
      rl.question(">", (value) => {
        socket.write(value)
      })
    })
  });
});

// server.on('upgrade', (request, socket, head) => {
//   console.log("client upgraded");
//   setTimeout(() => {
//     socket.emit('data');
//   }, 1000);
// })
