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


/* [
  { id: uuidv1(), description: "Buy milk", due: "20/01/2020", completed: false },
  { id: uuidv1(), description: "Hang out laundry", due: "21/01/2020", completed: false },
  { id: uuidv1(), description: "Get a corgi", due: "22/01/2020", completed: false }
]
*/

module.exports.tasks = serverless(app);

// module.exports.tasks = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Woohoo! Your API is working!',
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
