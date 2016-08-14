const PercentStyleController = require("../utils/styleControllers.js").PercentStyleController;
const Rectangle = require("../utils/styleControllers").Rectangle;

const RECT = Symbol("RECT");
const GRID_LAYOUT = Symbol("GRID_LAYOUT");
const PSC = Symbol("PSC");
const DOM_ELEMENT = Symbol("DOM_ELEMENT");


class GridElement{
  static checkGridLayoutObject(gridLayoutObject){
    if(gridLayoutObject===undefined){
      return;
    }
    const props = ["rows","cols","gpLeft","gpTop","gpRight","gpBottom"];
    for(const prop of props){
      if(gridLayoutObject[prop]===undefined){
        throw `Grid layout should contain property:${prop}`;
      }
    }
  }

  constructor(domElement){
    this[PSC] = new PercentStyleController(domElement);
    this[RECT] = new Rectangle();
    this[DOM_ELEMENT] = domElement;
  }

  get domElement(){
    return this[DOM_ELEMENT];
  }
  get id(){
    return this[DOM_ELEMENT].id;
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
    //this will calculate active grid height
    console.log((this.layout.gpTop+this.layout.gpBottom));
    return 100/(this.layout.rows+(this.layout.gpTop+this.layout.gpBottom));
  }

  get colPercents(){
    //this will calculate active grid width
    return 100/(this.layout.cols+(this.layout.gpLeft+this.layout.gpRight));
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

  get left(){
    return this[RECT].left;
  }

  get top(){
    return this[RECT].top;
  }

  get width(){
    return this[RECT].width;
  }

  get height(){
    return this[RECT].height;
  }

  transform(left,top,width,height){
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  transformByList(list){
    this.transform(list[0],list[1],list[2],list[3]);
  }

  transformByObject(object){
    this.transform(object.left,object.top,object.width,object.height);
  }

  recalulatePixelsAsGridElement(){
    this.left = this.left;
    this.top = this.top;
    this.width = this.width;
    this.height = this.height;
  }

  toString(){
    return this[RECT].toString();
  }
}

module.exports = {GridElement};
