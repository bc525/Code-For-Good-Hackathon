const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const cors = require('cors')

require('dotenv').config();

const app = express();

  // Middleware
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
});

// app.use('/', function(req, res, next) {
//   res.send("Hello world");
// });

  // API routes
  app.use('/api/user', userRoutes);
  app.use('/api/post', postRoutes);

  // Start the server
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
