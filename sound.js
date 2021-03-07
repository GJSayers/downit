//Plays 'Drink' sound when user correctly guesses the answer
const drinkSound = document.getElementById('drink_sound');
const correctButton = document.getElementById('correct');
correctButton.addEventListener("click", function()
{ drinkSound.play();
});
