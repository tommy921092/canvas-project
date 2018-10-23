// Set Canvas dimension
var winWidth = $(window).width() - 100;
var winHeight = $(window).height() - 200;
$("#width").attr("value", winWidth);
$("#height").attr("value", winHeight);
$('#canvas canvas').attr("width", winWidth).attr("height", winHeight);

// create new canvas
$('.canvas-size').submit(function (e) {
    e.preventDefault();
    $('.splash').fadeOut('slow');
    var width = $("#width").val();
    var height = $("#height").val();
    $('#canvas canvas').attr("width", width).attr("height", height);
    contextReal.fillStyle = 'white';
    contextReal.fillRect(0, 0, canvasReal.width, canvasReal.height);
})


// import image

$('input.import-file').click(function (e) {
    e.preventDefault();
    $('input.upload').click();
});
$('input.upload').change(function () {
    var file = document.querySelector('input[type=file]').files[0];
    var url = URL.createObjectURL(file);
    var img = new Image();
    var imgWidth = null;
    var imgHeight = null;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        if (this.width > this.height) {
            if (canvasReal.width / (this.width / this.height) > canvasReal.height) {
                imgHeight = canvasReal.height;
                imgWidth = imgHeight * (this.width / this.height);
            } else {
                imgWidth = canvasReal.width
                imgHeight = canvasReal.width * (this.height / this.width);
            }
        } else {
            if (canvasReal.height * (this.width / this.height > canvasReal.width)) {
                imgWidth = canvasReal.width;
                imgHeight = imgWidth * (this.height / this.width);
            } else {
                imgHeight = canvasReal.height;
                imgWidth = canvasReal.height * (this.width / this.height);
            }
        }
        $('#canvas canvas').attr("width", imgWidth).attr("height", imgHeight);
        $('#canvas, #canvas-grid.grid').css("width", imgWidth).css("height", imgHeight);
        contextReal.drawImage(img, 0, 0, imgWidth, imgHeight);
    }
    img.src = url;
    $('.splash').fadeOut('slow');
});














$('#drawing-line').on('click', function(){
    currentFunction = new DrawingLine(contextReal,contextDraft);
  });
$('#drawing-straight').on('click', function(){
currentFunction = new DrawingStraight(contextReal,contextDraft);
});
$('#drawing-rectangle').on('click', function(){
currentFunction = new DrawingRectangle(contextReal,contextDraft);
});
$('#drawing-square').on('click', function(){
currentFunction = new DrawingSquare(contextReal,contextDraft);
});
$('#drawing-oval').on('click', function(){
currentFunction = new DrawingOval(contextReal,contextDraft);
});
$('#drawing-circle').on('click', function(){
currentFunction = new DrawingCircle(contextReal,contextDraft);
});
$('#drawing-polygon').on('click', function(){
currentFunction = new DrawingPolygon(contextReal,contextDraft);
});
$('#drawing-star').on('click', function(){
currentFunction = new DrawingStar(contextReal,contextDraft);
});
//Default
currentFunction = new DrawingLine(contextReal,contextDraft);//default shape
// clear
$('#clear').click(function () {
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
});

$('#color-stroke').on('input', function() {
    contextReal.strokeStyle = $(this).val();
    contextDraft.strokeStyle = $(this).val();
})
$('#color-fill').on('input', function() {
    contextReal.fillStyle = $(this).val();
    contextDraft.fillStyle = $(this).val();
})

$('canvas').mousemove(function(e){
    $('.mouse-x').html(e.offsetX);
    $('.mouse-y').html(e.offsetY);
})

$('#tools button').on('click',function(e){
    $('#tools button').removeClass('active');
    $(this).toggleClass('active');
})

$(document).ready(function() {

    $("input").change(function() {

        var opacity = $("input[type=range]").val();
        var color = $("input[type=color]").val();

        var rgbaCol = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',' + opacity + ')';

        $('div').css('background-color', rgbaCol)
    })
})