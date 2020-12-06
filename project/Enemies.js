//gets the canvas element and it's info for drawing.



//This creates circles that can be targeted and modified
class Bubble {
    constructor(){
        this.radius = 20;
        this.x = this.radius + (Math.random() * (canvas.width - (this.radius * 2)));
		this.y = this.radius + (Math.random() * (canvas.height - (this.radius * 2)));
        this.velocity = {
			x: 1,
			y: 1
        }
        this.color = context.fillStyle = "white";
    }
    draw(){
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
    }
    update(){
        this.checkCanvasBounds();

        for (let bubble of bubbles) {
            //bubble.checkCanvasBounds();
			if (this.isColliding(bubble)) {
                this.velocity.x = -this.velocity.x;
                this.velocity.y = -this.velocity.y;
                this.color = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')'             
            }
		}
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
    //keeps the bubble inside the canvas
    checkCanvasBounds() {
		if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
            this.velocity.x = -this.velocity.x;
		}
		if ((this.y + this.radius) > canvas.height || (this.y - this.radius) < 0) {
			this.velocity.y = -this.velocity.y;
        }
    }
    isColliding(bubble) {
        //The logic behind this code was taken from last semester's UI project. This is because finding the distance between two points means to do the math as done in math.hypot method.
		let distance = Math.hypot(this.x - bubble.x, this.y - bubble.y);
		return (distance <= (this.radius + bubble.radius) && distance > 0);
	}
}
