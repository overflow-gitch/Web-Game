//This creates circles that can be targeted and modified
class Bubble {
    constructor(){
        this.radius = 30;
        this.x = this.radius + (Math.random() * (canvas.width - (this.radius * 2)));
		this.y = this.radius + (Math.random() * (canvas.height - (this.radius * 2)));
        this.velocity = {
			x: 1,
			y: 1
        }
        this.color = context.fillStyle = "green";
        this.timesHit = 0;
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
			if (this.isColliding(bubble)) {
                this.velocity.x = -this.velocity.x;
                this.velocity.y = -this.velocity.y;
                    this.modifyBehaviour();
            }
            if (this.isColliding(player)){
                gameOver(false);
                //stops the bubbles from incorrectly triggering multiple gameovers.
                break;
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
    modifyBehaviour(){
        if (this.color === "yellow"){
            this.color = "red";
            this.velocity.x *= 2;
            this.velocity.y *= 2;
            this.radius -= 10;
        }
        if (this.color === "green"){
            this.color = "yellow";
            this.velocity.x *= 2;
            this.velocity.y *= 2;
            this.radius -= 10;
        }
    }
}
