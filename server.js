// Libraries
var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

// Create the app
var app = express();

// Setup socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Setup app
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Define data model
var Movie = mongoose.model('Movie',{
  name : String
})
var Winner = mongoose.model('Winner',{
  name : String,
  winnings: Number
})

// Endpoint to get the movie of the game
app.get('/movie', (req, res) => {
  // Get a random document from database
  Movie.aggregate([{ $sample: { size: 1 } }],(err, movie)=> {
    // Send the movie to client
    res.send(movie);
  })
});

// Endpoint to get messages
app.get('/winners', (req, res) => {
  Winner.find({},(err, messages)=> {
    res.send(messages);
  }).sort({winnings: -1});
})

// Endpoint to create a winner
app.post('/winner', (req, res) => {

  // Create the query, update and options
  let query = { name: req.body.name }, // Query by name
    update = { $inc: { winnings: 1} }, // Increment the winnings
    options = { upsert: true, 
      new: true, 
      setDefaultsOnInsert: true,
      useFindAndModify: false };

  // Update the document or create a new one
  Winner.findOneAndUpdate(query, update, options, function(error, result) {
    // Check if there's an error
    if (error)
      sendStatus(500);
    // Emit a socket.io notification
    io.emit('winner', req.body);
    // Return an Ok status
    res.sendStatus(200);
  });  
})

// Create a socket.io connection
io.on('connection', () =>{
  console.log('a user is connected')
})

// Connect to database
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost:27017/hangman',(err) => {
  console.log('mongodb connected',err);
})

// Execute the app
var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});