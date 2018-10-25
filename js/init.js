// Set Canvas dimension
var winWidth = $(window).width() - 100;
var winHeight = $(window).height() - 200;
var counter=2;
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



$(document).ready(function () {
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
        contextDraft.lineWidth = $(this).val();
    });

    $("#drawing-text").on("click", function () {
        currentFunction = new DrawingText(contextReal, contextDraft);
    });

    $("#pencilType").on('input', function () {
        if ($(this).val() == 'Solid') {
            contextReal.setLineDash([]);
        } else if ($(this).val() == "Dotted") {
            contextReal.setLineDash([10, 10]);
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


// Default function for drawing
currentFunction = new DrawingLine(contextReal, contextDraft);
// clear
$('#clear').click(function () {
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
});

// change the stroke color using default color picker
$('#color-stroke').on('input', function () {
    contextReal.strokeStyle = $(this).val();
    contextDraft.strokeStyle = $(this).val();
})
// change the fill color using default color picker
$('#color-fill').on('input', function () {
    contextReal.fillStyle = $(this).val();
    contextDraft.fillStyle = $(this).val();
})
// display cursor position in canvas
$('canvas').mousemove(function (e) {
    $('.mouse-x').html(e.offsetX);
    $('.mouse-y').html(e.offsetY);
})
// change css attributes shown for different tools
//for pen
$('#tools button:nth-child(2),#tools button:nth-child(3),#tools button:nth-child(4)').on('click', function (e) {
    $('#tools button').removeClass('active');
    $(this).toggleClass('active');
    $('.styleAttr li').css('display', 'inline-block');
    $('.styleAttr li:nth-child(7)').css('display','none');
})
//for shape
$('#tools .dropdown').on('click', function (e) {
    $('#tools button').removeClass('active');
    $(this).toggleClass('active');
    $('.styleAttr li').css('display','inline-block');
})
//for erasor
$('#tools button:nth-child(7)').on('click', function (e) {
    $('#tools button').removeClass('active');
    $(this).toggleClass('active');
    $('.styleAttr li').css('display', 'inline-block');
    $('.styleAttr li:nth-child(7),.styleAttr li:nth-child(8)').css('display','none');
})

    $('canvas').mousemove(function (e) {
        $('.mouse-x').html(e.offsetX);
        $('.mouse-y').html(e.offsetY);
    })

    $('#tools button').on('click', function (e) {
        $('#tools button').removeClass('active');
        $(this).toggleClass('active');
    })


    $('.dropdown-menu button').on('click', function (e) {
        $('.dropdown .dropdown-toggle i').attr('class', $(this).children().attr('class'));
    })

    //undo
    $('#undo').on('click', function () {
        oImg.onload = function () {
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
            contextReal.drawImage(oImg, 0, 0);
        }


        var discard = restorePoints.pop()

        if (discard != undefined) {
            discardedPoints.push(discard)
        }

        if (restorePoints.length > 0) {
            oImg.src = restorePoints.slice(-1);
        } else {
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
        }}
    );



//save as blob
$('#save').on('click',function() {
    canvasReal.toBlob(function(blob){
        var newImg = document.createElement('img'),
            url = URL.createObjectURL(blob);

        newImg.onload = function() {
            URL.revokeObjectURL(url);
        };

        newImg.src = url;
        imagesRef.put(blob).then(function(snapshot){
            console.log('Uploaded a blob!');
            console.log(newImg.src);
        })
        imagesRef = storageRef.child(`image${counter}`);
        counter++;
        // document.body.appendChild(newImg);
        imagesRef.getDownloadURL().then(function(downloadURL){
            alert('File available at '+downloadURL);
    });
    })
})
});
