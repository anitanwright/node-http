//this is the http module with the require function
const http = require('http');

const hostname = 'localhost';
const port = 3000;

// create server method using createServer node 
const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html'); //this will set the header in the body
    res.end('<html><body><h1>Hello World!</h1></body></html>');
});

//starts the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});