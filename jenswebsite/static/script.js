"use strict";
//make them objects somehow, so its where you click, and not calculated? which would allow clicking white notes farther up
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    for (; x < 900 - width; x += width) {
        draw_key(x, 0, width, 100, 'white');
        if (highlightx > x && highlightx < x + width && highlighty > 75) {
            draw_key(x, 0, width, 100, 'blue');
            play(highlightx, 0, key);
        }
        key += 1;
    }
    key = 0;
    var index = 0;
    for (x = 0; x < 900 - (2 * width); x += width) {
        var bx = x + Math.floor(width / 2);
        if (key % 7 != 1 && key % 7 != 4) {
            draw_key(bx, 0, width, 75, 'black');
            if (highlightx > bx && highlightx < bx + width && highlighty < 75) {
                draw_key(bx, 0, width, 75, 'blue');
                play(highlightx, 1, index);
            }
            index += 1;
        }
        key += 1;
    }
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function note(e) {
    return __awaiter(this, void 0, void 0, function () {
        var x, y;
        return __generator(this, function (_a) {
            x = e.clientX;
            y = e.clientY - rect.top;
            draw(x, y);
            return [2 /*return*/];
        });
    });
}
function play(x, colour, key) {
    return __awaiter(this, void 0, void 0, function () {
        var audioCtx, oscillator, gainNode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    oscillator = audioCtx.createOscillator();
                    gainNode = audioCtx.createGain();
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
                    return [4 /*yield*/, sleep(300)];
                case 1:
                    _a.sent();
                    oscillator.stop();
                    return [2 /*return*/];
            }
        });
    });
}
var whitefreq = [27.5, 30.87, 32.70, 36.71, 41.20, 43.65, 49, 55, 61.74, 65.41, 73.42, 82.41, 87.31, 98, 110, 123.47, 130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.67, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33, 659.26, 698.46, 783.99, 880, 987.77, 1046.5, 1174.66, 1318.51, 1396.91, 1567.98, 1760, 1975.53, 2093, 2349.32, 2637.02, 2793.83, 3135.96, 3520, 3951.07, 4186.01];
var blackfreq = [29.14, 34.65, 38.89, 46.25, 51.91, 58.27, 69.3, 77.78, 92.5, 103.83, 116.54, 138.59, 155.56, 185, 207.65, 233.08, 277.18, 311.13, 369.99, 415.31, 466.16, 554.37, 622.25, 739.99, 830.61, 932.33, 1108.73, 1244.51, 1479.98, 1661.22, 1864.66, 2217.46, 2489.02, 2959.96, 3322.44, 3729.31];
var canvas = (document.getElementById("myCanvas"));
var rect = canvas.getBoundingClientRect();
var ctx = canvas.getContext("2d");
canvas.addEventListener('click', function (e) { note(e); });
draw();
