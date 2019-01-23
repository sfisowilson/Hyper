
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var imdb = require('imdb-node-api');
const YtsApi = require('yts-api-pt');

var app = express();
app.listen(5200, function(){
    console.log("server started port 5200");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const yts = new YtsApi();

app.get(function(req, res, next){
    console.log("hitting");
    next();
});

app.post('/test', function(req, res){
    console.log(req.body);
    res.send(JSON.stringify({status: 200}));
});

app.get('/getMovieInfo', function(req, res){
  // let movie_id = req.query.movieId;
  // imdb.getMovie(movie_id, function (movie) {
  //     console.log("test movie");

  //     console.log(movie);
  //     // res.send(movie);
  //     res.json(movie);

  // }, function(error) {
  //     console.error(error);
  // });

  yts.getMovies({
    limit: 20,
    page: 2,
    quality: 'All',
    minimumRating: 0,
    genre: 'action',
    sortBy: 'date_added',
    orderBy: 'desc',
    withRtRatings: true
  }).then(results => {
     res.send(results);
  })
    .catch(err => console.error(err))
});

app.post('/api/posts', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  });
  
  app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
      id: 1, 
      username: 'brad',
      email: 'brad@gmail.com'
    }
  
    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token
      });
    });
  });
  
  // FORMAT OF TOKEN
  // Authorization: Bearer <access_token>
  
  // Verify Token
  function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }