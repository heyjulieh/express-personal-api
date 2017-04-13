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
    message: "Welcome to my Julie's personal api website! Here's what you need to know!",
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
    areTheseAlltheEndPoints: true,
    message: "Welcome to my Julie's personal api website! Here's what you need to know!",
    documentationUrl: "https://github.com/heyjulieh/express-personal-api/blob/master/README.md",
    baseUrl: "https://limitless-woodland-22503.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Everything you need to know about me"},
      {method: "POST", path: "/api/traveledto", description: "Places I've travelled"}
    ]
  })
});
/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
