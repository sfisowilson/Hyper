
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var imdb = require('imdb-node-api');
const TorrentSearchApi = require('torrent-search-api');
const axios = require('axios');
const util = require('util');

var app = express();
app.listen(5200, function(){
    console.log("server started port 5200");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.get(function(req, res, next){
    console.log("hitting");
    next();
});

app.post('/test', function(req, res){
    console.log(req.body);
    res.send(JSON.stringify({status: 200}));
});

// app.get('/getMovieInfo', function(req, res){
  // let movie_id = req.query.movieId;
  // imdb.getMovie(movie_id, function (movie) {
  //     console.log("test movie");

  //     console.log(movie);
  //     // res.send(movie);
  //     res.json(movie);

  // }, function(error) {
  //     console.error(error);
  // });
// });


  // NEW THINGS
  
  app.post('/movieSearch', async (req, res) => {
      TorrentSearchApi.enableProvider('1337x');
      const torrents = await TorrentSearchApi.search(req.body.title, 'Movies', 1);

      // scraping tittles
        torrents.forEach(function(torrent_file){
          let new_title = (titleExtract(torrent_file['title']));
          torrent_file['title'] = new_title;
        });
        res.send(JSON.stringify(torrents));
  })
  app.get('/movieInfo/:id', (req, res) => {
      // console.log(req.params.id);
    axios.get(`https://yts.am/api/v2/list_movies.json?limit=1&query_term=${req.params.id}`)
    .then( async yts => {
      // console.log(yts);
      
      TorrentSearchApi.enableProvider('1337x');
      var torrents = await TorrentSearchApi.search(yts.data.data.movies[0].title, 'Movies', 1);
      torrents = torrents[0];
      console.log(torrents);
  

          let new_title = (titleExtract(torrents['title']));
          torrents['title'] = new_title;
        torrents.yts = yts.data.data.movies[0];
        // console.log(torrents);
        res.send(JSON.stringify(torrents));
    })
    .catch(err => console.log(err))
    // TorrentSearchApi.enableProvider('1337x');
    // const torrents = await TorrentSearchApi.search(req.body.title, 'Movies', 1);

    // // scraping tittles
    //   torrents.forEach(function(torrent_file){
    //     let new_title = (titleExtract(torrent_file['title']));
    //     torrent_file['title'] = new_title;
    //   });
    //   res.send(JSON.stringify(torrents));
})
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
      TorrentSearchApi.enableProvider('1337x');
      const torrents = await TorrentSearchApi.search('2018', 'Movies', 10);

      // scraping tittles
        torrents.forEach(function(torrent_file){
          let new_title = (titleExtract(torrent_file['title']));
          torrent_file['title'] = new_title;
        });
      
      console.log('hello torrent providers');
      var myObject = {},
      promises = [];

      torrents.forEach(function(singleElement){
        console.log(singleElement.title);
        // myUrl = singleElement.webAddress;
        promises.push(axios.get(`https://yts.am/api/v2/list_movies.json?limit=1&query_term=${singleElement.title}`))
      });

      axios.all(promises).then(axios.spread((...args) => {
        console.log(args.length);
        for (let i = 0; i < args.length; i++) {
            myObject[i] = args[i];
        }
    })).then(()=> {
      var i = 0;
      torrents.forEach(function(movie){
        console.log(myObject[i].data);
        movie.yts = myObject[i++].data.data.movies;
      });
      // console.log(torrents);
      res.send(JSON.stringify(torrents));
    });
});


function titleExtract(title){
    let bracket_match = title.match(/(.*?)[^(](\d\d\d\d)[^p]/);
    if (bracket_match){
        let name = bracket_match[1].replace(/\./g, " ");
        title = name + " (" + bracket_match[2] + ")";
    }
    var new_title = (title.match(/[^[)]*/))[0] + ")";

    return (new_title);
}


async function makeMovieList(torrents, res){
	var movie_list = {};
	var count = 1;
  const search = util.promisify(imdb.searchMovies);

	torrents.forEach( async function(torrent_file){


    // async function callStat() {
      const lookup = await search(torrent_file['title']);
      console.log(lookup);
      // movie = movies[0];

			// if movie in list, check which is bigger seeds
        //   if (! (movie['id'] in movie_list) ||
        //   ((movie['id'] in movie_list) && torrent_file['seeds'] > 
        //                   movie_list[movie['id']]['torrent']['seeds'])
        // ){
        //   movie_list[movie['id']] = ({
        //     video : movie ,
        //     torrent : torrent_file
        //   });
        // }
    // }

		// imdb.searchMovies(torrent_file['title'], async function (movies) {

		// 	movie = movies[0];

			// if movie in list, check which is bigger seeds
			// if (! (movie['id'] in movie_list) ||
			// 	((movie['id'] in movie_list) && torrent_file['seeds'] > 
			// 									movie_list[movie['id']]['torrent']['seeds'])
			// ){
			// 	movie_list[movie['id']] = ({
			// 		video : movie ,
			// 		torrent : torrent_file
			// 	});
			// }

			// when done making list: log list
			// if (++count == torrents.length){
			// 	console.log("finaly here -------", movie_list);
      // }
      // res.send('success');

		// }, function(error) { 
		// 	console.error(error);
    // });
    

  });
  console.log('torrents');
  // console.log(torrents);
};


app.get('/testing', 

	async function(req, res, next) {
	
	console.log('start');

	let search_phrase = '2018'
	
	// torrent fetch
	TorrentSearchApi.enableProvider('1337x');
	const torrents = await TorrentSearchApi.search(search_phrase, 'Movies', 5);

	// scraping tittles
	torrents.forEach(async function(torrent_file){
		// console.log( torrent_file['title']);
		let new_title = (titleExtract(torrent_file['title']));
		torrent_file['title'] = new_title;
		const magnet = await TorrentSearchApi.getMagnet(torrent_file);
		// console.log('magnet: ', torrent_file['title'], ' link: ', magnet);
		torrent_file['magnet'] = magnet;
  });
  

	// console.log("torrntes", torrents);




	makeMovieList(torrents,res);
	// await Promise.all(list).then(console.log("my lis : ", list));	
	// console.log("---- final movie list: ", list);


	// res.sendFile(path.join(__dirname + '/index2.html'));
	// res.render('index', { title: 'Best website' });	
});
