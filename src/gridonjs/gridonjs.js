const ElementsGroup = require("../element/element.js").ElementsGroup;
const GroupTransform = require("../element/element.js").GroupTransform;
const Element = require("../element/element.js").Element;


const GRID_ELEMENTS_GROUP = Symbol("GRID_ELEMENTS_GROUP");
const GRID_RESIZE_LISTENER = Symbol("GRID_RESIZE_LISTENER");
const GRID_LAYOUT = Symbol("GRID_LAYOUT");



class GridLayout{
  constructor(options){
    this.rows = options.rows;
    this.cols = options.cols;
    this.rowPercents = 100/this.rows;
    this.colPercents = 100/this.cols;
  }
}


class Grid{
  constructor(options){
    let gtDescription = {

      condition:(elementsGroup)=>{
        return true;
      },

      transform:(elementsGroup)=>{
        elementsGroup.elementsMap.forEach((v)=>{
          v.recalculatePixels();
        });
      }

    };

    const gridStandardTransform = new GroupTransform(gtDescription);
    const gridElementsGroup = new ElementsGroup();

    gridElementsGroup.transformsMap.set("GRID_STANDART_TRANSFORM",gridStandardTransform);

    this[GRID_ELEMENTS_GROUP]=gridElementsGroup;
    this[GRID_LAYOUT]=new GridLayout(options);
  }

  set resize(enable){

    if(enable){
      if(!this.resize){
        this[GRID_RESIZE_LISTENER]=()=>{
          this[GRID_ELEMENTS_GROUP].applyTransforms();
        };
        window.addEventListener("resize",this[GRID_RESIZE_LISTENER]);
      }
    }else{
      if(this.resize){
        window.removeEventListener("resize",this[GRID_RESIZE_LISTENER]);
        this[GRID_RESIZE_LISTENER]=undefined;
      }
    }
  }

  get resize(){
    return this[GRID_RESIZE_LISTENER]!==undefined;
  }

  addElement(desc){
    const element = new Element(desc.selector);
    let rowPercents = this[GRID_LAYOUT].rowPercents;
    let colPercents = this[GRID_LAYOUT].colPercents;
    element.left = colPercents*desc.offsetCol;
    element.top = rowPercents*desc.offsetRow;
    element.width = colPercents*desc.width;
    element.height = rowPercents*desc.height;
    this[GRID_ELEMENTS_GROUP].elementsMap.set(desc.selector,element);
  }

  removeElement(selector){
    return this[GRID_ELEMENTS_GROUP].elementsMap.delete(selector);
  }

}




module.exports = {
  Grid
};
