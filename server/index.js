const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');

const Reviews = require('../database/reviews.js');

app.use('/static', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/api/reviews', (req, res) => {
  Reviews.find({}).sort().exec((err, data) => {
    if (err) res.sendStatus(400);
    res.send(data);
  })
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));