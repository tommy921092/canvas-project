$(document).ready(function(){
    contextReal.lineWidth = 10;
})

$('#drawing-line').on('click', function () {
    currentFunction = new DrawingLine(contextReal, contextDraft);
});
$('#drawing-straight').on('click', function () {
    currentFunction = new DrawingStraight(contextReal, contextDraft);
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

$(".dropdown-item").on('click', function(){
    console.log($(this).text())
    var pencilChoice = $(this).text();
    switch (pencilChoice){
      case "Solid":
      contextReal.setLineDash([]);
      break
      case "Dotted":
      contextReal.setLineDash([10,10]);
      break
      case "Spray":
      currentFunction = new Spray(contextReal, contextDraft);
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

$(document).ready(function () {

    $("input").change(function () {

        var opacity = $("input[type=range]").val();
        var color = $("input[type=color]").val();

        var rgbaCol = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',' + opacity + ')';

        $('div').css('background-color', rgbaCol)
    })
})