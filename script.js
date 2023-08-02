var countdown;
var timeLeft;
var score;
var highScore = 0;
var question;
var answer;

function nextQuestion() {
    var numLimit = parseInt($("#number-limit").val());
    if (isNaN(numLimit)) {
        numLimit = 10;
    }
    
    var num1 = Math.floor(Math.random() * (numLimit + 1));
    var num2 = Math.floor(Math.random() * (numLimit + 1));
    
    if(num1 < num2){
        var temp = num1;
        num1 = num2;
        num2 = temp;
    }
    
    var operator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];

    switch (operator) {
        case "+":
            question = num1 + " + " + num2;
            answer = num1 + num2;
            break;
        case "-":
            question = num1 + " - " + num2;
            answer = num1 - num2;
            break;
        case "*":
            question = num1 + " * " + num2;
            answer = num1 * num2;
            break;
        case "/":
            num1 = num1 * num2;
            question = num1 + " / " + num2;
            answer = num1 / num2;
            break;
    }
    
    $("#question").text(question);
    $("#answer").val("");
}

function startGame() {
    score = 0;
    timeLeft = 10;
    $("#score").text("Score: " + score);
    $("#timer").text("Time: " + timeLeft);
    $("#start").hide();
    $("#restart").hide();
    nextQuestion();
    countdown = setInterval(function() {
        timeLeft--;
        $("#timer").text("Time: " + timeLeft);
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(countdown);
    $("#start").hide();
    $("#restart").show();
    if (score > highScore) {
        highScore = score;
        $("#high-score").text("High Score: " + highScore);
    }
}

$(document).ready(function() {
    $("#start").click(startGame);
    $("#restart").click(startGame);
    $("#answer").keypress(function(e) {
        if (e.which == 13) {
            if ($("#answer").val() == answer) {
                score++;
                timeLeft += 1;
                $("#score").text("Score: " + score);
                nextQuestion();
            }
        }
    });
});
