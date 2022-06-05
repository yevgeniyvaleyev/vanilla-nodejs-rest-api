/**
 * Simple server 
 */
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); 

    res.end('Hello\n');

    console.log(`Request recieved on path ${trimmedPath}`);
});

server.listen(3001, () => {
    console.log('now on 3000');
});
