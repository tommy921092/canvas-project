var canvasReal = document.getElementById('canvas-real');
var contextReal = canvasReal.getContext('2d');
var canvasDraft = document.getElementById('canvas-draft');
var contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let typing = false;
let shifting = false;
let restorePoints = [];// for undo
let discardedPoints =[];// for redo
var oImg = new Image();// for screenshot

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
        contextReal.strokeStyle = $('#color-stroke').val();
        contextDraft.strokeStyle = $('#color-stroke').val();
        contextReal.fillStyle = $('#color-fill').val();
        contextDraft.fillStyle = $('#color-fill').val();
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
//download the drawing to disk as png
function download(){
    var download = document.getElementById("download");
    var image = document.getElementById("canvas-real").toDataURL("image/png")
                // .replace("image/png", "image/octet-stream");
                // console.log(image)
    download.setAttribute("href", image);
}


