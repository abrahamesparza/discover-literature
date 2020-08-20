const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { getBooks } = require('../api/helper');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join('public')))

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.post('/search', (req, res) => {
  let query = req.body.q;
  //write function in api/helpers.js file to make request with the query to API to retrieve data
  console.log('query', query)
  getBooks(query, (err, data) => {
    let results = JSON.parse(data.body)
    console.log('results', results)
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results.items);
    }
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
