  //firebase config
  var config = {
    apiKey: "AIzaSyDfT3yvJCDry2s7DWgXg72149BFelnxE6c",
    authDomain: "politipurple.firebaseapp.com",
    databaseURL: "https://politipurple.firebaseio.com",
    projectId: "politipurple",
    storageBucket: "",
    messagingSenderId: "550902399608"
  };
  firebase.initializeApp(config);

  var database=firebase.database();

 //Priya's Code that fetches articles from news API

	var apiKey = "52d1c20852064e27ad9777ae8ab088d7";
	var newsSubject = "";
	var newsSource1 = "";
	var newsSource2 = "";
	var newsSourcePair = {
		"pair1": ["the-washington-post", "time"],
		"pair2": ["cnn", "the-economist"],
		"pair3": ["the-guardian-uk", "the-hill"],
		"pair4": ["the-huffington-post", "the-wall-street-journal"],
		"pair5": ["msnbc", "fox-news"],
		"pair6": ["buzzfeed", "breitbart-news"]
	}


	var pair = ["pair1", "pair2", "pair3", "pair4", "pair5", "pair6"];

function pairFind() {

	newsSource1 = $(".myBox option:selected").val();

	for (var i = 0, j = 0; i < pair.length; i++) {
		if (newsSourcePair[pair[i]][j] == newsSource1) {
			newsSource2 = newsSourcePair[pair[i]][j + 1];
			queryAPI(newsSource1, newsSource2);
		} else if (newsSourcePair[pair[i]][j + 1] == newsSource1) {
			newsSource2 = newsSourcePair[pair[i]][j];
			queryAPI(newsSource1, newsSource2);
		}
	}
}

$("#showNews").on("click", function (e) {
    e.preventDefault();
    if($("#searchTopic").val()!="" && $(".myBox option:selected").val()!= "select-news-source"){
        newsSubject = $("#searchTopic").val().trim();
        $("#searchTopic").val("");
        pairFind();
    }
    else
    {
        console.log("Please enter required values");
    }
});




function queryAPI(newsSource1, newsSource2) {
	var from = moment().subtract(1, "months").format("YYYY-MM-DD");
	var to = moment().format("YYYY-MM-DD");
	var count=1;

	console.log(from);
	console.log(to);

	//https://newsapi.org/v2/everything?q="+newsSubject+"&sources=cnn&apiKey=52d1c20852064e27ad9777ae8ab088d7
	console.log(newsSubject)
	console.log("news Source 1   " + newsSource1);
	console.log("news source 2   " + newsSource2);

	var queryURL1 = "https://newsapi.org/v2/everything?q=" + newsSubject + "&sources=" + newsSource1 + "&sortBy=relevancy&from=" + from + "&to=" + to + "&apiKey=" + apiKey;

	var queryURL2 = "https://newsapi.org/v2/everything?q=" + newsSubject + "&sources=" + newsSource2 + "&sortBy=relevancy&from=" + from + "&to=" + to + "&apiKey=" + apiKey;


	$.ajax({
		url: queryURL1,
		method: "GET"
	}).then(function (response) {

		console.log(" Response name  " + response.articles[0].source.name);
		console.log(" Response title  " + response.articles[0].title);
		console.log(" Response  description  " + response.articles[0].description);
		console.log(" Response  url  " + response.articles[0].url);
		console.log(" Response  imageurl  " + response.articles[0].urlToImage);
		console.log(" Response  date  " + response.articles[0].publishedAt);


		for (var i = 1; i < 10; i++) {
			if (response.articles[0].title != response.articles[i].title) {
				console.log(" Response  ttle   " + response.articles[i].title);
				console.log(" Response  url   " + response.articles[i].url);
				count++;
			}
			if(count===5)
			{
				count=1;
				break;
			}
		}

	}).fail(function (jqXHR, textStatus, errorThrown) {
		console.log("Error Message  " + textStatus);
	});

	$.ajax({
		url: queryURL2,
		method: "GET"
	}).then(function (response) {
		console.log(" Response name  " + response.articles[0].source.name);
		console.log(" Response title  " + response.articles[0].title);
		console.log(" Response  description  " + response.articles[0].description);
		console.log(" Response  url  " + response.articles[0].url);
		console.log(" Response  imageurl  " + response.articles[0].urlToImage);
		console.log(" Response  date  " + response.articles[0].publishedAt);

		for (var j = 1; j < 10; j++) {
			if (response.articles[0].title != response.articles[j].title) {
				console.log(" Response  ttle   " + response.articles[j].title);
				console.log(" Response  url   " + response.articles[j].url);
				count++;
			}
			if(count===5)
			{
				count=1;
				break;
			}
		}

	}).fail(function (jqXHR, textStatus, errorThrown) {
		console.log("Error Message  " + textStatus);
	});
}

//mark's code retrieving fb likes

// var userInput = prompt("Search Something, Such as: Super Bowl");

// var apiKey2 = "token=4d9c7a74-a2a5-497c-8c59-7dd2f5113ce3";

// var queryURL = "http://webhose.io/filterWebContent?" + apiKey2 + "&format=json&ts=1515290541502&sort=social.facebook.likes&q=%22" + userInput + "%22%20language%3Aenglish";

// function ajaxGetUrl() {
//     $.ajax({
//         url: queryURL,
//         method: 'GET'
//     }).done(function(response) {
// 		var results = response.posts;
// 			console.log("queryURL: " + queryURL); // show constructed url
// 			console.log(response);  //console test to make sure something returns
// 			console.log("================================================================================");			
// 		for (var i = 0; i < results.length; i++){
// 			var newsDiv = $("<div>");
// 			var newsImage = $("<img>");
// 			var linkString = results[i].thread.title_full;
// 			var createdLink = linkString.link(results[i].thread.url);
			
// 			newsImage.attr("src", results[i].thread.main_image);
// 			$("#newsView").append(newsDiv);
// 			newsDiv.append(newsImage);
// 			newsDiv.append(createdLink + " (Likes: " + results[i].thread.social.facebook.likes + ")" + "<br>" + results[i].text.substring(0, 250) + "...\"");

// 			console.log("title_full: " + results[i].thread.title_full);	
// 			console.log("text: " + results[i].text);	
// 			console.log("likes: " + results[i].thread.social.facebook.likes);
// 			console.log("url: " + results[i].thread.url);
// 			console.log(results[i].thread.main_image);
// 			console.log("================================================================================");
// 		}
//     });
// }	
// 	ajaxGetUrl();

//Katharine's Code that creates chart

var chart = new CanvasJS.Chart("myChart", {
	animationEnabled: true,
	title:{
		text: "See where your Sources Lie",
		// fontFamily: 'Lobster',
	},
	axisX: {
		title:"Lean: Liberal to Conservative Bias",
		minimum:0,
		maximum:14
	},
	axisY: {
		title:"Quality: Inaccurate Info to Original Fact Reporting"
	},
	data: [{
		type: "bubble",
		toolTipContent: "<b>{name}</b>",
		color:"rgba(255,12,32,.5)",
		dataPoints: [
			{ x: 7.5, y: 7.1,z: 10, name: "Time" },
			{ x: 7.9, y: 6.4,z: 10, name: "The Economist" },
			{ x: 9, y: 7.5,z: 10, name: "The Hill" },
			{ x: 8.4, y: 7.3,z: 10, name: "Wall Street Journal" },
			{ x: 11.5, y: 2,z: 10, name: "Fox News" },
			{ x: 12.1, y: 1,z: 10, name: "Breritbart News" }
		]
	},
	{
		type: "bubble",
		toolTipContent: "<b>{name}</b>",
		color:"rgba(12,143,221,.2)",
		dataPoints: [
			{ x: 6, y: 7.1,z: 10, name: "Washington Post" },
			{ x: 6.2, y: 4.1,z: 10, name: "CNN" },
			{ x: 6, y: 6.8,z: 10, name: "The Guardian" },
			{ x: 3.2, y: 3.8,z: 10, name: "Huffington Post" },
			{ x: 4.1, y: 4.5,z: 10, name: "MSNBC" },
			{ x: 4, y: 3.6,z: 10, name: "Buzzfeed News" },
		]
	}]
});
chart.render();
