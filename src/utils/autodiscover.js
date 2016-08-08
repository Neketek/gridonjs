const GridElement = require("../grid/gridelement.js").GridElement;
const Grid = require("../grid/grid.js").Grid;

const GRIDONJS_PREFIX = "gojs";
const GRIDONJS_CONTAINER_CLASS = GRIDONJS_PREFIX+"-c";
const GRIDONJS_ELEMENT_CLASS = GRIDONJS_PREFIX+"-e";

class Utils{

  static createGojsElementsFromDom(list,ClassObject){
    const res = new Array();
    for(const element of list){
      res.push(new ClassObject(element));
    }
    return res;
  }

  static addAllToGridsMap(list){
    for(const grid of list){
      Grid.gridsMap.set(grid.id,grid);
    }
  }

  static addAllElementsToGridObject(grid,list){
    for(const element of list){
      grid.add(id,element);
    }
  }

  static getGridElementsFrom(rootDomElement,className){
    const domElements = rootDomElement.getElementsByClassName(className);
    switch(className){
      case GRIDONJS_ELEMENT_CLASS:
        return Utils.createGojsElementsFromDom(domElements,GridElement);
      break;
      case GRIDONJS_CONTAINER_CLASS:
        return Utils.createGojsElementsFromDom(domElements,Grid);
      break;
      default:
        throw "Unknown className";
    }
  }

}

module.exports = {Utils,GRIDONJS_ELEMENT_CLASS,GRIDONJS_CONTAINER_CLASS};
