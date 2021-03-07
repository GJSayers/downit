$(document).ready(function () {
   $(".quiz-option").each(function(index) {
       
       
            if (index ===  responce.correct_answer) 
             $("quiz-option").addClass("correct");
              else
                 $("quiz-option").addClass("wrong");     
      
   });
})