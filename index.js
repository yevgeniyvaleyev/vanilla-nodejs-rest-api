/**
 * Simple server 
 */
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); 
    const method = req.method.toLocaleLowerCase();
    const queryStringObject = parsedUrl.query;
    const headers = req.headers;

    res.end('Hello\n');

    const log = [
        `Request received on path ${trimmedPath}`,
        `method: ${method}`,
        `query: ${JSON.stringify(queryStringObject)}`,
        `headers: ${JSON.stringify(headers)}`,
    ];
    console.log(log.map((logItem) => '- '+ logItem).join('\n'));
});

const port = 3001;
server.listen(port, () => {
    console.log(`now on ${port}`);
});
