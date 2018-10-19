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
        this.contextReal.beginPath();
        this.contextReal.moveTo(coord[0],coord[1]);
        this.draw(coord[0],coord[1]);
    }
    onDragging(coord,event){
        this.contextDraft.fillStyle = "#f44";
        this.contextDraft.strokeStyle = "#000";
        
        
    }

    onMouseMove(){}
    onMouseUp(coord){
/*         ctx.moveTo(startX, startY + (y - startY) / 2);
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    ctx.closePath();
    ctx.stroke(); */
       /* this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
        */
       this.contextDraft.moveto()
    }
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y) {
        
    }
}