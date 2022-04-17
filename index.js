const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres');


app.use(express.json());  // adding a piece of middleware
app.use('/vivdly.com/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
