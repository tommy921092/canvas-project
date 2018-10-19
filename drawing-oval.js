class DrawingOval extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    //need modification
    onMouseDown(coord,event){
        this.contextReal.fillStyle = "#f44";
        this.contextReal.strokeStyle = "#000";
        this.contextReal.lineWidth = 5;
        this.origX = coord[0]; //start point at (origX, origY)
        this.origY = coord[1];
        this.contextReal.setLineDash([]);
        this.contextReal.beginPath();
    }
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.centerX = (coord[0] + this.origX) * 0.5;
        this.centerY = (coord[1] + this.origY) * 0.5;
        this.radiusX = (coord[0] - this.origX) * 0.5;
        this.radiusY = (coord[1] - this.origY) * 0.5;
        this.contextDraft.beginPath();
        this.contextDraft.fillStyle = "#f44";
        this.contextDraft.strokeStyle = "#000";
        this.contextDraft.ellipse(this.centerX,this.centerY,Math.abs(this.radiusX),Math.abs(this.radiusY),0,0,2*Math.PI);
        this.contextDraft.fill();
        this.contextDraft.stroke();
        }



    onMouseMove(){}
    onMouseUp(coord){
        this.contextReal.ellipse(this.centerX,this.centerY,Math.abs(this.radiusX),Math.abs(this.radiusY),0,0,2*Math.PI);
        this.contextReal.fill();
        this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}
}