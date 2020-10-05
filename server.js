
const app = require('./app');
const http = require('http');
const config = require('./config/app-config');
// eslint-disable-next-line no-undef
const port = process.argv[2] || config.PORT;
const server = http.createServer();

server.listen(port, () => {
	console.log(`server hosted on localhost:${server.address().port}`);
});

server.on('request', app);