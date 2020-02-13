var comedians = ["Larry David", "Bill Burr", "Louis CK", "Nathan Fielder", "Dave Chappell", "Kevin Hart", "Chris Rock", "Andy Samberg",
"Joe Rogan", "George Carlin", "Donald Glovar", "Hannibal Buress", "Russell Brand", "Aziz Ansari", "Anthony Jeselnik", "Robin Williams",
"Chris D'Elia", "Ricky Gervais", "Pete Davidson", "Key and Peele"]

function displayComedianInfo () {
    $("#gifs-appear-here").empty()

    var comedian = $(this).attr("data-comedian");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        comedian + "&api_key=JqwUmxWjJ4f3MeUmQhX3F1duD9F6TjoI";

        $.ajax({

            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var comedianDiv = $("<div>");
                    var rating = results[i].rating
                    rating = rating.toUpperCase()
                    var p = $("<p>").text("Rating: " + rating);

                    var comedianImage = $("<img>");

                    comedianImage.addClass("gif");
                    comedianImage.attr("data-state", "still");
                    comedianImage.attr("src", results[i].images.fixed_height_still.url);
                    comedianImage.attr("data-still", results[i].images.fixed_height_still.url );
                    comedianImage.attr("data-animate", results[i].images.fixed_height.url);

                    comedianDiv.append(comedianImage);
                    comedianDiv.append(p);

                    $("#gifs-appear-here").prepend(comedianDiv);

             }

     });
}

function renderButtons() {
    $("#buttondisplay").empty();


    for (var i = 0; i <comedians.length; i++) {
        var a = $("<button>");
        a.addClass("comedian-btn");
        a.attr("data-comedian", comedians[i]);
        a.text(comedians[i]);
        $("#buttondisplay").append(a);
    }

}

$("#add-comedian").on("click", function (event) {
    event.preventDefault();
    var comedian = $("#gif-input").val().trim();
    comedians.push(comedian);
    renderButtons();
    
});

$(document).on("click", ".comedian-btn", displayComedianInfo);
 renderButtons();

 $(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }


 });