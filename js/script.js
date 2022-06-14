var gameCanvas;
var ctx;
var canvasWidth = 800px;
var canvasHeight = 600px;
 
window.onload = function () {
        gameCanvas = document.getElementById("gameCanvas");
        gameCanvas.width = canvasWidth; 
        gameCanvas.height = canvasHeight; 
        ctx = gameCanvas.getContext("2d");
};
