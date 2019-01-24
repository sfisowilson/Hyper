
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var imdb = require('imdb-node-api');
const YtsApi = require('yts-api-pt');
const TorrentSearchApi = require('torrent-search-api');

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
    test(results)
    .then(res => {
      console.log(res);
    })
  })
    .catch(err => console.error(err))
});
function test(results)
{
    const movies = results.data.movies
      const promises = movies.map( async movie => {
        return await imdb.getMovie(movie.imdb_code, function (movieData) {
        movie.movieData = movieData;
      });
    });
    return Promise.all(promises);
}


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


  // NEW THINGS
  
  app.get('/testing', async function(req, res){
      // const providers = TorrentSearchApi.getProviders();
      TorrentSearchApi.enablePublicProviders();
      const torrents = await TorrentSearchApi.search('2018', 'Movies', 10);  
      console.log('hello torrent providers');
      // console.log(torrents[0]);
      

      res.send("hello");
});


//   function titleExtract(title){
//     let bracket_match = title.match(/(.*?)[^(](\d\d\d\d)[^p]/);
//     if (bracket_match){
//         let name = bracket_match[1].replace(/\./g, " ");
//         title = name + " (" + bracket_match[2] + ")";
//     }
//     var new_title = (title.match(/[^[)]*/))[0] + ")";

//     return (new_title);
// }


// async function makeMovieList(torrents){
//     var movie_list = {};
//     var count = 1;

//     torrents.forEach(function(torrent_file){

//         imdb.searchMovies(torrent_file['title'],
//             function (movies) {

//             movie = movies[0];

//             // if movie in list check which is bigger seeds
//             if (! (movie['id'] in movie_list) ||
//                 ((movie['id'] in movie_list) && torrent_file['seeds'] >
//                                                 movie_list[movie['id']]['torrent']['seeds'])
//             ){
//                 movie_list[movie['id']] = ({
//                     video : movie ,
//                     torrent : torrent_file
//                 });
//             }

//             // when done log list
//             if (++count == torrents.length){
//                 console.log("finaly here -------", movie_list);
//             }

//         }, function(error) {
//             console.error(error);
//         });

//     });

//     //return (movie_list);
// };




// function getMovieInfo(movie_id, res){
//     imdb.getMovie(movie_id, function (movie) {
//         console.log("test movie");

//         // res.send(movie);
//         // res.json(movie);
//         // return (movie);

//         console.log(movie);
//     }, function(error) {
//         console.error(error);
//     });
// }


// /* GET home page. */
// app.get('/',

//     async function(req, res, next) {
    
//     console.log('start');

//     let search_phrase = '2018'
    
//     // torrent fetch
//     const TorrentSearchApi = require('torrent-search-api');
//     TorrentSearchApi.enableProvider('1337x');
//     const torrents = await TorrentSearchApi.search(search_phrase, 'Movies', 5);

//     // scraping tittles
//     torrents.forEach(function(torrent_file){
//         // console.log( torrent_file['title']);
//         let new_title = (titleExtract(torrent_file['title']));
//         torrent_file['title'] = new_title;
//     });
//     // console.log("torrntes", torrents);




//     var list = await (makeMovieList(torrents,res));
//     // await Promise.all(list).then(console.log("my lis : ", list));    
//     console.log("---- final movie list: ", list);


//     res.sendFile(path.join(__dirname + '/index2.html'));
//     // res.render('index', { title: 'Best website' });    
// });