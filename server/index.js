const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
const port = 3002;

app.use('/reviews', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/reviews/:roomId/main', controller.reviewsMain);
app.get('/reviews/:roomId/all', controller.reviewsAll);
app.get('/reviews/:roomId/scores', controller.reviewScores);
app.get('/reviews/:roomId/overall', controller.reviewOverall);

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
