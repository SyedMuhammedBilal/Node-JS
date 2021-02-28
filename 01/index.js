// How to create your own web server with NodeJS

const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Server listening');
});

const port = 8080

server.listen(port, () => {
    console.log('server started')
});