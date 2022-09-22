const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
  mongoose = require('mongoose');
  Models = require('./models.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Middleware
app.use(morgan("common"));

app.use(express.static("public"));

// USER RELATED OPTIONS

// Get list of users
app.get("/users", (req, res) => {
  res.json(users);
});

// Create a new user
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Users require a name.")
  }
});

// Update Username
app.put("/users/:id", (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;
  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("Bad Request - User does not exist.");
  }
});

// Add a movie to favorites list
app.post("/users/:id/:movieTitle", (req, res) => {
  const {id, movieTitle} = req.params;

  let user = users.find(user => user.id == id); //finds the proper user

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s favorites list.`);
  } else {
    res.status(400).send("User not found.");
  }
});

// Remove a movie from favorites list
app.delete("/users/:id/:movieTitle", (req, res) => {
  const {id, movieTitle} = req.params;

  let user = users.find(user => user.id == id); //finds the proper user

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s favorites list.`);
  } else {
    res.status(400).send("User not found.");
  }
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const {id} = req.params;

  let user = users.find(user => user.id == id); //finds the proper user

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`User ${id} has been deleted.`);
  } else {
    res.status(400).send("User not found.");
  }
});

// DEFAULT RESPONSE
app.get("/", (req, res) => {
  res.send("Welcome to MyFlix!");
});


//MOVIE INFO RELATED OPTIONS

// List all movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// Get a single movie by Title
app.get("/movies/:title", (req, res) => {
  const {title} = req.params;
  const movie = movies.find((movie) => movie.Title === title);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not found.");
  }
});

// Get data about a genre by name
app.get("/movies/genres/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre not found.");
  }
});

// Return data about a director
app.get("/movies/directors/:directorName", (req, res) => {
  const {directorName} = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Director not found.");
  }
});



// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occurred");
});


app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});