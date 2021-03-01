const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url == '/') {
        res.end('Welcome to Home Page')
    } else if(req.url == '/api') {
        fs.readFile(`${__dirname}/api/data.json`, 'utf-8', (data, err) => {
            if(err) {
                res.writeHead(500, {"Content-type": "application/json"})
                console.log(err)
            } else {
                console.log(data);
                res.writeHead(200, {"Content-type": "application/json"})
                res.end(data)
            }
        })
    }
})

const port = 8080;

server.listen(port, () => {
    console.log('server listening')
})