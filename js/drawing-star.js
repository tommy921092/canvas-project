// not finish
class DrawingStar extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
    }
    
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.draw(this.origX,this.origY,coord,this.contextDraft);
    }

    onMouseMove(){}
    onMouseUp(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.draw(this.origX,this.origY,coord,this.contextReal);
    }
    onMouseLeave(){}
    onMouseEnter(){}
    draw(x,y,coord,context) {
    var rot = Math.PI / 2 * 3;
    var spikes=5;
    var step = Math.PI / spikes;
    var outerRadius = Math.abs(coord[0] - this.origX);
    var innerRadius = Math.abs(coord[0] - this.origX) * 0.5;
    context.beginPath();
    context.moveTo(this.origX, this.origY - outerRadius)
    for (let i = 0; i < spikes; i++) {
        x = this.origX + Math.cos(rot) * outerRadius;
        y = this.origY + Math.sin(rot) * outerRadius;
        context.lineTo(x, y)
        rot += step

        x = this.origX + Math.cos(rot) * innerRadius;
        y = this.origY + Math.sin(rot) * innerRadius;
        context.lineTo(x, y)
        rot += step
    }
    context.lineTo(this.origX, this.origY - outerRadius)
    context.closePath();
    context.lineWidth=5;
    context.stroke();
    context.fill();
    }
}