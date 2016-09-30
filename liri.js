var twitterObj = require('./keys.js')
var twitterKeys = twitterObj.twitterKeys

var spotify = require('spotify')
var request = require('request')

// var consumer_key = twitterKeys.consumer_key
// var consumer_secret = twitterKeys.consumer_secret
// var access_token_key = twitterKeys.access_token_key
// var access_token_secret = twitterKeys.access_token_secret

// console.log(twitterKeys.consumer_key)
// console.log(consumer_key)

var command = process.argv[2]
var userData = process.argv[3]
var defaultSong = 'The Sign'
var defaultMovie = 'Mr. Nobody'

switch(command) {
	case 'my-tweets':
		// do something
	case 'spotify-this-song':
		if (userData === undefined) {
			spotify.search({type: 'track', query: '"The+Sign" artist:"Ace+of+Base"&limit=5'}, function (err,data) {
				if (err) {
					return console.log(err)
				}else {
					// console.log(data)
					console.log('Artist:', data.tracks.items[0].artists[0].name)
					console.log('Track:', data.tracks.items[0].name)
					console.log('Preview Link:', data.tracks.items[0].preview_url)
					console.log('Album:', data.tracks.items[0].album.name)
				}
			})
		} else {
			spotify.search({type: 'track', query: userData + '&limit=5'}, function (err,data) {
				if (err) {
					return console.log(err)
				} else {
					// console.log(data)
					console.log('Artist:', data.tracks.items[0].artists[0].name)
					console.log('Track:', data.tracks.items[0].name)
					console.log('Preview Link:', data.tracks.items[0].preview_url)
					console.log('Album:', data.tracks.items[0].album.name)
				}
			})
		}
	case 'movie-this':
		// handle for no movie input
		if (userData !== undefined){
			var input = userData
		} else {
			var input = defaultMovie
		}

		var arr = input.trim().split(' ')
		var format = ''
		for (var i in arr) {
			format = format + arr[i] + '+'
		}
		var final = format.substr(0, format.length-1)
		var title = 't=' + final

		request('http://www.omdbapi.com/?' + title + '&plot=short&tomatoes=true&r=json', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// console.log(JSON.parse(body)) // Show the HTML for the Google homepage.
				var movieObj = JSON.parse(body)
				console.log(movieObj.Title)
				console.log(movieObj.Year)
				console.log(movieObj.imdbRating)
				console.log(movieObj.Country)
				console.log(movieObj.Language)
				console.log(movieObj.Plot)
				console.log(movieObj.Actors)
				console.log(movieObj.tomatoRating)
				console.log(movieObj.tomatoURL)
			} else {
				console.warn(error);
			}
		});

		// suppress the direct output of the call. you can expand the result below
		"loading..."
	case 'do-what-it-says':
		// yet another thing 
}