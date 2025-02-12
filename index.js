const http = require("http");

const requestListener = (request, response) => {
	response.setHeader("Content-Type", "text/html");
	response.statusCode = 200;

	const { method, url } = request;

	if (url == "/") {
		if (method === "GET") {
			response.end("<h1>Method GET dengan url /</h1>");
		}

		if (method === "POST") {
			let body = [];
			request.on("data", (chunk) => {
				body.push(chunk);
			});

			request.on("end", () => {
				body = Buffer.concat(body).toString();
				const { name } = JSON.parse(body);
				response.end(`<h1>Halo, ${name}! Ini adalah halaman index</h1>`);
			});
		} else {
			response.end("<h1>Method Selain GET dan POST dengan url /</h1>");
		}
	} else if (url == "/about") {
		if (method === "GET") {
			response.end("<h1>Method GET dengan url /about</h1>");
		}

		if (method === "POST") {
			let body = [];
			request.on("data", (chunk) => {
				body.push(chunk);
			});

			request.on("end", () => {
				body = Buffer.concat(body).toString();
				const { name } = JSON.parse(body);
				response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
			});

			// response.end("<h1>Method POST dengan url /about</h1>");
		} else {
			response.end("<h1>Method Selain GET dan POST dengan url /about</h1>");
		}
	} else {
		response.end("<h1>URL BEBAS</h1>");
	}
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
	console.log(`Server berjalan pada http://${host}:${port}`);
});
