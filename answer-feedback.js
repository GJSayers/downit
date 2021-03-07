$(document).ready(function () {

    const quizOption = document.getElementsByClassName(".quiz-option");
    const options = Array.from(document.getElementsByClassName(".options"));

    let answerValue = document.getElementsById("#correctAnswer.value");

    let correctAnswer = (answerValue - quizOption.value === 0);

$(".quiz-option.options").addEventListner("click",answerFeedback);

    let answerFeedback 
    function answerFeedback(){
        quizOption.options.forEach(); {

            if (quizOption.options === correctAnswer) {

                $("quiz-option").addClass("correct");
  
            } else {
                
                 $("quiz-option").addClass("wrong");
            }
            // const number = options.dataset["number"];

        }
    }
});


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
            
    