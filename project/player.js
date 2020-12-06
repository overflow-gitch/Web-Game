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
    movement(e){
        const Direction = e.keyCode;
        if (Direction === 37){
            this.x-=10;
            console.log("move");
        }
        if (Direction === 38){
            this.y-=10;
            console.log("move");
        }
        if (Direction === 39){
            this.x+=10;
            console.log("move");
        }
        if (Direction === 40){
            this.y+=10;
            console.log("move");
        }
    }
}

