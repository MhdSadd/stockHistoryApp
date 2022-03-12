const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5500;

// create a HTTP server with the express app instance
const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`server listening on port::: ${process.env.host}${PORT}`);
});
