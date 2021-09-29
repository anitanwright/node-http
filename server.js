//this is the http module with the require function
const http = require('http');

const hostname = 'localhost';
const port = 3000;

//core modules used to retreive info from the html files 
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    // methods used to get the requested urls to display
    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') { 
            fileUrl = '/index.html';
        }
    // absolute path of the file requested converted to relative path 
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

    // only grant request to html files
        if (fileExt === '.html') {
            fs.access(filePath, err => {
                if (err) { //happens when there is no valid file path
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return; //stops the file from going any further
                }
                //happens when the file path is valid
                res.statusCode = 200; 
                res.setHeader('Content-Type', 'text/html');
                //sends file and reads content of what is requested as necessary
                fs.createReadStream(filePath).pipe(res);
            });
            //if the file is not HTML, this will happen
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});


//starts the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});