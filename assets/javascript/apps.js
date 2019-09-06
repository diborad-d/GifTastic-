window.onload = function() {
  renderGiphyButtons();
};
function registerGifClickEvent() {
  $(".gif").on("click", function() {
    var person = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");

          personImage.attr("src", results[i].images.fixed_height.url).attr("class", "Image");
          gifDiv.append(p);
          gifDiv.append(personImage);
          $("#gifs-appear-here").prepend(gifDiv);
        }
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
