//This creates circles that can be contolled
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
    //responsible for movement of the player.
    movement(e){
        const Speed = 15;
        const Direction = e.keyCode;
        if (Direction === 37 && this.x - this.radius > canvas.clientLeft){
            this.x -= Speed;
        }
        if (Direction === 38 && this.y - this.radius > canvas.clientTop){
            this.y -= Speed;
        }
        if (Direction === 39 && this.x + this.radius < canvas.clientWidth){
            this.x += Speed;
        }
        if (Direction === 40 && this.y + this.radius < canvas.clientWidth){
            this.y += Speed;
        }
    }
}

