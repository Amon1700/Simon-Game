var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;
$("body").keypress(function (e) {
        if(start != true)
        {
            $("#level-title").text("level " + level);
            nextSequence();
            start = true;
        }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function() {  $("#" + userChosenColour).removeClass("pressed"); } ,100);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    check(userClickedPattern.length-1);
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);
    var random = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[random];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
}

function check(index) {
    if(userClickedPattern[index] === gamePattern[index])
    {
        console.log("sucess");
      if(userClickedPattern.length === gamePattern.length)
      setTimeout(function() { nextSequence()} ,1000);
    }
    else
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() { $("body").removeClass("game-over")} , 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        start = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}