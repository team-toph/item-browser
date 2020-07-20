const server = require("../server/index.js");
const axios = require('axios');

const api = axios.create({ baseURL: 'http://18.191.148.100:3000'});


afterAll(() => {
  try {
    server.close();
  } catch (error) {
    console.log(error);
  }
});


 test('the server returns data that exists with status 200', (done) => {
  function callback(response) {
    try {
      expect(response.status).toBe(200);
      expect(response.data._id).toBe('5ef2760055d4085a0be8980e');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);

  function fetchData(callback) {
    // Make a request for a user with a given ID
    api.get('/api/products?id=5ef2760055d4085a0be8980e')
    .then((response) => {
      callback(response);
    })
    .catch(function (error) {
      callback(error);
    })
  }
});

