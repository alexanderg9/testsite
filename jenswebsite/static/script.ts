
//make them objects somehow, so its where you click, and not calculated? which would allow clicking white notes farther up


var width = Math.floor(900 / 52);

function draw_key(x, y, width, height, colour) {
    ctx.beginPath();
    ctx.rect(x, 0, width, height);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, height);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
}

function draw(highlightx, highlighty) {
    var x = 0;
    var key = 0;
    for (;x < 900-width; x+= width) {
	draw_key(x, 0, width, 100, 'white');
	if (highlightx > x && highlightx < x+width && highlighty > 75) {
	    draw_key(x, 0, width, 100, 'blue');
	    play(highlightx, 0, key);
	}	
	key += 1;
    }
    key = 0;
    var index = 0;
    for (x=0; x < 900 - (2*width); x+= width) {	
	let bx = x + Math.floor(width/2);
	if (key % 7 != 1 && key % 7 != 4) {
	    draw_key(bx, 0, width, 75, 'black');
	    if (highlightx > bx && highlightx < bx+width && highlighty < 75) {
		draw_key(bx, 0, width, 75, 'blue');
		play(highlightx, 1, index)
	    }
	    index += 1;
	}	
	key += 1;
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function note(e) {
    let x = e.clientX;
    let y = e.clientY - rect.top;
    draw(x, y);
}
async function play(x, colour, key) {
    //colour 0 is white. colour 1 is black key
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';

    //using 900
    if (colour === 0) {
	oscillator.frequency.value = whitefreq[key];
	console.log(whitefreq[key]);
    }
    else {
	oscillator.frequency.value = blackfreq[key];
	console.log(blackfreq[key]);
    }
    oscillator.start();
    await sleep(300);
    oscillator.stop();
}
var whitefreq = [27.5, 30.87, 32.70, 36.71, 41.20, 43.65, 49, 55, 61.74, 65.41, 73.42, 82.41, 87.31, 98, 110, 123.47, 130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.67, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33, 659.26, 698.46, 783.99, 880, 987.77, 1046.5, 1174.66, 1318.51, 1396.91, 1567.98, 1760, 1975.53, 2093, 2349.32, 2637.02, 2793.83, 3135.96, 3520, 3951.07, 4186.01];

var blackfreq = [29.14, 34.65, 38.89, 46.25, 51.91, 58.27, 69.3, 77.78, 92.5, 103.83, 116.54, 138.59, 155.56, 185, 207.65, 233.08, 277.18, 311.13, 369.99, 415.31, 466.16, 554.37, 622.25, 739.99, 830.61, 932.33, 1108.73, 1244.51, 1479.98, 1661.22, 1864.66, 2217.46, 2489.02, 2959.96, 3322.44, 3729.31];

var canvas = <HTMLCanvasElement>(document.getElementById("myCanvas"));
var rect = canvas.getBoundingClientRect();
var ctx = canvas.getContext("2d");
canvas.addEventListener('click', (e)=>{note(e);});

draw();
