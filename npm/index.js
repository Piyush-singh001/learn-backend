const http = require("http");

const server = http.createServer(() => {
  console.log("Server is created");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
