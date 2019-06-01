const express = require("express");
const projectsRouter = require('../data/routes/projectRouter');
const actionsRouter = require('../data/routes/actionRouter');
const configureMiddleware = require('../config/middleware.js');

const server = express();

// middleware 
configureMiddleware(server);

//projects middlware
server.use('/api/projects', projectsRouter);

//actions middlware
server.use('/api/actions', actionsRouter);


module.exports = server; 