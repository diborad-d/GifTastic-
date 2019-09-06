window.onload = function() {
  renderGiphyButtons();
};
// Event listener for all button elements
function registerGifClickEvent() {
  $(".gif").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-name");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
            // Creating an image tag
            var personImage = $("<img>");
            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height.url).attr("class", "Image");
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);
            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });
}

let gifs = ["office fail", "goats fail", "drunk fail", "sport fail", "babies fail"];
// dynamically generate giphy button
function renderGiphyButtons() {
  $("#buttons-view").empty();
  for (let i = 0; i < gifs.length; i++) {
    let giphyButton = $("<button>");
    giphyButton.addClass("gif");
    giphyButton.attr("data-name", gifs[i]);
    giphyButton.text(gifs[i]);
    $("#buttons-view").append(giphyButton);
  }
  registerGifClickEvent();
}
$("#add-giphy").on("click", function(event) {
  event.preventDefault();
  var text = $("#giphy-input")
    .val()
    .trim();
  if (!text) {
    return;
  }

  gifs.push(text);
  renderGiphyButtons();
});

// var giphy = $("#add-giphy").val().trim();
// gifs.push(giphy);

// // Generic function for capturing the movie name from the data-attribute
// // function alertMovieName() {
// //   var movieName = $(this).attr("data-name");

// //   alert(movieName);
// // }
// // Function for displaying movie data
// function renderButtons() {

//   // Deleting the movies prior to adding new movies
//   // (this is necessary otherwise we will have repeat buttons)
//   $("#buttons-view").empty();

//   // Looping through the array of movies
//   for (var i = 0; i < gifs.length; i++) {

//     // Then dynamicaly generating buttons for each movie in the array
//     // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
//     var newGif = $("<button>");
//     // Adding a class of movie to our button
//     newGif.addClass("giphy");
//     // Adding a data-attribute
//     newGif.attr("data-name", gifs[i]);
//     // Providing the initial button text
//     newGif.text(gifs[i]);
//     // Adding the button to the HTML
//     $("#buttons-view").append(newGif);
//   }
// }

// // This function handles events where one button is clicked
// $("#add-movie").on("click", function(event) {
//   // Preventing the buttons default behavior when clicked (which is submitting a form)
//   event.preventDefault();
//   // This line grabs the input from the textbox
//   var gifs = $("#gifs-input").val().trim();

//   // Adding the movie from the textbox to our array
//   gifs.push(giphy);

//   // Calling renderButtons which handles the processing of our movie array
//   renderButtons();

// });

// // Function for displaying the movie info
// // We're adding a click event listener to all elements with the class "movie"
// // We're adding the event listener to the document because it will work for dynamically generated elements
// // $(".movies").on("click") will only add listeners to elements that are on the page at that time

// // $(document).on("click", ".movie", alertMovieName);
