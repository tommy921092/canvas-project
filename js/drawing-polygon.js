class DrawingPolygon extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.x = [];
        this.y = [];
        this.contextReal.setLineDash([]);
        this.contextDraft.setLineDash([]);
    }

    onMouseDown(coord,event){

        this.contextDraft.lineJoin = "round";
        this.x.push(coord[0]);
        this.y.push(coord[1]);
        if(this.x.length == 1){
            this.contextReal.beginPath();
            this.contextReal.moveTo(coord[0],coord[1]);
        }

    }
    onDragging(){}

    onMouseMove(coord,event){
        if(this.x.length>0){
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.x[this.x.length-1], this.y[this.x.length-1]);
            this.contextDraft.lineTo(coord[0], coord[1]);
            this.contextDraft.closePath();
            this.contextDraft.stroke();
        }
    }

    onMouseUp(coord,event){
            this.contextReal.lineJoin = "round";
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height)
            
             if((coord[0]-this.x[0]) < 50 && (coord[1]-this.y[0]) < 50 && this.x.length>2) {
                this.contextReal.closePath();
                this.contextReal.fill();
                this.contextReal.stroke();
                this.x=[];
                this.y=[];
            } else {
            this.contextReal.lineTo(coord[0], coord[1]);
            this.contextReal.stroke();
            }
            console.log(this.x);
            console.log(this.y);
    }
    onMouseLeave(){}
    onMouseEnter(){}

}