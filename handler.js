'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : '********',
  user     : '********',
  password : '********',
  database : '********'
});

// Retrieves tasks
app.get('/tasks', function (req, res) {

  connection.query('SELECT * FROM `task` WHERE `userID` = "1"', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    if(error) {
      console.error("Your query had an issue with fetching tasks", error);
      res.status(500).json({errorMessage: error})
    }
    else {
      res.json({
        tasks: results
      });
    }
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});

// Creates tasks
app.post('/tasks', function (req, res) {
  res.json({
    message: 'This is your POST function'
  });
});

// Updates tasks
app.put('/tasks/:id', function (req, res) {
  res.json({
    message: 'This is your PUT function'
  });
});

// Deletes tasks
app.delete('/tasks/:id', function (req, res) {
  res.json({
    message: 'This is your DELETE function'
  });
});

module.exports.tasks = serverless(app);