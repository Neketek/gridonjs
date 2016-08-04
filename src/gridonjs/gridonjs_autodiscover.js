const Grid = require("./gridonjs").Grid;


const CONTAINER_CLASS = "gridonjs-container";
const ELEMENT_CLASS = "gridonjs-element";
const SIZE_CLASS = "gridonjs-size-";
const OFFSET_CLASS = "gridonjs-offset-";
const OFFSET_DISABLE_CLASS = "gridonjs-no-offset";
const RESIZE_DISABLE_CLASS = "gridonjs-no-resize";
const SPLIT = "x";







class GridOnJsContainerDom{

  static findContainers(){
    const containers = document.getElementsByClassName(CONTAINER_CLASS);
    const containersDom = [];
    for(const container of containers){
      containersDom.push(new GridOnJsContainerDom(container));
    }
    return containersDom;
  }

  constructor(domElement){
    this.domElement = domElement;
  }

  get size(){
    for(let item of this.domElement.classList){
      if(item.startsWith(SIZE_CLASS)){
        let size = item.substring(SIZE_CLASS.length).split(SPLIT);
        return [Number.parseInt(size[0]),Number.parseInt(size[1])];
      }
    }
  }

  get elements(){
    let list = [];
    for(let item of this.domElement.children){
      if(item.classList.contains(ELEMENT_CLASS)){
        list.push(new GridOnJsElementDom(item));
      }
    }
    return list;
  }

  get resize(){
    return !this.domElement.classList.contains(RESIZE_DISABLE_CLASS);
  }

  get description(){
    let rows,cols;
    [cols,rows] = this.size;
    return {
      cols:cols,
      rows:rows
    };
  }
}





class GridOnJsElementDom{

  constructor(domElement){
    this.domElement = domElement;
  }

  get offsetDisable(){
    return this.domElement.classList.contains(OFFSET_DISABLE_CLASS);
  }

  get offset(){
    for(let item of this.domElement.classList){
      if(item.startsWith(OFFSET_CLASS)){
        let size = item.substring(OFFSET_CLASS.length).split(SPLIT);
        return [Number.parseInt(size[0]),Number.parseInt(size[1])];
      }
    }
  }

  get size(){
    for(let item of this.domElement.classList){
      if(item.startsWith(SIZE_CLASS)){
        let size = item.substring(SIZE_CLASS.length).split(SPLIT);
        return [Number.parseInt(size[0]),Number.parseInt(size[1])];
      }
    }
  }
  get description(){
    let offsetRow,offsetCol,width,height;
    [offsetCol,offsetRow] = this.offset;
    [width,height] = this.size;
    let selector = "#"+this.domElement.id;
    return {
      selector:selector,
      offsetCol:offsetCol,
      offsetRow:offsetRow,
      width:width,
      height:height
    };
  }
}





class GridOnJs{
  constructor(){
    GridOnJs.grids = [];
    const containers = GridOnJsContainerDom.findContainers();
    for(const container of containers){
      console.log(container.description);
      const grid = new Grid(container.description);
      const elements = container.elements;
      for(const element of elements){
        grid.addElement(element.description);
      }
      GridOnJs.grids.push(grid);
    }
    console.log(GridOnJs.grids);
  }
}

module.exports = {
  GridOnJsContainerDom,
  GridOnJsElementDom,
  GridOnJs
};
