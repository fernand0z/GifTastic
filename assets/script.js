$(document).ready(function() {

//Initial array of dog breeds
var dogBreeds = ["German Shepherd", "Labrador Retriever", "Golden Retriever", "Beagle", "Poodle", "Daschund", "Chihuahua", "Pomeranian", "Dalmation", "Great Dane", "Corgi", "Terrier"];

//function to display the buttons to the page
function renderButtons() {
    $("#buttons").empty();
    
    //loop through the array of dog breeds
    for (var i=0; i<dogBreeds.length; i++) {
    
    //DEBUGGING  OMITTED FOR TESTING --> 
    //var breedName = dogBreeds[i].attr("data-breed");
    //

    //generate buttons for each item in the array
        var buttonCreate = $("<button>");
        buttonCreate.addClass("dog-buttons");
        buttonCreate.attr("data-breed", dogBreeds[i]);
        buttonCreate.text(dogBreeds[i]);
        $("#buttons").append(buttonCreate);
    }

    // This function handles when the search submit button is clicked
    $("#add-breed").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var breed = $("#search-input").val().trim();
    // Adding the search query from the textbox to our array
    dogBreeds.push(breed);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    })
    
    //This function listens for clicks on one of the dog breed buttons
    $(".dog-buttons").on("click", function() {
        var dog = $(this).attr("data-breed");

    //Constructing a URL to search Giphy for the selected dog breed
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        dog + "&api_key=J6FUoIJ1BDIiSpFUwi2NMxNWW2MboYwt&limit=10";
    console.log(queryURL);  

    // Performing our AJAX GET request
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        console.log(results);
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

            // Creating a var for the gif display section of the page
            var gifDiv = $("<div class='gif-divs'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p class='rating-text'>").text("Rating: " + rating);

            // Creating an image tag
            var dogImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            dogImage.attr("src", results[i].images.fixed_height_still.url);
            dogImage.attr("data-still", results[i].images.fixed_height_still.url);
            dogImage.attr("data-animate", results[i].images.fixed_height.url);
            dogImage.attr("data-state", "still");
            dogImage.attr("class", "gif");
            
            // Appending the paragraph and dogImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(dogImage);

            // Prepending the gifDiv to the "#images-main" div in the HTML
            $("#images-main").prepend(gifDiv);
            }
    
        

    //This function toggles the static and animatd states of the gifs when they are clicked
    $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    });
    });

};
// Calling the renderButtons function to display the intial buttons
renderButtons();
});

{/* <button class="dog-buttons" data-breed="German Shepherd">
German Shepherd
</button>
<button class="dog-buttons" data-breed="Labrador Retriever">
Labrador Retriever
</button>
<button class="dog-buttons" data-breed="Golden Retriever">
Golden Retriever
</button>
<button class="dog-buttons" data-breed="Beagle">
Beagle
</button>
<button class="dog-buttons" data-breed="Poodle">
Poodle
</button>
<button class="dog-buttons" data-breed="Daschund">
Daschund
</button>
<button class="dog-buttons" data-breed="Chihuahua">
Chihuahua
</button>
<button class="dog-buttons" data-breed="Pomeranian">
Pomeranian
</button> */}