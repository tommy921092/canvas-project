$(document).ready(function(){
    contextReal.lineWidth = 10;


$('#drawing-line').on('click', function () {
    currentFunction = new DrawingLine(contextReal, contextDraft);
});
$('#drawing-straight').on('click', function () {
    currentFunction = new DrawingStraight(contextReal, contextDraft);
});
$('#drawing-spray').on('click', function () {
    currentFunction = new DrawingSpray(contextReal, contextDraft);
});
$('#drawing-rectangle').on('click', function () {
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
});
$('#drawing-square').on('click', function () {
    currentFunction = new DrawingSquare(contextReal, contextDraft);
});
$('#drawing-oval').on('click', function () {
    currentFunction = new DrawingOval(contextReal, contextDraft);
});
$('#drawing-circle').on('click', function () {
    currentFunction = new DrawingCircle(contextReal, contextDraft);
});
$('#drawing-polygon').on('click', function () {
    currentFunction = new DrawingPolygon(contextReal, contextDraft);
});
$('#drawing-star').on('click', function () {
    currentFunction = new DrawingStar(contextReal, contextDraft);
});
$('#Eraser').on('click', function () {
    currentFunction = new Eraser(contextReal, contextDraft);
});

$("#brushSize").on("input", function () {
    contextReal.lineWidth = $(this).val();
});

$("select").on('input', function(){
      if($(this).val()=='Solid'){
        contextReal.setLineDash([]);
      } else {
        contextReal.setLineDash([10,10]);
      }
    })

//Default
currentFunction = new DrawingLine(contextReal, contextDraft);//default shape
// clear
$('#clear').click(function () {
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
});

$('#color-stroke').on('input', function () {
    contextReal.strokeStyle = $(this).val();
    contextDraft.strokeStyle = $(this).val();
})
$('#color-fill').on('input', function () {
    contextReal.fillStyle = $(this).val();
    contextDraft.fillStyle = $(this).val();
})

$('canvas').mousemove(function (e) {
    $('.mouse-x').html(e.offsetX);
    $('.mouse-y').html(e.offsetY);
})

$('#tools button').on('click', function (e) {
    $('#tools button').removeClass('active');
    $(this).toggleClass('active');
})

$('.dropdown-menu button').on('click',function(e){
    $('.dropdown .dropdown-toggle i').attr('class', $(this).children().attr('class'));
})

$('#undo').on('click',function(){
    if(!(currentFunction instanceof DrawingRectangle)){
        restorePoints.pop();
    } else {
        restorePoints.pop();
        restorePoints.pop();
    }
        oImg.src = restorePoints.slice(-1);
        oImg.onload = function() {
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
            contextReal.drawImage(oImg,0,0);
        }
        if(restorePoints.length==0){
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
        }

});

$('#redo').on('click',function() {
})
});

$('#save').on('click',function() {
    canvasReal.toBlob(function(blob){
        var newImg = document.createElement('img'),
            url = URL.createObjectURL(blob);

        newImg.onload = function() {
            URL.revokeObjectURL(url);
        };

        newImg.src = url;
        document.body.appendChild(newImg);
    });
});