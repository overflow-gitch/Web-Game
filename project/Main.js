const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

let bubbles = [];
let bubbleNum = 3;
for (let index = 0; index < bubbleNum; index++) {
    bubbles.push(new Bubble());
    
}
console.log(bubbles);
let player = new PlayerBubble(250,475);

function gameOver(win){
    let gameOverText = document.createElement("h2");

    if (win){
        gameOverText.innerHTML = "huh, you won."
    }
    else
        gameOverText.innerHTML = "game is over. go home."
    cancelAnimationFrame(request);
    //document.body.removeChild(canvas);
    document.body.replaceChild(gameOverText, canvas);
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