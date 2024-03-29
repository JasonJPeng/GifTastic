

// API Call Example: http://api.giphy.com/v1/gifs/search?q=pig&api_key=453HTooEbMcLLHXzAyh12R3VvCGhpBWI

var apiKey = "453HTooEbMcLLHXzAyh12R3VvCGhpBWI";

var myList = ["rat", "cow", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];

function displayGif(){
    var gifURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    $(this).attr("user-data")  +
                  "&rating=g&limit=10&api_key=" + apiKey;

// Change the color of button class gif-select 
    $(".gif-select").css("background-color", "")
    $(this).css("background-color", "darkkhaki");
// remove text from the input box
    
    $.ajax( {
       url: gifURL,
       method: "GET"
    }).then( function (response) {
       console.log(response);
       $("#image-view").empty();
       response.data.forEach(function(e) {
          var stillGif = e.images.fixed_height_still.url;
          var animatedGif = e.images.fixed_height.url;
          var titleGif = e.title;
              titleGif = titleGif.replace("GIF", "").trim();
              titleGif = "Title: " + titleGif;
              
          var pFigure = $('<figure>').append($("<img>").attr("src", stillGif)
                                                       .attr("next-img", animatedGif)
                                                       .addClass("gif-img figure-img img-fluid rounded")                                            
                                                       );
          pFigure.append($("<figcaption>").text(titleGif).addClass("figure-caption"));

          // Add BootStrap features
          pFigure.addClass("figure");

          $("#image-view").append(pFigure);

        //   $("#image-view").append($("<p>").text(titleGif));
        //   $("#image-view").append($("<img>").attr("src", stillGif)
        //                                     .attr("next-img", animatedGif)
        //                                     .addClass("gif-img")                                            
        //                                     );

       });   
    });
    
}


function addAButton(str) {
    // $("#button-list").append($('<button onclick="displayGif()">').text(str));
       var btn = $('<button type="button" class="btn-sm btn-outline-primary">');
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
      var strNew = $("#input-gif").val().trim();
      myList.push(strNew);
      $("#input-gif").val(""); // clear the search term
      addAllButtons(myList);
    }) 

    $("#clear-gif").on("click", function (event) {
        event.preventDefault();
        myList = [];
        addAllButtons(myList);
        $("#image-view").empty();
    });


// double click to remove a button
$(document).on("dblclick", ".gif-select", function (event) {
    var animalName = $(this).attr("user-data");
    var i = myList.indexOf(animalName);
    if (i >= 0) {
       myList.splice(i,1); 
       console.log(event);
       addAllButtons(myList);
       $("#image-view").empty();  // why this one NOT working ..????
    }
})   


    // click a button to show all gifd
   $(document).on("click", ".gif-select", displayGif);



   $(document).on("click", ".gif-img", function(){
  // Swap the URL     
       var tempURL = $(this).attr("next-img");
       $(this).attr("next-img", $(this).attr("src"));
       $(this).attr("src", tempURL);
       
   })


   



})    