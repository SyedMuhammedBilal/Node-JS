const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url == '/') {
        res.end('Welcome to Home Page')
    } else if(req.url == '/api') {
        fs.readFile(`${__dirname}/api/data.json`, 'utf-8', (data, err) => {
            if(err) {
                console.log(err)
            } else {
                console.log(data)
            }
        })
    }
})

const port = 8080;

server.listen(port, () => {
    console.log('server listening')
})