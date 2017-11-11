const canvas = document.getElementById("game");
const CTX = canvas.getContext("2d");

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const TILE_H = 48;
const TILE_SURFACE_H = 32;
const TILE_W = 64;
const INTERVAL = 30;
const Y_OFFSET = 50;
const PADDING = 20;

var gameData = {
    owner_id:0,
    opponent_id: 0,
    opponent_move: [],
    owner_move: [],
    gameStack:[],
    winner_id: 0,    
};

function isometricToScreen(x, y){
    var _x = (x - y) * TILE_W/2;
    var _y = (x + y) * TILE_SURFACE_H/2;
    return {x:_x, y:_y};
}

function screenToIsometric(x, y){
   var _x = (x / (TILE_W/2) + y / (TILE_SURFACE_H/2)) /2;
var _y = (y / (TILE_SURFACE_H/2) - x / (TILE_W/2)) /2;
    return {x:_x, y:_y}
}

window.requestAnimFrame = (function(){
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
			// apply to our window global to avoid illegal invocations (it's a native)
			return function (callback, element) {
				func.apply(window, [callback, element]);
			};
		})();
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}