const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Reviews = require('../database/reviews.js');

const app = express();
const port = 3002;

app.use('/static', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/api/:productId/reviews', (req, res) => {
  Reviews.find({}).sort({ date: -1 }).exec((err, data) => {
    if (err) res.sendStatus(400);
    res.send(data);
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
