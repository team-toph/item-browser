const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('/api/products:id', (req, res) => {
  res.status(200).send(req.params);
  //find the product with the passed in id
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));