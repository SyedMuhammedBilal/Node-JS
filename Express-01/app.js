const express = require('express');

const app = express();

/*
    ====== API ======
    Get -------> read
    Post ------> create
    Put -------> update
    Delete ----> delete
*/

// app.route( "Route", "Callback function" ) ---> callback take two new arguments (req, res)
/*
    request(req) Object represent HTTP request like query string, parameters, body, HTTP headers etc
    response(res) Object represent HTTP response when it receives the HTTP request
*/

app.route('/', (req, res) => {
    
})