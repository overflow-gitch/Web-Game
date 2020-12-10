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
    if (win)
        console.log("huh, you won.")
    else
        console.log("game is over. go home.")
}

function animate() {
    requestAnimationFrame(animate);
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