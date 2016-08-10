const GridElement = require("../grid/gridelement.js").GridElement;
const Grid = require("../grid/grid.js").Grid;

const GRIDONJS_PREFIX = "gojs";
const GRIDONJS_CONTAINER_CLASS = GRIDONJS_PREFIX+"-c";
const GRIDONJS_ELEMENT_CLASS = GRIDONJS_PREFIX+"-e";

class Utils{
  static filterGridsAlreadyExistsForDom(domElements){
    function predicate(value){
      for(const kv of Grid.gridsMap){
        if(kv[1]===value){
          return kv[0];
        }
      }
      return undefined;
    }
    return domElements.filter(predicate);
  }

  static isDomInGrid(grid,domElement){
    for(const kv of grid.elementsMap){
      if(kv[1].domElement === domElement){
        return true;
      }
    }
    return false;
  }

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
    let domElements = null;
    switch(className){
      case GRIDONJS_ELEMENT_CLASS:
        domElements = rootDomElement.children;
        return domElements;
      break;
      case GRIDONJS_CONTAINER_CLASS:
        domElements = rootDomElement.getElementsByClassName(className);
        domElements = Utils.filterGridsAlreadyExistsForDom(domElements);
        return domElements;
      break;
      default:
        throw "Unknown className";
    }
  }

}

module.exports = {Utils,GRIDONJS_ELEMENT_CLASS,GRIDONJS_CONTAINER_CLASS};
