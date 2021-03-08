//Plays 'Drink' sound when user correctly guesses the answer
const drinkSound = document.getElementById('drink_sound');
const correctButton = document.getElementsByClass('correct');
correctButton.addEventListener("click", function(){
 drinkSound.play();
});

//Plays 'Feck' sound when user guesses incorrect answer
const feckSound = document.getElementById('feck_sound');
const incorrectButton = document.getElementsByClass('wrong');
incorrectButton.addEventListener("click", function(){
  feckSound.play();
});
