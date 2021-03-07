$(document).ready(function () {
   $(".quiz-option").each(function() {
       
       for (let i=0; i< quiz-options.length; i++); {

            if ($("quizOption").val() ===  $("responce").correct_answer) 
             $("quiz-option").addClass("correct");
              else
                 $("quiz-option").addClass("wrong");     
      };
   });
})