// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

function logRequestInfo(req, res, next){
  console.log(`\nRECEIVED REQUEST : ${req.method} ${req.url}`);
  console.log('query params:', req.query);
  console.log('body:', req.body);
  next();
}
app.use(logRequestInfo);

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    areTheseAlltheEndPoints: true,
    message: "Welcome to Julie's personal api website! Here, you'll find some information about me!",
    documentationUrl: "https://github.com/heyjulieh/express-personal-api/blob/master/README.md",
    baseUrl: "https://limitless-woodland-22503.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Everything you need to know about me"},
      {method: "GET", path: "/api/traveledto", description: "Index of places I've travelled"},
      {method: "POST", path: "/api/traveledto", description: "Create a new place entry you want to travel with me to"},
      {method: "PUT", path: "/api/traveledto", description: "Edit a previous place entry you want to travel with me to"},
      {method: "DELETE", path: "/api/traveledto", description: "Delete a previous place entry you want to travel with me to :T"},
    ]
  })
});

app.get('/api/profile', function apiProfile(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    profileImageUrl: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAiEAAAAJGE5NmE3NWQwLWIwZTYtNDYxOC1hNGY1LTBmYmI5ODhiZmZiOQ.jpg",
    gender: "Female",
    message: "Here's some basic information about me!",
    age: 29,
    hometown: "Los Angeles, CA",
    ethnicity: "Chinese",
    currentCity: "Oakland, CA",
    parents: {
      mother: "Xiu Zhu Huang",
      father: "Kent C. Huang"
    },
    relationshipStatus: "Taken",
    employed: true,
    placesEmployedAt: [
      {name: "Gap Inc./Banana Republic",
      title: "Inventory Planner",
      years: 1},
      {name: "Nelson Nygaard",
      title: "Associate Planner",
      years: 1},
      {name: "San Mateo County Transit District",
      title: "Transit Planner",
      years: 3}
    ],
    studentAtGA: true,
    linkedInUrl: "https://www.linkedin.com/in/jliehng/",
    })
});

app.get('/api/traveledto', function apiProfile(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
res.json({
  locations: [
      {country: "Japan",
      state: null,
      city: "Tokyo",
      month: "February",
      year: 2016,
      length: "1 week",
      fun: true},
      {country: "United States",
      state: "Utah",
      city: "Salt Lake City",
      month: "September",
      year: 2016,
      length: "3 days",
      fun: true},
      {country: "United States",
      state: "Texas",
      city: "Austin",
      month: "February",
      year: 2017,
      length: "3 days",
      fun: true},
      {country: "Canada",
      state: "British Columbia",
      city: "Vancouver",
      month: "August",
      year: 2016,
      length: "5 days",
      fun: true}
    ]
  });
});

// Create a new travel location
app.post('/api/traveledto', function (req, res) {
  // create new travel location with form data (`req.body`)
  var newTravelPlan = new db.Traveledto({
    city: req.body.city,
    country: req.body.country,
  });
});

db.Country.findOne({name: req.body.country}, function(err, country){
    if (err) {
      return console.log(err);
    }
    // if that author doesn't exist yet, create a new one
    if (author === null) {
      db.Country.create({name:req.body.country}, function(err, newCountry) {
        createCitywithCountryAndRespondTo(newCity, newCountry, res);
      });
    } else {
      createCityWithCountryAndRespondTo(newCity, country, res);
    }
  });
});

function createBookWithAuthorAndRespondTo(book, author, res) {
  // add this author to the book
  book.author = author;
  // save newBook to database
  book.save(function(err, book){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", book.title);
    // send back the book!
    res.json(book);
  });
}

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  db.Book.findOneAndRemove({ _id: bookId })
    .populate('author')
    .exec(function (err, deletedBook) {
      res.json(deletedBook);
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
