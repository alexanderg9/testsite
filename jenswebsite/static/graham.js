"use strict";
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
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var Ball = /** @class */ (function () {
    function Ball(x, y, r, dx, dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.h = false;
    }
    Ball.prototype.speedUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(this.dx);
                this.dx = 2 * this.dx;
                this.dy = 2 * this.dy;
                return [2 /*return*/];
            });
        });
    };
    Ball.prototype.slowDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.dx = this.dx / 2;
                this.dy = this.dy / 2;
                return [2 /*return*/];
            });
        });
    };
    Ball.prototype.drawBall = function () {
        if (this.h == true) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r * 1.4, 0, Math.PI * 2);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        this.update();
    };
    Ball.prototype.bump = function () {
        for (var i = 1; i < selectlist.length; i++) {
            if (this !== selectlist[i]) {
                if (Math.pow(this.x - selectlist[i].x, 2) + Math.pow(this.y - selectlist[i].y, 2) <= Math.pow(this.r + selectlist[i].r, 2)) {
                    return true;
                }
            }
        }
        return false;
    };
    Ball.prototype.update = function () {
        if (this.y + this.dy > canvas.height - this.r || this.y + this.dy < this.r || this.bump()) {
            this.dy = -this.dy;
        }
        if (this.x + this.dx > canvas.width - this.r || this.x + this.dx < this.r || this.bump()) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
    };
    return Ball;
}());
var selectlist = [null];
var selector = 0;
var selected;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 1; i < selectlist.length; i++) {
        selectlist[i].drawBall();
    }
}
function switcher() {
    selector += 1;
    selected = selectlist[selector % (selectlist.length)];
    for (var i = 0; i < selectlist.length; i += 1) {
        if (selectlist[i]) {
            if (i === (selector % selectlist.length)) {
                selected = selectlist[i];
                selected.h = true;
            }
            else {
                selectlist[i].h = false;
            }
        }
    }
}
function addBall() {
    var newBall = new Ball(34, 24, 10, .32, 1.18);
    selectlist.push(newBall);
}
setInterval(draw, 10);
var speedup = document.querySelector("#speedup");
speedup.addEventListener("click", function () { selected.speedUp(); });
var slowdown = document.querySelector("#slowdown");
slowdown.addEventListener("click", function () { selected.slowDown(); });
var select = document.querySelector("#selector");
select.addEventListener("click", switcher);
var add = document.querySelector("#addBall");
add.addEventListener("click", addBall);
