/**
 * Simple server
 */
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLocaleLowerCase();
  const queryStringObject = parsedUrl.query;
  const headers = req.headers;

  // get payload
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", (data) => {
    buffer += decoder.write(data);
  });
  req.on("end", () => {
    buffer += decoder.end();

    // choose handler
    const handler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : router[notFound];
    // prepare data for handlers
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
    };
    // Route the request to the router
    handler(data, (statusCode, payload) => {
        
    });

    res.end("Hello\n");
    console.log("Payload : ", buffer);
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`now on ${port}`);
});

const handlers = {};

handlers.sample = (data, callback) => {
  callback(406, { name: "sample handler" });
};

handlers.notFound = (data, callback) => {
  callback(404);
};

const router = {
  sample: handlers.sample,
};
