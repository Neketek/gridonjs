const GridElement = require("../grid/gridelement.js").GridElement;
const Grid = require("../grid/grid.js").Grid;

const GRIDONJS_PREFIX = "gojs";
const GRIDONJS_CONTAINER_CLASS = GRIDONJS_PREFIX+"-c";
const GRIDONJS_ELEMENT_CLASS = GRIDONJS_PREFIX+"-e";

class Utils{

  static setGridOnJsElements(domList,ClassObject,map){
    for(const element of domList){
      map.set(element.id,new ClassObject(element));
    }
  }

  static findGridContainersDomAtRoot(domElement){
    return domElement.getElementsByClassName(GRIDONJS_CONTAINER_CLASS);
  }

  static findGridElementsDomAtRoot(domElement){
    const result = new Array();
    for(const element of domElement.children){
      result.push(element);
    }
    return result;
  }


  static filterNewGridContainersDom(domElements){

    function predicate(domElement){
      for(const kv of Grid.gridsMap){
        if(kv[1].domElement === domElement){
          return false;
        }
      }
      return true;
    }

    const filtered = new Array();
    for(const element of domElements){
      if(predicate(element)){
        filtered.push(element);
      }
    }
    console.log(filtered);
    return filtered;

  }

  static addGridElementsDomToGrid(grid,domElements){
    console.log("GRID:"+grid.id);
    for(const domElement of domElements){
      let idInGrid = grid.getIdOfDomElement(domElement);
      if(idInGrid===undefined){
        //just sets new Element
        grid.set(domElement.id,new GridElement(domElement));
      }else{
        if(idInGrid!=domElement.id){
          //removes from old key-value and set to new key value
          const gridElement=grid.delete(idInGrid);
          grid.set(domElement.id,gridElement);
        }
      }
    }
  }

  static autodiscover(){
    let gridDomElements = Utils.findGridContainersDomAtRoot(document);
    gridDomElements = Utils.filterNewGridContainersDom(gridDomElements);
    Utils.setGridOnJsElements(gridDomElements,Grid,Grid.gridsMap);
    let grid = null;
    let gridElementsDom = null;
    for(const kv of Grid.gridsMap){
      grid = kv[1];
      gridElementsDom = Utils.findGridElementsDomAtRoot(grid.domElement);
      Utils.addGridElementsDomToGrid(grid,gridElementsDom);
    }
  }
}

module.exports = {Utils,GRIDONJS_ELEMENT_CLASS,GRIDONJS_CONTAINER_CLASS};
