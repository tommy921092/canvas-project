class DrawingStraight extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord,event){
        this.contextReal.lineJoin = "round";
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.lineJoin = "round";
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.draw(coord, this.contextDraft);
    }

    onMouseMove(){}

    onMouseUp(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.draw(coord, this.contextReal);
        var dataURL = canvasReal.toDataURL();
        restorePoints.push(dataURL);
    }
    onMouseLeave(){}
    onMouseEnter(){}

    draw(coord, context) {
        context.beginPath();
        context.moveTo(this.origX, this.origY);
        context.lineTo(coord[0], coord[1]);
        context.stroke();
    }
}