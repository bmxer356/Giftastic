$(document).ready(function() {

var startgifs = ["NFL", "NBA", "John Cena", "Dwayne Johnson", "Cats", "Dogs"];

function showgifbuttons() {
   $("#gifButtons").empty();
   	for (var i = 0; i < startgifs.length; i++){
   		var gifButton = $("<button>");
   		gifButton.addClass("action");
   		gifButton.addClass("btn btn-primary")
   		gifButton.attr("data-name", startgifs[i]);
   		gifButton.text(startgifs[i]);
   		$("#gifButtons").append(gifButton);
   	}
}

function newButton() {
	$("#submit").on("click", function() {
		var action = $("#gif-search").val().trim();
			if (action == "") {
				return false;
	}
	startgifs.push(action);
	showgifbuttons();
	return false;

	});
}

function displayGifs() {
	var action = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=e168678dfa5c4a7fbcfbe1fdc9131578&limit=10";
	console.log(queryURL);
	$.ajax({
		url:queryURL,
		method: 'GET'

	})
	.done(function(response){
		console.log(response);
		$("#gifsView").empty();
		var results = response.data;
		if (results == ""){
			 alert("No Gifs for this");
		}
		for (var i=0; i<results.length; i++) {
			var gifDiv = $("<div>");
			gifDiv.addClass("gifDiv");

			var gifRating = $("<p>").text("Rating " +results[i].rating);
			gifDiv.append(gifRating);

			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
			gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
			gifImage.attr("data-animate",results[i].images.fixed_height_small.url);			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
			gifDiv.append(gifImage);

			$("#gifsView").prepend(gifDiv);
		}

	});

}
showgifbuttons();
newButton();

$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if ( state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');

	}else{
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
		}

});
});