const cluster = require('cluster');

module.exports.getClusterId = () =>
  cluster.isWorker ? cluster.worker.id : '#';
