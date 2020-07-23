const newRelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const controller = require('./controller.js');
const numCPUs = require('os').cpus().length;

const port = 3002;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
} else {
  // Workers share the TCP connection in this server
  const app = express();

  app.use(cors());
  app.use('/', express.static(path.join(__dirname, '../client/dist')));
  app.use('/:roomId', express.static(path.join(__dirname, '../client/dist')));
  app.use('/reviews', express.static(path.join(__dirname, '../client/dist')));
  app.use(bodyParser.json());

  app.get('/:roomId/reviews/main', controller.reviewsMain);
  app.get('/:roomId/reviews/all', controller.reviewsAll); // for modal
  app.get('/:roomId/reviews/scores', controller.reviewScores);
  app.get('/:roomId/reviews/overall', controller.reviewOverall);

  app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
}
