class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.setLineDash([]);
        this.contextDraft.setLineDash([]);
    }

    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
        var dataURL = canvasReal.toDataURL();
        restorePoints.push(dataURL);
    }

    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.draw(coord,this.contextDraft,event);
    }

    onMouseMove(){}
    onMouseUp(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.draw(coord,this.contextReal,event);
        var dataURL = canvasReal.toDataURL();
        restorePoints.push(dataURL);
    }
    onMouseLeave(){}
    onMouseEnter(){}
    draw(coord,context,event) {
        if(!event.shiftKey){
            context.fillRect(this.origX,this.origY,coord[0] - this.origX,coord[1] - this.origY)
            context.strokeRect(this.origX,this.origY,coord[0] - this.origX,coord[1] - this.origY)
        } else {
            context.fillRect(this.origX,this.origY,coord[0] - this.origX,coord[0] - this.origX)
            context.strokeRect(this.origX,this.origY,coord[0] - this.origX,coord[0] - this.origX)
        }
        
    }
}