const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const students = ["alyssa", "jade", "ob", "sam"];

const server = http.createServer((request, response) => {
  const { method, url } = request

  if (method === "GET" && url === "/students") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json; charset=UTF-8");
    response.write(JSON.stringify(students));
  } else if (method === "POST" && url === "/students") {
    console.log("creating students");
  } else if (method === "GET" && url === "/favicon.ico") {
    console.log("stupid favicon");
  } else {
    console.log("404 not found");
    throw "Not found";
  }

  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`)
});