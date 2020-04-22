const { Server } = require('http');

require('dotenv').config();

require = require('esm')(module);

const { initApp } = require('./src/app.js');
const { PORT } = process.env;
const app = initApp();

// Start the HTTP Server
const server = new Server(app);
server.listen(PORT, () => {
    console.log(`Server is up and running on Port ${PORT}`);
});