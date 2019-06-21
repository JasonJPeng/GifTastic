

// API Call Example: http://api.giphy.com/v1/gifs/search?q=pig&api_key=453HTooEbMcLLHXzAyh12R3VvCGhpBWI

var apiKey = "453HTooEbMcLLHXzAyh12R3VvCGhpBWI";

var myList = ["rat", "cow", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];

function displayGif(){
    var gifURL = "http://api.giphy.com/v1/gifs/search?q=" +
                    $(this).attr("user-data")  +
                  "&rating=g&limit=10&api_key=" + apiKey;
    $.ajax( {
       url: gifURL,
       method: "GET"
    }).then( function (response) {
       console.log(response);
       $("#image-view").empty();
       response.data.forEach(function(e) {
          var stillGif = e.images.fixed_height_still.url;
          var animatedGif = e.images.fixed_height.url;
          var titleGif = e.images.title;
          $("#image-view").append($("<img>").attr("src", stillGif));
       });   
    });
    
}


function addAButton(str) {
    // $("#button-list").append($('<button onclick="displayGif()">').text(str));
       var btn = $("<button>");
       btn.addClass("gif-select").attr("user-data", str).text(str);
       $("#button-list").append(btn);
}

function addAllButtons(A) {
        
    $("#button-list").empty();
    
    A.forEach(function(e) {
        addAButton(e);
    })

    

}


$(document).ready(function() { //  Beginning of jQuery
//=====================================================================
   
   addAllButtons(myList);

   $("#add-gif").on("click", function(event) {
      event.preventDefault();
      myList.push($("#input-gif").val().trim());
      addAllButtons(myList);
    }) 


   $(document).on("click", ".gif-select", displayGif);
   



})    