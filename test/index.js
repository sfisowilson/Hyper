
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var imdb = require('imdb-node-api');
const YtsApi = require('yts-api-pt');
const TorrentSearchApi = require('torrent-search-api');
const utility = require('./node_modules/imdb-node-api/lib/utility.lib');


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
  

   app.post('/getlinks', async function(req, res){
     TorrentSearchApi.enablePublicProviders();
      const torrents = await TorrentSearchApi.search(req.body.query, 'Movies', 2);

      // scraping tittles
      torrents.forEach(function(torrent_file){
          let new_title = (titleExtract(torrent_file['title']));
          torrent_file['title'] = new_title;
          // console.log(new_title);
        });
      
      console.log(torrents);
      console.log('hello torrent providers');
       res.send(JSON.stringify(torrents));
   });

  app.get('/testing', async function(req, res){
      // TorrentSearchApi.enablePublicProviders();
      // const torrents = await TorrentSearchApi.search('2018', 'Movies', 2);

      // // scraping tittles
      // torrents.forEach(function(torrent_file){
      //     let new_title = (titleExtract(torrent_file['title']));
      //     torrent_file['title'] = new_title;
      //     // console.log(new_title);
      //   });
      
      // console.log('hello torrent providers');
      // const torrentData = testmix(torrents);
      // console.log(testmix(torrents));
      // testmix(torrents).
      // then((x)=> console.log(x)).
      // catch(err => console.log('error'));
      
      // .then(async  movieList => {
      //   await console.log(movieList);
      // })
      // res.send("hello");

    //  const Test = await serialAsyncMap(torrents, searchMovies);
    //  console.log('Test');
    //  console.log(Test);
    //   res.json(Test);
  console.log("got request....");
    yts.getMovies({
    limit: 10,
    page: 1,
    quality: 'All',
    minimumRating: 0,
    genre: 'action',
    sortBy: 'date_added',
    orderBy: 'desc',
    withRtRatings: true
  }).then(results => {
    console.log(results);
       res.send(JSON.stringify(results));
  })
    .catch(err => console.error(err))
});

function serialAsyncMap(collection, fn) {

  let results = [];
  let promise = Promise.resolve();

  for (let item of collection) {
    promise = promise.then(() => {
      return fn('test').then(result => {
        console.log('rererereresults');
        console.log(result);
        results.push(result);
      });
    });
  }
  return promise.then((results) => {
    return results;
  });
}
  async function testmix(movie) {
        imdb.searchMovies('xmen', function (movies) {
            console.log(movies);
        }, function(error) { 
            console.error(error);
        });
  }

      //    for (movie of movies) {

      //      console.log(movie.title);
      //     let resp =  await imdb.searchMovies(movie.title);
      //    let newjs = await resp.json();
      //      console.log(newjs);
      //  }
        // return movies;
      // return (Promise.map(movies, function (item) {
      //   return imdb.searchMovies(item.title)
      //       .then(function(results)
      //       {
      //         item.extra = results[0];
      //         return item;
      //       })
      //       .catch(function (err) {
      //         console.log(err);
      //       });
      // }));
  // }




function searchMovies(keyword) {
  
  var requestUrl = 'http://www.imdb.com/find?q=' + keyword + '&s=tt&ttype=ft&ref_=fn_ft';
  let results = [];
  let promise = Promise.resolve();
  
  for (let item of collection) {
    promise = promise.then(() => {
      return fn(item).then(result => {
        results.push(result);
      });
    });
  }
  return promise.then(() => {
    return results;
  });
}

  async function searchMovies(keyword) {
    var requestUrl = 'http://www.imdb.com/find?q=' + keyword + '&s=tt&ttype=ft&ref_=fn_ft';

    utility.request(requestUrl, async function ($) {
        var movies = [];

        $('div.findSection > table.findList tr').each(function () {

          if (movies.length < 1)
          {
            var innerText = $(this).text().trim()
                , id = $(this).html().match(/(tt[\d]+)/)[0] || null
                , year = innerText.match(/(\d{4})/g);

            if (id !== null && year !== null) { // exclude movies that are being developed
                movies.push({
                    id: id,
                    title: innerText.replace(/\(\d+\)/g, '').trim() || null,
                    year: year[0] || null,
                    primaryPhoto: $(this).find('img').attr('src') || null
                });
            }
          }
        });
        console.log('mivies--->');
        console.log(movies);
        return movies;

    });
     console.log('data');
    //  console.log(data);

    // return data;
}





function titleExtract(title){
    let bracket_match = title.match(/(.*?)[^(](\d\d\d\d)[^p]/);
    if (bracket_match){
        let name = bracket_match[1].replace(/\./g, " ");
        title = name + " (" + bracket_match[2] + ")";
    }
    var new_title = (title.match(/[^[)]*/))[0] + ")";

    return (new_title);
}


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