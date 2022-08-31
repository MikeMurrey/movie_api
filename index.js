const express = require('express'),
  morgan = require('morgan');
const app = express();

let topMovies = [
  {
    title: 'The Lord of the Rings',
    director: 'Peter Jackson'
  },
  {
    title: 'Star Wars',
    director: 'George Lucas'
  },
  {
    title: 'The Thing',
    director: 'John Carpenter'
  },
  {
    title: 'Predator',
    director: 'John McTiernan'
  },
  {
    title: 'John Wick',
    director: 'Chad Stahelski'
  },
  {
    title: 'The Iron Giant',
    director: 'Brad Bird'
  },
  {
    title: 'Star Trek',
    director: 'J. J. Abrams'
  },
  {
    title: 'Pirates of the Caribbean',
    director: 'Gore Verbinski'
  },
  {
    title: 'No Country for Old Men',
    director: 'Ethan Coen'
  },
  {
    title: 'Die Hard',
    director: 'John McTiernan'
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