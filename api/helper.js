// api url GET https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apiKey}

let { apiKey } = require('./key');
let request = require('request');
const { get } = require('request');

const getBooks = (title, callback) => {
  let url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apiKey}&maxResults=40`
  request(url, (err, body) => {
    if (err) {
      callback(err);
    } else {
      callback(null, body);
    }
  })
}

module.exports.getBooks = getBooks;