var density = 50;

class Spray extends PaintFunction{
  constructor(contextReal){
      super();
      this.context = contextReal;
        }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onMouseDown(coord,event){
    this.context.lineJoin = this.context.lineCap = 'round';
    this.context.moveTo(coord[0],coord[1]);
  }
  onDragging(coord,event){
    for (var i = density; i--; ) {
      var radius = 20;
      var offsetX = getRandomInt(-radius, radius);
      var offsetY = getRandomInt(-radius, radius);
      this.context.fillRect(coord[0] + offsetX, coord[1] + offsetY, 1, 1);
    }
  }

  onMouseMove(){}
  onMouseUp(){}
  onMouseLeave(){}
  onMouseEnter(){}
  
}

    
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
