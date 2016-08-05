const PercentStyleController = require("../utils/styleControllers.js").PercentStyleController;
const Rectangle = require("../utils/styleControllers").Rectangle;

const RECT = Symbol("RECT");
const GRID_LAYOUT = Symbol("GRID_LAYOUT");
const PSC = Symbol("PSC");


class GridElement{
  static checkGridLayoutObject(gridLayoutObject){
    const props = ["rows","cols"];
    for(const prop of props){
      if(gridLayoutObject[prop]===undefined){
        throw `Grid layout should contain property:${prop}`;
      }
    }
  }

  constructor(domElement){
    this[PSC] = new PercentStyleController(domElement);
    this[RECT] = new Rectangle();
  }

  set layout(gridLayout){
    GridElement.checkGridLayoutObject(gridLayout);
    this[GRID_LAYOUT] = gridLayout;
  }

  get layout(){
    return this[GRID_LAYOUT];
  }

  get psc(){
    return this[PSC];
  }

  get rowPercents(){
    return 100/this.layout.rows;
  }

  get colPercents(){
    return 100/this.layout.cols;
  }

  set width(width){
    this[RECT].width = width;
    this.psc.width = this.colPercents*width;
  }

  set height(height){
    this[RECT].height = height;
    this.psc.height = this.rowPercents*height;
  }

  set top(top){
    this[RECT].top = top;
    this.psc.top = this.rowPercents*top;
  }

  set left(left){
    this[RECT].left = left;
    this.psc.left = this.colPercents*left;
  }

}

module.exports = {GridElement};
