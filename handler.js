'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_SCHEMA
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
  // Accept info from client about what task is being created
  const taskToInsert = req.body;
  taskToInsert.taskID = uuidv4();
  taskToInsert.completed = false;
  taskToInsert.userID = 1;

  // Take that info and populate a SQL INSERT statement
    // Execute statement
  connection.query('INSERT INTO `task` SET ?', taskToInsert, function (error, results, fields) {
    if (error) {
      console.error("Your query had an issue with inserting a new task", error);
      res.status(500).json({errorMessage: error})
    }
    else {
      // Return to the client info about the task that has been created
      res.json({
        task: taskToInsert
      });
    }
  });
});

// Updates tasks
app.put('/tasks/:id', function (req, res) {

  // Get the task ID to edit from endpoint
  const taskToEditID = req.params.id;

  // Use SQL command UPDATE task SET completed = true WHERE taskID = taskIDFromEndpoint

  connection.query('UPDATE `task` SET `completed` = true WHERE `taskID` = ?', taskToEditID, function (error, results, fields) {
    if (error) {
      console.error("Your query had an issue with editing a task", error);
      res.status(500).json({errorMessage: error})
    }
    else {    
    // Return to the client info about the task that has been edited
      res.json({
        message: 'Your edit function was successful - task marked as completed',
        taskEditedID: taskToEditID
      });
    }
  });
});





// Deletes tasks
app.delete('/tasks/:id', function (req, res) {

  // Get the task ID to delete from endpoint
  const taskToDeleteID = req.params.id;
  
  // Use SQL command DELETE FROM task WHERE taskID = taskIDFromEndpoint;
  connection.query('DELETE FROM `task` WHERE `taskID` = ?', taskToDeleteID, function (error, results, fields) {
    if (error) {
      console.error("Your query had an issue with deleting a task", error);
      res.status(500).json({errorMessage: error})
    }
    else {    
    // Return to the client info about the task that has been deleted
      res.json({
        message: 'Your delete function was successful',
        taskDeletedID: taskToDeleteID
      });
    }
  });
});

module.exports.tasks = serverless(app);