let startTime = 1.00; //set countdown in Minutes

function redirect() {
  location.replace("https://down-it.herokuapp.com/")
}
  
  function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let intervalLoop = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
		for(let i=0;i<display.length;i++){
          display[i].textContent = seconds;
        }
        if (--timer < 0) {
          for(let i=0;i<display.length;i++){
            redirect();
          }
          clearInterval(intervalLoop);
        }
        }, 1000);     
    }
    
window.onload = function () {
    let setMinutes = 60 * startTime,
    display = document.querySelectorAll(".timer");
    startTimer(setMinutes, display, redirect);
};