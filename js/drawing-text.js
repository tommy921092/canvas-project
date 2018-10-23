class DrawingText extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.height = null;
        this.width = null;
        this.typing = false;
        // $('.text-panel').fadeIn(220);
    }

    onMouseDown(coord, event) {
        if (!typing) {
            styleSet();
            this.contextDraft.strokeStyle = 'black';
            this.contextReal.strokeStyle = 'transparent';
            this.contextDraft.lineWidth = 1;
            this.contextDraft.fillStyle = 'transparent';
            this.contextReal.fillStyle = 'transparent';
            this.contextReal.font = '1px arial';
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
        var width = this.width;

        var textReal = this.contextReal;

        $('#canvas-container').append(`<form class='textInputForm' style=" top:${this.origY+50}px; left:${this.origX+100}px;"> <input class='textInput' style='height:${this.height + 1}px; width:${this.width + 1}px;' type="text" placeholder='Input text here'> </form>`);
        $('.textInput').focus();

        $('.textInput').css({fontFamily: 'arial', color: 'black' })

        $('#canvas-container').on('mouseenter', '.textInput', function () {
            $('.cursors').hide()
        })
        $('#canvas-container').on('mouseleave', '.textInput', function () {
            $('.cursors').show()
        })

        $('#canvas-container').on('submit', '.textInputForm', function (e) {
            textReal.font = `15px arial`
            e.preventDefault();
            textReal.fillStyle = 'red';
            var message = $('.textInput').val();
            console.log(x)
            console.log(y)
            textReal.fillText(message, x, y);
            $('#canvas-container').off('submit', '.textInputForm')
            $('.textInputForm').remove()
            $('.cursors').show()
            typing = false;
            
            console.log('d')
        })
    }
}