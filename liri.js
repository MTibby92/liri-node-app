var twitterObj = require('./keys.js')
var twitterKeys = twitterObj.twitterKeys

var spotify = require('spotify')

// var consumer_key = twitterKeys.consumer_key
// var consumer_secret = twitterKeys.consumer_secret
// var access_token_key = twitterKeys.access_token_key
// var access_token_secret = twitterKeys.access_token_secret

console.log(twitterKeys.consumer_key)
console.log(consumer_key)

var command = process.argv[2]
var userData = process.argv[3]
var defaultSong = 'The Sign'
var defaultMovie = 'Mr. Nobody'

switch(command) {
	case 'my-tweets':
		// do something
	case 'spotify-this-song':
		if (userData === undefined) {
			spotify.search({type: 'track', query: defaultSong}, function (err,data) {
				if (err) {throw err}

			})
		} else {
			spotify.search({type: 'track', query: userData}, function (err,data) {
				if (err) {throw err}

			})
		}
	case 'movie-this':
		// do something different
	case 'do-what-it-says':
		// yet another thing 
}