//gets the canvas element and it's info for drawing.
//const canvas = document.getElementsByTagName('canvas')[0];
//const context = canvas.getContext('2d');


//This creates circles that can be targeted and modified
class PlayerBubble {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 25;
    }
    draw(){
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.fillStyle = "white";
        context.fill();
    }
    update(){
        this.draw();
    }
    moveWithMouse(e){
        
        if (e.clientX >= this.x - this.radius && e.clientX <= this.x + this.radius && e.clientY >= this.y - this.radius && e.clientY <= this.y + this.radius) {
            this.x = e.clientX;
            this.y = e.clientY;
            this.draw();
        }
        console.log(e.clientX + "," + e.clientY);
    }
}

