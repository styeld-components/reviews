const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const newRelic = require('newrelic');
const controller = require('./controller.js');

const app = express();
const port = 3002;

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/reviews', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/:roomId/reviews/main', controller.reviewsMain);
// app.get('/:roomId/reviews/all', controller.reviewsAll);
// app.get('/:roomId/reviews/scores', controller.reviewScores);
// app.get('/:roomId/reviews/overall', controller.reviewOverall);

app.get('/:roomId/reviews/all', (req, res) => {
  console.log(req);
  res.send([]);
});
app.get('/:roomId/reviews/scores', (req, res) => {
  console.log(req);
  res.send([]);
});
app.get('/:roomId/reviews/overall', (req, res) => {
  console.log(req);
  res.send([]);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
