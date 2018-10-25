//preset value

var textFontWeight = 'normal';
var textFontSize = '17px';
var textFontFace = 'Arial';
var textFontStyle = 'normal';
var textFontColor = 'black'
var isBold = false;
var isItalic = false;

//start to build class
class DrawingText extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.height = null;
        this.width = null;
        typing = false;

    }

    onMouseDown(coord, event) {
        if (!typing) {
            // this.contextDraft.strokeStyle = 'black';
            this.contextDraft.lineWidth = 1;
            this.contextDraft.fillStyle = 'transparent';
            this.contextReal.textAlign = "center";
            this.contextReal.textBaseline = "middle";
            this.origX = coord[0];
            this.origY = coord[1];
        }
    }
    onDragging(coord, event) {
        if (!typing) {
            this.draw(coord, event, this.contextDraft)
        }
    }

    onMouseMove() { }

    onMouseUp(coord) {
        if (!typing) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            typing = true;
            this.textInput(coord);
            resetPosition();
        }
    }
    onMouseLeave() { }
    onMouseEnter() { }
    onKeydown() { }

    draw(coord, event, context) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        this.width = coord[0] - this.origX;
        //For Square
        if (shifting) {
            if (coord[1] - this.origY < 0) {
                this.height = -Math.abs(coord[0] - this.origX);
            }

            else {
                this.height = Math.abs(coord[0] - this.origX);
            }
        }
        //For Rectangle
        else {
            this.width = coord[0] - this.origX;
            this.height = coord[1] - this.origY;
        }
        context.rect(this.origX, this.origY, this.width, this.height);
        context.closePath();
        context.stroke();
        context.fill();
    }
    textInput(coordInput) {

        //Update variables to shift origX and origY to top-left corner
        this.width = Math.abs(this.width);
        this.height = Math.abs(this.height);

        if (coordInput[0] - this.origX < 0) {
            this.origX -= this.width;
        }
        if (coordInput[1] - this.origY < 0) {
            this.origY -= this.height;
        }

        var x = this.origX;
        var y = this.origY + this.height / 2;
        var topmargin = (parseInt($(".canvas").css("top")));
        console.log(topmargin)
        var leftmargin = parseInt($(".canvas").css("left"));

        var width = this.width;

        var textReal = this.contextReal;

        textReal.fillStyle = 'black';

        $('#canvas').append(`<form class='textInputForm' style=" top:${this.origY + topmargin}px; left:${this.origX + leftmargin}px;"> <input class='textInput' style='height:${this.height + 1}px; width:${this.width + 1}px; font-weight:${textFontWeight}; font-size:${textFontSize}; font-style:${textFontStyle}; font-family:${textFontFace}; color:${textFontColor}' type="text" placeholder='Input text here'> </form>`);




        $('#canvas').on('submit', '.textInputForm', function (e) {
            e.preventDefault();
            var message = $('.textInput').val();
            textReal.fillStyle = textFontColor;
            textReal.font = `${textFontWeight} ${textFontStyle} ${textFontSize} ${textFontFace}`
            console.log(textReal.font);
            textReal.fillText(message, x + 10, y);
            $('#canvas').off('submit', '.textInputForm')
            $('.textInputForm').remove()
            $('.cursors').show();
            typing = false;
            var dataURL = canvasReal.toDataURL();
            restorePoints.push(dataURL);
        }
        )
    }

}

function resetPosition() {
    this.width = null;
    this.height = null;
    this.origX = null;
    this.origY = null;

}

//Text Panel//
//Fontface selector//
$('#fontFace').on('input', function () {
    textFontFace = ($(this).val());
    $('.textInput').css('font-family', textFontFace);
})

//FontSize selector//
$('#fontSize').on('input', function () {
    textFontSize = ($(this).val()) + 'px';
    $('.textInput').css('font-size', textFontSize);
})

//bold function in text panel
$('#bold').click(function () {
    if (!isBold) {
        textFontWeight = 'bold';
        isBold = true;
        $('#bold').css('color', 'red');
        $('.textInput').css('font-weight', 'bold');
    } else {
        textFontWeight = 'normal';
        isBold = false;
        $('#bold').css('color', 'white')
        $('.textInput').css('font-weight', 'normal');
    }
}
)

//italic function in text panel
$('#italic').click(function () {
    if (!isItalic) {
        textFontStyle = 'italic';
        isItalic = true;
        $('#italic').css('color', 'red')
        $('.textInput').css('font-style', 'italic');
    } else {
        textFontStyle = 'normal';
        isItalic = false;
        $('#italic').css('font-style', 'normal')
        $('.textInput').css('font-style', 'normal');
    }
}
)

//font-color
$('#font-color').on('input', function () {
    textFontColor = $(this).val();
    $('.textInput').css('color', textFontColor);
})

