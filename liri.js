var twitterObj = require('./keys.js')
var twitterKeys = twitterObj.twitterKeys

var Twitter = require('twitter')
var spotify = require('spotify')
var request = require('request')
var fs = require('fs')

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});

var command = process.argv[2]
var userData = process.argv[3]
var defaultSong = 'The Sign'
var defaultMovie = 'Mr. Nobody'

switch(command) {
	case 'my-tweets':
		myTweets()
		break
	case 'spotify-this-song':
		spotifyThis()
		break
	case 'movie-this':
		movieThis()
		break
	case 'do-what-it-says':
		fs.readFile('./random.txt', 'utf8', function(err, data) {
			if (err) {
				return console.log(err)
			}
			var arr = data.split(',')
			userData = arr[1]
			command = arr[0]

			switch(command) {
				case 'my-tweets':
					myTweets()
					break
				case 'spotify-this-song':
					spotifyThis()
					break
				case 'movie-this':
					movieThis()
					break
			}
		})
		break
}





function myTweets() {
	client.get('search/tweets', {q: '@SportsCenter', count: '20'}, function(err, tweets, response) {
		if (err) {
			return console.log(err)
		} else {
			// console.log(tweets)
			for (var i in tweets.statuses) {
				var num = parseInt(i) + 1
				console.log('Tweet #' + num)
				console.log(tweets.statuses[i].text)
				console.log(tweets.statuses[i].created_at)
				console.log('========')

				var str = 'Tweet #' + num + '\n' + tweets.statuses[i].text + '\n' + tweets.statuses[i].created_at + '\n========\n'
				fs.appendFileSync('log.txt', str, 'utf8')
			}
			fs.appendFile('log.txt', '\n*****************************************\n\n', 'utf8', function(err) {
				if (err) {
					return console.log(err)
				}
				console.log('Log Updated!')
			})
		}
	})
}

function spotifyThis() {
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
				if (data.tracks.items.length == 0) {
					return console.log('Track not found, please search again')
				}
				// console.log(data)
				console.log('Artist:', data.tracks.items[0].artists[0].name)
				console.log('Track:', data.tracks.items[0].name)
				console.log('Preview Link:', data.tracks.items[0].preview_url)
				console.log('Album:', data.tracks.items[0].album.name)
			}
		})
	}
}

function movieThis() {
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
			if (movieObj.Response == 'False') {
				return console.log('Invalid movie title, please try again')
			}
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
}