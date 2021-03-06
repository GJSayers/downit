$( document ).ready(function () {});

// Clears the player name field on click
$( "#quiz-player-form .player-name" ).click(function() {
  $( this ).val('');
});

$( "input[name='answer']" ).change(function(event) {
  console.log( `Selected option: ${$( this ).val()}` );
  //Player has selected so disable the other options
  $( "input[name='answer']:not(:checked)" ).prop('disabled', true);
  //Submit the answer to the server
  submitFormAJAX($( "#quiz-form" )[0], checkAnswerCallback);
});

function checkAnswerCallback(responce) {
  console.log(responce);
}

/*
 * General function for submitting forms via AJAX
 */
function submitFormAJAX(form, callbackSuccess) {
  // Get form data
  var data = new FormData(form);
  var serialised = {};
  // serialise it into key/value pairs that can be converted to JSON
  for (var key of data.keys()) {
    serialised[key] = data.get(key);
  }
  // Make AJAX request
  $.ajax({
    type : "POST",
    url : $( form ).attr("data-ajax"), // Get route from form attribute
    contentType : 'application/json;charset=UTF-8',
    data : JSON.stringify(serialised),
    success : callbackSuccess
  });
}