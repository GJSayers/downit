let score;

$("button").click(function(){

    score = document.getElementById("numberInput").value; 

    let scoreAsNumber = parseInt(score);

    let scoreModulus = scoreAsNumber % 5;

    let html = `
        <div class="add-pint">
        <img src="/assets/pint-counter-icon.svg">
        </div>
    `;

    console.log(scoreModulus);

    function refill() {
        $("div").removeClass("pint5").addClass("pint0");
        $("div").effect( "slide", "fast" );
    }

    if (scoreModulus === 1) {
        $("div").effect( "bounce", "slow" ).removeClass("pint0").addClass("pint1",);
    } else if (scoreModulus === 2) {
        $("div").effect( "bounce", "slow" ).removeClass("pint1").addClass("pint2");
    } else if (scoreModulus === 3) {
        $("div").effect( "bounce", "slow" ).removeClass("pint2").addClass("pint3");
    } else if (scoreModulus === 4) {
        $("div").effect( "bounce", "slow" ).removeClass("pint3").addClass("pint4");
    } else if (scoreModulus === 0) {
        $("div").effect( "bounce", "slow" ).removeClass("pint4").addClass("pint5");
        $("div").effect( "drop", 'fast' );
        setTimeout(refill, 1000);
        $("#pint-counter").append(html);
    }
      
});
