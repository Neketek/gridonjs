const GridElement = require("../grid/gridelement.js").GridElement;
const Grid = require("../grid/grid.js").Grid;

const GRIDONJS_PREFIX = "gojs";
const GRIDONJS_CONTAINER = GRIDONJS_PREFIX+"-c";
const GRIDONJS_ELEMENT = GRIDONJS_PREFIX+"-e";

class Utils{

  static createGojsElementsFromDom(list,ClassObject){
    const res = List();
    for(const element of domElements){
      res.push(new ClassObject(element));
    }
    return res;
  }

  static getGridElementsFrom(rootDomElement,className){
    domElements = rootDomElement.getElementsByClassName(className);
    switch(className){
      case GRIDONJS_ELEMENT:
        Utils.createGojsElementsFromDom(domElements,GridElement);
      break;
      case GRIDONJS_CONTAINER:
        Utils.createGojsElementsFromDom(domElements,Grid);
      break;
      default:
        throw "Unknown className";
    }
  }

}

module.exports = {Utils};
