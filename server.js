const http = require("node:http");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end('Test');
}).listen(1338, '127.0.0.1', () =>{
});;

server.on('upgrade', (request, socket, head) => {
  // socket.write('Hi from the server');
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
    'Upgrade: WebSocket\r\n' +
    'Connection: Upgrade\r\n' +
    '\r\n');

  socket.on('data', (data) => {
    console.log(data.toString());
    rl.question(">", (value) => {
      socket.write(value)
    })
  });

});

