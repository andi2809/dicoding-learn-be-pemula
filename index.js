const http = require("http");

const requestListener = (request, response) => {
	// header dulu (setHeader, status Code) baru tulis responseBody(response.write/ response.end)
	response.setHeader("Content-Type", "text/html");
	response.setHeader("Powered-By", "Node.js");
	// response.statusCode = 200;
	// response.statusMessage = "Berhasil"; // defaultnya bernilai "OK"

	const { method, url } = request;

	if (url == "/") {
		if (method === "GET") {
			response.statusCode = 200;
			response.write("<html>");
			response.write("<h1>");
			response.write("Kelas King");
			response.write("</h1>");
			response.write("<p>");
			response.write("Method Get pada halaman /");
			response.write("</>");
			response.write("</html>");
			response.end();
		}

		if (method === "POST") {
			let body = [];
			request.on("data", (chunk) => {
				body.push(chunk);
			});

			request.on("end", () => {
				body = Buffer.concat(body).toString();
				const { name } = JSON.parse(body);
				response.statusCode = 200;
				response.end(`<h1>Halo, ${name}! Ini adalah halaman index</h1>`);
			});
		} else {
			response.statusCode = 400; // halaman tidak dapat diakses menggunakan method tertentu
			response.end(`<h1>Halaman tidak dapat diakses dengan ${method} /</h1>`);
		}
	} else if (url == "/about") {
		if (method === "GET") {
			response.statusCode = 200;
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
				response.statusCode = 200;
				response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
			});

			// response.end("<h1>Method POST dengan url /about</h1>");
		} else {
			response.end("<h1>Method Selain GET dan POST dengan url /about</h1>");
		}
	} else {
		response.statusCode = 404;
		response.end("<h1>Halaman tidak ditemukan!</h1>");
	}
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
	console.log(`Server berjalan pada http://${host}:${port}`);
});
