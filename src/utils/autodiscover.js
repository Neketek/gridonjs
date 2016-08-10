const GridElement = require("../grid/gridelement.js").GridElement;
const Grid = require("../grid/grid.js").Grid;

const GRIDONJS_PREFIX = "gojs";
const GRIDONJS_CONTAINER_CLASS = GRIDONJS_PREFIX+"-c";
const GRIDONJS_ELEMENT_CLASS = GRIDONJS_PREFIX+"-e";

class Utils{
  static filterGridsAlreadyExistsForDom(domElements){
    const filtered = new Array();
    for(const element of domElements){
      let hasGridForDom = false;
      for(let grid of Grid.gridsMap){
        if(grid[1].domElement===element){
          console.log("M:"+element.id);
          hasGridForDom = true;
          break;
        }
      }
      if(!hasGridForDom){
        filtered.push(element);
      }
    }
    return filtered;
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
        return Utils.createGojsElementsFromDom(domElements,GridElement);//TODO: fix filter before creation of gojs elements
      break;
      case GRIDONJS_CONTAINER_CLASS:
        domElements = rootDomElement.getElementsByClassName(className);
        domElements = Utils.filterGridsAlreadyExistsForDom(domElements);
        return Utils.createGojsElementsFromDom(domElements,Grid);
      break;
      default:
        throw "Unknown className";
    }
  }

}

module.exports = {Utils,GRIDONJS_ELEMENT_CLASS,GRIDONJS_CONTAINER_CLASS};
