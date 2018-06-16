var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class Ball {
    x: number;
    y: number;
    r: number;
    dx: number;
    dy: number;
    h: Boolean;
    constructor(x: number, y: number, r: number, dx: number, dy: number) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.h = false;
    }
    async speedUp() {
	console.log(this.dx);
	this.dx = 2*this.dx;
	this.dy = 2*this.dy;
    }
    async slowDown() {
	this.dx = this.dx/2;
	this.dy = this.dy/2;
    }
    drawBall() {
	if (this.h == true) {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.r*1.4, 0, Math.PI*2);
	    ctx.fillStyle = "#FF0000";
	    ctx.fill();
	    ctx.closePath();
	}
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	this.update();
    }
    bump() {
	for(let i=1; i< selectlist.length; i++) {
	    if (this !== selectlist[i]) {
		if(Math.pow(this.x-selectlist[i].x, 2)+Math.pow(this.y-selectlist[i].y, 2) <= Math.pow(this.r+selectlist[i].r, 2)) {
		    return true;
		}
	    }
	}
	return false;
    }
    update() {
	if (this.y + this.dy > canvas.height-this.r || this.y+this.dy < this.r || this.bump()) {
	    this.dy = -this.dy;
	}
	if (this.x + this.dx > canvas.width-this.r || this.x+this.dx < this.r || this.bump()) {
	    this.dx= -this.dx;
	}
	this.x += this.dx;
	this.y += this.dy;
    }
}
var selectlist = [null];
var selector = 0;
var selected: Ball;



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=1; i< selectlist.length; i++) {
	selectlist[i].drawBall();
    }
}

function switcher() {
    selector += 1;
    selected = selectlist[selector % (selectlist.length)];
    for (let i =0; i < selectlist.length; i+=1) {
	if (selectlist[i]) {
	    if (i === (selector % selectlist.length)) {
		selected = selectlist[i];
		selected.h = true;
	    } else {
		selectlist[i].h = false;
	    }
	}
    }
}

function addBall() {
    let newBall = new Ball(34, 24, 10, .32, 1.18);
    selectlist.push(newBall);
}

setInterval(draw, 10);

var speedup = document.querySelector("#speedup");
speedup.addEventListener("click", () => {selected.speedUp();});
var slowdown = document.querySelector("#slowdown");
slowdown.addEventListener("click", () => {selected.slowDown();});
var select = document.querySelector("#selector");
select.addEventListener("click", switcher);
var add = document.querySelector("#addBall");
add.addEventListener("click", addBall);
