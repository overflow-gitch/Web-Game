const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

let bubbles = [];
let bubbleNum = 3;
for (let index = 0; index < bubbleNum; index++) {
    bubbles.push(new Bubble());
    
}
console.log(bubbles);
let player = new PlayerBubble(100,100);
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (item of bubbles)
        item.update();
    
    player.update();
    }
animate();
document.addEventListener("keydown", function(e) { player.movement(e) });