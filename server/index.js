const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
const port = 3002;

app.use('/:roomId', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/:roomId/reviews/main', controller.reviewsMain);
app.get('/:roomId/reviews/all', controller.reviewsAll);
app.get('/:roomId/reviews/scores', controller.reviewScores);
app.get('/:roomId/reviews/overall', controller.reviewOverall);

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
