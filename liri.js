require("dotenv").config();

var fs = require('fs');
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios")




var action = process.argv[2];
var inputs = process.argv.slice(3).join(" ");

function concertThis(inputs)

	{

		var concertUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp"

		request(concertUrl, function(error, response, body) 
		
		{
			if (!error && response.statusCode === 200) 

			{
				body = JSON.parse(body);

				for (var event in body) 
				
				{

				console.log("Venue: " + body[event].venue.name);

				console.log("Location: " + body[event].venue.city + ","  + body[event].venue.country);
				  
				var date = moment(body[event].datetime).format('L')
				 
				console.log("Date: " + date);

				console.log("________________________________________");

				console.log("");
				 

				}

			}

		}
	)};


function spotifyThis(inputs) 

	{

	if (!inputs)

		{inputs = "The Sign";}

	spotify.search(

	{ type: "track", query: inputs }, 

	function(err, data) 

		{

		if (err)
		
		{

			console.log('Error occurred: ' + err);
			return;
		}

		var songInfo = data.tracks.items;
		console.log("Artist(s): " + songInfo[0].artists[0].name);
		console.log("Song Name: " + songInfo[0].name);
		console.log("Preview Link: " + songInfo[0].preview_url);
		console.log("Album: " + songInfo[0].album.name);
		});
	}




function movieThis(inputs)

	{

		var movieUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

	request(movieUrl, function(error, response, body) {

		if (!inputs)
		
		{
		
			console.log("If you haven't watched 'Mr. Nobody,' then you should:" + "http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!")
		
		}

		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});


	}


function doThis(inputs)

	{
		fs.readFile('random.txt', "utf8", function(error, data)
		
		{

		var txt = data.split(',');
	
		spotifyThisSong(txt[1])

		}

		)};

function switchCase() 

{

	switch (action) 

		{

		case "concert-this":
		concertThis(inputs);
		break;

		case "spotify-this-song":
		spotifyThis(inputs);
		break;

		case "movie-this":
		movieThis(inputs);
		break;

		case "do-what-it-says":
		doThis();
		break;
	
		}

}

switchCase();

