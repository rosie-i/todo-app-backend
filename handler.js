'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (req, res) {

  
  res.json({
    tasks: [
      { id: 1, description: "Buy milk", due: "20/01/2020", completed: false },
      { id: 2, description: "Hang out laundry", due: "21/01/2020", completed: false },
      { id: 3, description: "Get a corgi", due: "22/01/2020", completed: false }
    ]
  });
});

module.exports.tasks = serverless(app);