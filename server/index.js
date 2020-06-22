const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
const port = 3002;

app.use('/static', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/api/:roomId/reviews', controller.reviews);
app.get('/api/:roomId/reviews/scores', controller.reviewScores);
app.get('/api/:roomId/reviews/overall', controller.reviewOverall);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
