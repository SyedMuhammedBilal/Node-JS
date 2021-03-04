const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    // 1st Method without stream
    
    fs.readFile('./input.txt', (err, data) => {
        if(err) {
            return console.log(err)    
        }
        res.end(data.toString())
    })

    // 2nd method
    // Stream method
    /*
        1) data
        2) end
        3) error
        4) finish
    */

    const rStream = fs.createReadStream('input.txt');

    rStream.on('data', (chunkData) => {
        res.write(chunkData);
    });
    rStream.on('end', () => {
        res.end();
    });
    rStream.on('error', (err) => {
        console.log(err)
        res.end('Not Found')
    })
});

const port = 8081;

server.listen(port, '127.0.0.1');