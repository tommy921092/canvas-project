var canvasReal = document.getElementById('canvas-real');
var contextReal = canvasReal.getContext('2d');
var canvasDraft = document.getElementById('canvas-draft');
var contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let typing = false;
let shifting = false;
let restorePoints = [];
let a = [];
var oImg = new Image();

$('#canvas-draft').mousedown(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});

$('#canvas-draft').mousemove(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    // var message = 'Mouse position: ' + mouseX + ',' + mouseY;
    // writeMessage(canvasReal, message);
    if(dragging){
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove([mouseX,mouseY],e);
});

$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseUp([mouseX,mouseY],e);
});

$('#canvas-draft').mouseleave(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseLeave([mouseX,mouseY],e);
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseEnter([mouseX,mouseY],e);
});

class PaintFunction{
    constructor(){
        this.clearDraft();
        $('#canvas').off('submit', '.textInputForm');
        $('.textInputForm').remove();
    }
    onMouseDown() { }
    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }
    onClick() { }
    onKeydown() { }
    clearDraft() {
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        contextDraft.closePath();
    }
          
}