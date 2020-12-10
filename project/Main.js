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
    newGame();
});

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
    }
    else
        gameOverText.innerHTML = "game is over. go home."
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