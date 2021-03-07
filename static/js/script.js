var question;

$( document ).ready(function () {});

// Clears the player name field on click
$( "#quiz-player-form .player-name" ).click(function() {
  $( this ).val('');
});

// Triggered when answer is submitted
$( "#quiz-form input[name='answer']" ).change(function(event) {
  //Player has selected so disable the other options
  $( "#quiz-form input[name='answer']:not(:checked)" ).prop('disabled', true);
  //Submit the answer to the server
  submitFormAJAX($( "#quiz-form" )[0], checkAnswerCallback);
});

// Shows the next quiz question
$( "#next_question_btn" ).click(function(event) {
  event.preventDefault();

  //Fill out new question text
  $( ".quiz-question" ).text(question.question);
  $( ".quiz-option" ).each(function(index) {
    $( this ).children("div").text(question.options[index]);
  });

  //Reset radio radiobuttons
  $( "#quiz-form input[name='answer']" ).prop('disabled', false);
  $( "#quiz-form input[name='answer']" ).prop('checked', false);

  //Reset button highlighting
  $( ".quiz-option" ).each(function(index) {
    $( this ).removeClass("wrong").removeClass("correct");
  });

  //Hide the next question button
  $( "#next_question_btn" ).addClass("hide");
});

//AJAX answer check callback
function checkAnswerCallback(response) {
  let score = response.player_score;
  let scoreModulus = score % 5;
  let lastScore = scoreModulus - 1;
  question = response.next_question;

  // Show the next question button
  $( "#next_question_btn" ).removeClass("hide");

  $( ".quiz-option" ).each(function(index) {
    if (index == response.correct_answer) {
      $( this ).addClass("correct");
    } else {
      $( this ).addClass("wrong");
    }
  });

  if (response.player_correct) {
    // Update pint glass
    if (scoreModulus > 0) {
      $( "#pint" ).effect( "bounce", "slow" ).removeClass(`pint${lastScore}`).addClass(`pint${scoreModulus}`);
    } else {
      $( "#pint" ).effect( "bounce", "slow" ).removeClass("pint4").addClass("pint5");
      $( "#pint" ).effect( "drop", 'fast' );
      setTimeout(function() {
        $( "#pint" ).removeClass("pint5").addClass("pint0");
        $( "#pint" ).effect( "slide", "fast" );
      }, 1000);
    }
    //play drink sfx
    $( "#drink_sound" )[0].play();
  } else {
    $( "#feck_sound" )[0].play();
  }
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
    url : $( form ).attr("action"), // Get route from form attribute
    contentType : 'application/json;charset=UTF-8',
    data : JSON.stringify(serialised),
    success : callbackSuccess
  });
}
