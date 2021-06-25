import express = require('express');

const app = express();

app.listen(3000, () => { console.log("Server is running on port 3000"); })

app.get('/test', (request, response) => {
  return response.send("ola mundo!");
});

app.post('/test-post', (request, response) => {
  
});