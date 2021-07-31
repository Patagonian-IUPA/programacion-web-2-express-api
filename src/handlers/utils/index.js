const express = require('express');
const clusterId = require('./clusterId');
const storage = require('./storage');

const routing = express.Router();

routing.get('/id', clusterId);
routing.get('/storage', storage);

module.exports = routing;
