class DrawingOval extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextDraft.strokeStyle
        this.contextReal.setLineDash([]);
        this.contextDraft.setLineDash([]);
    }
    //need modification
    onMouseDown(coord,event){
        this.origX = coord[0]; //start point at (origX, origY)
        this.origY = coord[1];
        this.contextReal.beginPath();
    }
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        if(!event.shiftKey){
            this.centerX = (coord[0] + this.origX) * 0.5;
            this.centerY = (coord[1] + this.origY) * 0.5;
            this.radiusX = Math.abs(coord[0] - this.origX) * 0.5;
            this.radiusY = Math.abs(coord[1] - this.origY) * 0.5;
            this.contextDraft.ellipse(this.centerX,this.centerY,this.radiusX,this.radiusY,0,0,2*Math.PI);
            this.contextDraft.fill();
            this.contextDraft.stroke();
        } else {
            this.radiusX = Math.abs(coord[0] - this.origX);
            this.contextDraft.ellipse(this.origX,this.origY,this.radiusX,this.radiusX,0,0,2*Math.PI);
            this.contextDraft.fill();
            this.contextDraft.stroke();
        }
        }



    onMouseMove(){}
    onMouseUp(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        if(!event.shiftKey){
            this.contextReal.ellipse(this.centerX,this.centerY,Math.abs(this.radiusX),Math.abs(this.radiusY),0,0,2*Math.PI);
            this.contextReal.fill();
            this.contextReal.stroke();
        } else {
            this.contextReal.ellipse(this.origX,this.origY,Math.abs(this.radiusX),Math.abs(this.radiusX),0,0,2*Math.PI);
            this.contextReal.fill();
            this.contextReal.stroke();
        }
        var dataURL = canvasReal.toDataURL();
        restorePoints.push(dataURL);
    }
    onMouseLeave(){}
    onMouseEnter(){}
}