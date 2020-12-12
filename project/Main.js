//Elements and settings for elements.
const canvas = document.createElement('canvas');
canvas.height = 500;
canvas.width = 500;
const context = canvas.getContext('2d');
let saveState = canvas;
const start = document.getElementById("startButton");
const introText = document.getElementById("introText");
const gameOverText = document.createElement("h2");
const replayButton = document.createElement("button");
replayButton.style.display = "block";
replayButton.innerHTML = "Replay";
//for identifying the animation request for stopping.
let request;

//game data and a sound file for winning.
const lives = document.getElementById("lives");
const points = document.getElementById("points");
let bubbles = [];
let bubbleNum = 3;
let liveCount = 3;
let pointCount = 0;
let celebration = new Audio('Ta Da-SoundBible.com-1884170640.mp3');

//Creates a new game state. populating the game canvas with enemies and then animating them.
function newGame(){
    for (let index = 0; index < bubbleNum; index++) {
        bubbles.pop(bubbles[index]);
    }
    bubbleNum = 3 + Math.floor(Math.random() * pointCount);
    for (let index = 0; index < bubbleNum; index++) {
        bubbles.push(new Bubble());
    }
    player = new PlayerBubble(250,475);
    animate();
}
//Creates the game over fail state. Responsible for resetting all progress once lives are depleted and stopping the animation.
function gameOver(win){
    if (win){
        celebration.play();
        gameOverText.innerHTML = "Congratulations, you gain a point, the enemies are attracted to them."
        pointCount++;
        points.innerHTML = "points:" + pointCount;
    }
    else{
        gameOverText.innerHTML = "You have died a most undignified death, game over.";
        liveCount--;
        lives.innerHTML = "Lives:" + liveCount;
    }
    if (liveCount <= 0){
        gameOverText.innerHTML = "You have lost all your lives, the game will restart next time.";
    }
    cancelAnimationFrame(request);
    document.body.removeChild(canvas);
    document.body.appendChild(gameOverText);
    document.body.appendChild(replayButton);
}
//animates and moves the game and its pieces.
function animate() {
    request = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (item of bubbles){
        item.update();
    }
    player.update();
    if (player.y - player.radius <= canvas.clientTop)
        gameOver(true);
}
//event listeners
//Starts the game for the first time in the intro splash screen.
start.addEventListener("click", function(){
    document.body.removeChild(start);
    document.body.removeChild(introText);
    document.body.appendChild(canvas);
    newGame();
});
//Triggers player movement with the arrow keys.
document.addEventListener("keydown", function(e) { player.movement(e) });

//starts the game again after the game finishes.
replayButton.addEventListener("click", function () {
    document.body.replaceChild(canvas, gameOverText);
    document.body.removeChild(replayButton);
    if (liveCount <= 0){
        liveCount = 3;
        pointCount = 0;
        lives.innerHTML = "Lives:" + liveCount;
        points.innerHTML = "points:" + pointCount;
    }
    newGame();
});