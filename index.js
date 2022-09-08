const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('bodyParser'),
  uuid = require('uuid');
const app = express();

let topMovies = [
  {
    Title: "The Dark Knight",
    Description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Genre: { Name: "Thriller" },
    Director: { Name: "Christopher Nolan" },
    ImageURL: "https://media-cache.cinematerial.com/p/500x/udapnxr3/the-dark-knight-movie-poster.jpg?v=1456051180"
  },
  {
    Title: "Forrest Gump",
    Description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    Genre: { Name: "Drama" },
    Director: { Name: "Robert Zemeckis" },
    ImageURL: "https://media-cache.cinematerial.com/p/500x/hncfztv7/forrest-gump-movie-poster.jpg?v=1602182137"
  },
  {
    Title: "Back to the Future",
    Description: "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
    Genre: { Name: "Adventure" },
    Director: { Name: "Robert Zemeckis" },
    ImageURL: "https://media-cache.cinematerial.com/p/500x/puaqhix0/back-to-the-future-movie-poster.jpg?v=1596395664"
  },
  {
    Title: "The Thing",
    Description: "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
    Genre: { Name: "Horror" },
    Director: { Name: "John Carpenter" },
    ImageURL: "https://media-cache.cinematerial.com/p/500x/i9cipbg7/the-thing-movie-poster.jpg?v=1456281372"
  },
  {
    Title: "The Shining",
    Description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    Genre: { Name: "Horror" },
    Director: { Name: "Stanley Kubrick"},
    ImageURL: "https://media-cache.cinematerial.com/p/500x/errq6lzp/the-shining-movie-poster.jpg?v=1456289348"
  },
  {
    Title: "Alien",
    Description: "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
    Genre: { Name: "Horror" },
    Director: { Name: "Ridley Scott" },
    ImageURL: "https://media-cache.cinematerial.com/p/500x/p9j1hhoe/alien-movie-poster.jpg?v=1456821679"
  },
  {
    Title: "The Iron Giant",
    Description: "A young boy befriends a giant robot from outer space that a paranoid government agent wants to destroy",
    Genre: { Name: "Animation" },
    Director: { Name: "Brad Bird" },
    ImageURL: "https://media-cache.cinematerial.com/p/500x/mr2njuu5/the-iron-giant-movie-poster.jpg?v=1456347379"
  },
  {
    Title: "Saving Private Ryan",
    Description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    Genre: { Name: "War-Drama" },
    Director: { Name: "Steven Spielberg" },
    ImageURL: "https://media-cache.cinematerial.com/p/500x/timgoz1w/saving-private-ryan-movie-poster.jpg?v=1456232067"
  },
  {
    Title: "Toy Story",
    Description: "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
    Genre: { Name: "Animation" },
    Director: { Name: "JOhn Lasseter" },
    ImageURL: "https://xl.movieposterdb.com/13_05/1995/114709/xl_114709_6645f9fc.jpg"
  },
  {
    Title: "Mad Max: Fury Road",
    Description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    Genre: { Name: "Action" },
    Director: { Name: "George Miller" },
    ImageURL: "https://media-cache.cinematerial.com/p/500x/1wr9qndz/mad-max-fury-road-movie-poster.jpg?v=1456065394"
  },
];

// Provide access to static files
app.use(express.static('public'));

// Log data with Morgan
app.use(morgan('common'));


// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie website!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root:__dirname});
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('An error occurred');
});


app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});