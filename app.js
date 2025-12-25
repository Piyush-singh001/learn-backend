const http = require("http");

function requestListener(req, res) {
  console.log("This is the first.js file.", req);
}

const server = http.createServer(requestListener);
const port = 3000;
server.listen(port, () => {
  console.log("Server is listening on http://localhost:" + port);
});
