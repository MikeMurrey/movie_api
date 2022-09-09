const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const app = express();

// Middleware
app.use(morgan("common"));

app.use(express.static("public"));

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    userName: "Jordi97",
    favoriteMovies: []
  },
  {
    id: 2,
    userName: "Darmok",
    favoriteMovies: []
  },
  {
    id: 3,
    userName: "Jalad",
    favoriteMovies: ["The Thing"]
  }
];

let movies = [
  {
    "Title": "The Dark Knight",
    "Description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    "Genre": {
      "Name": "Crime Thriller",
      "Description": "Thrillers that have crime and justice as their primary focuses, usually with topics like murder, kidnapping, drugs, robbery, mistaken identity, etc. Usually the main character is a person who is fighting for justice, like a cop, lawyer, special agent, or even superhero (for example, Batman)."
    },
    "Director": {
      "Name": "Christopher Nolan",
      "Bio": "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made."
    },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/udapnxr3/the-dark-knight-movie-poster.jpg?v=1456051180"
  },
  {
    "Title": "Forrest Gump",
    "Description": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    "Genre": {
      "Name": "Drama",
      "Description": "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between."
    },
    "Director": {
      "Name": "Robert Zemeckis",
      "Bio": "Born on May 14, 1951 in Chicago, Illinois, Robert was a whiz-kid with special effects. Zemeckis is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985))."
    },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/hncfztv7/forrest-gump-movie-poster.jpg?v=1602182137"
  },
  {
    "Title": "Back to the Future",
    "Description": "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
    "Genre": {
      "Name": "Adventure",
      "Description": "Adventure Films are exciting stories, with new experiences or exotic locales. Adventure films are very similar to the action film genre, in that they are designed to provide an action-filled, energetic experience for the film viewer. Rather than the predominant emphasis on violence and fighting that is found in action films, however, the viewer of adventure films can live vicariously through the travels, conquests, explorations, creation of empires, struggles and situations that confront the main characters, actual historical figures or protagonists."
    },
    "Director": {
      "Name": "Robert Zemeckis",
      "Bio": "Born on May 14, 1951 in Chicago, Illinois, Robert was a whiz-kid with special effects. Zemeckis is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985))."
    },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/puaqhix0/back-to-the-future-movie-poster.jpg?v=1596395664"
  },
  {
    "Title": "The Thing",
    "Description": "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
    "Genre": {
      "Name": "Horror",
      "Description": "Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes. Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs."
    },
    "Director": {
      "Name": "John Carpenter",
      "Bio": "John Howard Carpenter was born in Carthage, New York on January 16, 1948. Since the 1970s, he has had numerous roles in the film industry including writer, actor, composer, producer, and director. After directing Dark Star (1974), he has helmed both classic horror films like Halloween (1978), The Fog (1980), and The Thing (1982), and noted sci-fi tales like Escape from New York (1981) and Starman (1984)."
    },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/i9cipbg7/the-thing-movie-poster.jpg?v=1456281372"
  },
  {
    "Title": "The Shining",
    "Description": "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    "Genre": {
      "Name": "Horror",
      "Description": "Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes. Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs."
    },
    "Director": {
      "Name": "Stanley Kubrick",
      "Bio": "Stanley Kubrick was born in Manhattan, New York City on July 26, 1928 and died on March 7, 1999. Kubrick was an American film director, producer, screenwriter, and photographer. Widely considered one of the greatest filmmakers of all time, his films, almost all of which are adaptations of novels or short stories, cover a wide range of genres and are noted for their realism, dark humor, extensive set designs, and innovative cinematography."
    },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/errq6lzp/the-shining-movie-poster.jpg?v=1456289348"
  },
  {
    "Title": "Alien",
    "Description": "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
    "Genre": {
      "Name": "Science fiction horror",
      "Description": "Science fiction horror films are a subgenre of science fiction and horror films, often revolving around subjects that include but are not limited to alien invasions, mad scientists, and/or experiments gone wrong."
    },
    "Director": {
      "Name": "Ridley Scott",
      "Bio": "Described by film producer Michael Deeley as \"the very best eye in the business\", director Ridley Scott was born on November 30, 1937 in South Shields, Tyne and Wear."
  },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/p9j1hhoe/alien-movie-poster.jpg?v=1456821679"
  },
  {
    "Title": "The Iron Giant",
    "Description": "A young boy befriends a giant robot from outer space that a paranoid government agent wants to destroy",
    "Genre": {
      "Name": "Animation",
      "Description": "Animations are not a strictly-defined genre category, but rather a film technique, although they often contain genre-like elements. Animation, fairy tales, and stop-motion films often appeal to children, but it would marginalize animations to view them only as \"children's entertainment.\" Animated films are often directed to, or appeal most to children, but easily can be enjoyed by all."
    },
    "Director": {
      "Name": "Brad Bird",
      "Bio": "Phillip Bradley \"Brad\" Bird was born on September 24, 1957 in Kalispell, Montana. He is an American director, screenwriter, animator, producer and occasional voice actor, known for both animated and live-action films."
    },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/mr2njuu5/the-iron-giant-movie-poster.jpg?v=1456347379"
  },
  {
    "Title": "Saving Private Ryan",
    "Description": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    "Genre": {
      "Name": "War Film",
      "Description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century. The fateful nature of battle scenes means that war films often end with them."
    },
    "Director": {
      "Name": "Steven Spielberg",
      "Bio": "Spielberg was born on December 18, 1946. One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else."
    },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/timgoz1w/saving-private-ryan-movie-poster.jpg?v=1456232067"
  },
  {
    "Title": "Toy Story",
    "Description": "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
    "Genre": {
      "Name": "Animation",
      "Description": "Animations are not a strictly-defined genre category, but rather a film technique, although they often contain genre-like elements. Animation, fairy tales, and stop-motion films often appeal to children, but it would marginalize animations to view them only as \"children's entertainment.\" Animated films are often directed to, or appeal most to children, but easily can be enjoyed by all."
  },
    "Director": {
      "Name": "John Lasseter",
      "Bio": "John Lasseter was born on January 12, 1957 in Hollywood, Los Angeles. He is an American animator, director and the chief creative officer at Pixar and Walt Disney Animation Studios. He is also currently the Principal Creative Advisor for Walt Disney Imagineering."
    },
    "ImageURL": "https://xl.movieposterdb.com/13_05/1995/114709/xl_114709_6645f9fc.jpg"
  },
  {
    "Title": "Mad Max: Fury Road",
    "Description": "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    "Genre": {
      "Name": "Action",
      "Description": "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero."
    },
    "Director": {
      "Name": "George Miller",
      "Bio": "Born on March 3, 1945 in Chinchilla, Queensland, Australia, George Miller is an Australian film director, screenwriter, producer, and former medical doctor. He is best known for his Mad Max franchise, with The Road Warrior (1981) and Mad Max: Fury Road (2015) being hailed as amongst the greatest action films of all time. Aside from the Mad Max films, Miller has been involved in a wide range of projects."
    },
    "ImageURL": "https://media-cache.cinematerial.com/p/500x/1wr9qndz/mad-max-fury-road-movie-poster.jpg?v=1456065394"
  },
];


// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to MyFlix!");
});

// List all movies
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// Get a single movie by Title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find((movie) => movie.Title === title);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not found.");
  }
});

// Get data about a genre by name
app.get("/movies/genres/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = topMovies.find((movie) => movie.Genre.Name === genreName).Genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre not found.");
  }
});

// Return data about a director


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occurred");
});


app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});