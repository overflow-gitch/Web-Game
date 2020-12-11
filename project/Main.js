const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
let saveState = canvas;
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

function newGame(){
    for (let index = 0; index < bubbleNum; index++) {
        bubbles.pop(bubbles[index]);
    }
    for (let index = 0; index < bubbleNum; index++) {
        bubbles.push(new Bubble());
    }
    player = new PlayerBubble(250,475);
    animate();
}
let bubbles = [];
let bubbleNum = 3;
for (let index = 0; index < bubbleNum; index++) {
    bubbles.push(new Bubble());
}
console.log(bubbles);
let player = new PlayerBubble(250,475);

function gameOver(win){
    if (win){
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
    document.body.replaceChild(gameOverText, canvas);
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
animate();
document.addEventListener("keydown", function(e) { player.movement(e) });