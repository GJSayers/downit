$(document).ready(function () {


    document.getElementById("button").addEventListener('click',answerFeeback);

    let answerFeedback {
        if (question.option === answer.option) {

            $("button").removeClass("button").addClass("button-correct");
            
        } else {

            $("button").removeClass("button").addClass("button-incorrect");
            
        }
    }