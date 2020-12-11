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
const lives = document.getElementById("lives");
const points = document.getElementById("points");
let liveCount = 3;
let pointCount = 0;
let celebration = new Audio('Ta Da-SoundBible.com-1884170640.mp3');


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
let bubbles = [];
let bubbleNum = 3;

function gameOver(win){
    if (win){
        celebration.play();
        gameOverText.innerHTML = "huh, you won."
        pointCount++;
        points.innerHTML = "points:" + pointCount;
    }
    else{
        gameOverText.innerHTML = "game is over. go home.";
        liveCount--;
        lives.innerHTML = "Lives:" + liveCount;
    }
    if (liveCount <= 0){
        gameOverText.innerHTML = "You have lost all your lives, game will restart next time.";
    }
    cancelAnimationFrame(request);
    document.body.removeChild(canvas);
    document.body.appendChild(gameOverText);
    document.body.appendChild(replayButton);
}
let request;
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
start.addEventListener("click", function(){
    document.body.removeChild(start);
    document.body.removeChild(introText);
    document.body.appendChild(canvas);
    newGame();
})
document.addEventListener("keydown", function(e) { player.movement(e) });