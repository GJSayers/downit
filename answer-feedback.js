$(document).ready(function () {

    const quizOption = document.getElementsByClassName("quiz-option");
    const options = Array.from(document.getElementsByClassName("options"));

    let correctAnswer 

$(".quiz-option.options").addEventListner("click",answerFeedback);

    let answerFeedback (function(){
        quizOption.options.forEach(); {

            if (quizOption.options === correctAnswer) {

                $("quiz-option").removeClass("quiz-option input").addClass("quiz-option correct input");

                
            } else {
                
                 $("quiz-option").removeClass("quiz-option input").addClass("quiz-option wrong input");
            }
            const number = options.dataset["number"];

        }
    }


   // function()

   // .quiz-form.forEach(.quiz-option => {
 //.quiz-option.addEventListner("click",)
        
  //  });

   // document.getElementById("button").addEventListener('click',answerFeeback);

  //  let answerFeedback function(){
  //      if (question.option === answer.option) {

   //         $("button").removeClass("button").addClass("button-correct");
            
   //     } else {

   //         $("button").removeClass("button").addClass("button-incorrect");
            
        }));