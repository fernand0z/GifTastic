$(document).ready(function () {

    //Initial array of dog breeds
    var categories = ["lodging", "restaurant", "night_club", "liquor_store"];

    //function to display the buttons to the page
    function renderButtons() {
        $("#buttons").empty();

        //loop through the array of dog breeds
        for (var i = 0; i < categories.length; i++) {

            //DEBUGGING  OMITTED FOR TESTING --> 
            //var breedName = dogBreeds[i].attr("data-breed");
            //

            //generate buttons for each item in the array
            var buttonCreate = $("<button>");
            buttonCreate.addClass("category-buttons hvr-underline-from-center");
            buttonCreate.attr("data-category", categories[i]);
            buttonCreate.text(categories[i]);
            $("#buttons").append(buttonCreate);

            var latitude = '21.276';
            var longitude = '-157.820';
            var location = "location=" + latitude + "," + longitude + "&radius=500";
            var type = "&type=" + categories[i];
            var urlKey = "&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc";
            //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.303,-111.838&radius=500&type=lodging&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc

            var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + location + type + urlKey;
            console.log(queryURL);

            // Creating an AJAX call for the specific movie button being clicked
            $.ajax({
                url: queryURL,
                dataType: 'jsonp',
                method: "GET"
            }).then(function (response) {

                // //Constructing a URL to pull from Google API
                // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                //     dog + "&api_key=J6FUoIJ1BDIiSpFUwi2NMxNWW2MboYwt&limit=10";
                // console.log(queryURL);  

                // // Performing our AJAX GET request
                // $.ajax({
                // url: queryURL,
                // method: "GET"
                // })
                // // After the data comes back from the API
                // .then(function(response) {
                // Storing an array of results in the results variable
                var resultsData = response.results;
                console.log(resultsData);
                // Looping over every result item
                for (var i = 0; i < resultsData.length; i++) {

                    // Creating a var for the gif display section of the page
                    var gifDiv = $("<div class='gif-divs'>");

                    // Storing the result item's rating
                    var name = resultsData[0].name;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p class='name-text'>").text("Hotel: " + name);

                    // Creating an image tag
                    // var resultsImage = $("<img>");

                    // // Giving the image tag an src attribute of a proprty pulled off the
                    // // result item
                    // dogImage.attr("src", results[i].images.fixed_height_still.url);
                    // dogImage.attr("data-still", results[i].images.fixed_height_still.url);
                    // dogImage.attr("data-animate", results[i].images.fixed_height.url);
                    // dogImage.attr("data-state", "still");
                    // dogImage.attr("class", "gif");

                    // Appending the paragraph and dogImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    // gifDiv.append(dogImage);

                    // Prepending the gifDiv to the "#images-main" div in the HTML
                    $("#images-main").prepend(gifDiv);
                };
            
        
            });
        };


//     //This function toggles the static and animatd states of the gifs when they are clicked
//     $(".gif").on("click", function() {
//         var state = $(this).attr("data-state");
//         if (state === "still") {
//             $(this).attr("src", $(this).attr("data-animate"));
//             $(this).attr("data-state", "animate");
//         } else {
//             $(this).attr("src", $(this).attr("data-still"));
//             $(this).attr("data-state", "still");
//         }
    
//     });

    };
});
// Calling the renderButtons function to display the intial buttons
//renderButtons();



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
</button> */
};