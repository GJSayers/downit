let score;

$("button").click(function(){

    score = document.getElementById("numberInput").value; 

    let scoreAsNumber = parseInt(score);

    const firstGulp = [1, 6, 11, 16, 21, 26, 31, 36, 41];
    const secondGulp = [2, 7, 12, 17, 22, 27, 32, 37, 42];
    const thirdGulp = [3, 8, 13, 18, 23, 28, 33, 38, 43];
    const forthGulp = [4, 9, 14, 19, 24, 29, 34, 39, 44];
    const fifthGulp = [5, 10, 15, 20, 25, 30, 35, 40, 45];


    console.log(score);

    function refill() {
        $("div").removeClass("pint5").addClass("pint0");
        $("div").effect( "slide", "fast" );
    }

    if (firstGulp.includes(scoreAsNumber)) {
        $("div").effect( "bounce", "slow" ).removeClass("pint0").addClass("pint1",);
    } else if (secondGulp.includes(scoreAsNumber)) {
        $("div").effect( "bounce", "slow" ).removeClass("pint1").addClass("pint2");
    } else if (thirdGulp.includes(scoreAsNumber)) {
        $("div").effect( "bounce", "slow" ).removeClass("pint2").addClass("pint3");
    } else if (forthGulp.includes(scoreAsNumber)) {
        $("div").effect( "bounce", "slow" ).removeClass("pint3").addClass("pint4");
    } else if (fifthGulp.includes(scoreAsNumber)) {
        $("div").effect( "bounce", "slow" ).removeClass("pint4").addClass("pint5");
        $("div").effect( "drop", 'fast' );
        setTimeout(refill, 1000);
    }
      
});