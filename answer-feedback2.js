$(document).ready(function () {

    const quizOption = document.getElementsByClassName(".quiz-option");
    const options = Array.from(document.getElementsByClassName(".quiz-option"));

    let answerValue = document.getElementsById("#correct_answer.value");

    let correctAnswer = (answerValue --- quizOption.value === 0);

    let wrongAnswer = (answerValue --- quizOption.value !== 0);

$(".quiz-option").addEventListner("click",answerFeedback);

    let answerFeedback 

    function answerFeedback(){
        quizOption.forEach(); {

            for (let i=0; i< options.lenghth; i++ ) {

            if (quizOption.options === correctAnswer) {

                $("quiz-option").addClass("correct");
  
            } else {
                
                 $("quiz-option").addClass("wrong");
            }
            // const number = options.dataset["number"];
          }       
        }
    }
});