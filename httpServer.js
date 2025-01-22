const fs = require("node:fs").promises; 
const http = require("http");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    ServerFile(filePath, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const ServerFile = (filePath, res) => {
  fs.readFile(filePath)
    .then((content) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    })
    .catch((err) => {
      console.error("Error reading file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error: Unable to load file.");
    });
};

server.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
