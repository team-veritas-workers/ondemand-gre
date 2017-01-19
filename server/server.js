'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/video', (req, res) => {
  console.log('body', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('RUNNING on 3000'));