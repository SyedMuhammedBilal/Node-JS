// How to create Routing in NodeJS

const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req.url) // print current url, in which we are standing right now

    if(req.url == '/') {
        res.end('Home Page');
    } else if(req.url == '/contact') {
        res.end('Contact page');
    } else {
        res.writeHead(404, { "Content-type": "text/html" }); // for telling that it is an error page and which document type is using;
        res.end('404, not found')
    }

    // res.end('Server listening');
});

const port = 8080

server.listen(port, () => {
    console.log('server started')
});