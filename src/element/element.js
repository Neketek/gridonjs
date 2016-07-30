const PercentStyleController = require("../utils/styleControllers").PercentStyleController
class Element{
  constructor(){
    let element = document.getElementById("test-0");
    let element1 = document.getElementById("test-1");
    element.style.position = "absolute";
    this.x = new PercentStyleController(element);
    this.y = new PercentStyleController(element1);
    this.x.setLocation(0,0);
    this.x.setSize(5,5);
    this.trigger = true;
    this.element = element;
    this.deg = Math.PI/180;
    this.rot = 0;
    window.setInterval(()=>{
      let x = this.x;
      x.pxLeft = x.parentPxWidth/2*Math.cos(this.rot)+x.parentPxWidth/2;
      x.pxTop = x.parentPxWidth/2*Math.sin(this.rot)+x.parentPxWidth/2;
      this.rot+=this.deg;
    },10);
  }
}

module.exports = Element;
