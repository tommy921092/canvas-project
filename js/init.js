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


// Opacity function ////////////////////////////////////
$("#opacity").on("input", function () {
    contextReal.globalAlpha = $(this).val();
});


$("#drawing-text").on("click", function () {
    currentFunction = new DrawingText (contextReal, contextDraft);
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