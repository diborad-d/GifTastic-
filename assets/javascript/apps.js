window.onload = function() {
  renderGiphyButtons();
};
function registerGifClickEvent() {
  $(".gif").on("click", function() {
    var title = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?rating=pg&q=" + title + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"; //10 results at a time
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results.length);
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var resultImage = $("<img>");
        resultImage.attr("src", results[i].images.fixed_height.url).attr("class", "resultImage");
        gifDiv.append(p);
        gifDiv.append(resultImage);
        $("#gifs-appear-here").prepend(gifDiv);
        registerImageClickEvent();
      }
    });
  });
}
let gifs = ["office fail", "goats fail", "drunk fail", "sport fail", "babies fail"];
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
function registerImageClickEvent() {
  $(".resultImage").on("click", function() {
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}
