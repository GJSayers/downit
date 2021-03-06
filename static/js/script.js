$( document ).ready(function () {});

// Clears the player name field on click
$( "#quiz-player-form .player-name" ).click(function() {
  $( this ).val('');
});

/*
 * General function for submitting forms via AJAX
 */
function submitFormAJAX(event, callbackSuccess) {
  // Get form data
  var data = new FormData(event.target);
  var serialised = {};
  // serialise it into key/value pairs that can be converted to JSON
  for (var key of data.keys()) {
    serialised[key] = data.get(key);
  }
  // Make AJAX request
  $.ajax({
    type : "POST",
    url : $(event.target).prop("data-ajax"), // Get route from form attribute
    contentType : 'application/json;charset=UTF-8',
    data : JSON.stringify(serialised),
    success : callbackSuccess
  });
}
