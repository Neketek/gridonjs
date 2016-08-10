const ADUtils = require("./utils/autodiscover.js").Utils;
const GRIDONJS_ELEMENT_CLASS = require("./utils/autodiscover.js").GRIDONJS_ELEMENT_CLASS;
const GRIDONJS_CONTAINER_CLASS = require("./utils/autodiscover.js").GRIDONJS_CONTAINER_CLASS;
const Grid = require("./grid/grid.js").Grid;
const GridElement = require("./grid/element.js").GridElement;

class GridOnJs{
  static get gridsMap(){
    return Grid.gridsMap;
  }

  static get(id){
    return this.gridsMap.get(id);
  }

  static autodiscover(){
    let gridDomElements = ADUtils.getGridElementsFrom(document,GRIDONJS_CONTAINER_CLASS);
    let newGrids = ADUtils.createGojsElementsFromDom(gridDomElements,Grid);
    ADUtils.addAllToGridsMap(newGrids);
    for(const grid of Grid.gridMap){
      const gridDomElements = ADUtils.getGridElementsFrom(grid.domElement,GRIDONJS_ELEMENT_CLASS);
      for(let elementDom of gridDomElements){

        let idInGrid = ADUtils.isDomInGrid(grid,dom);
        if(idInGrid!==undefined){
          if(idInGrid!=elementDom.id){
            let gelement = grid.delete(idInGrid);
            grid.set(elementDom.id,gelement);
          }
        }else{
          grid.set(elementDom.id,new GridElement(elementDom));
        }
        
      }
    }
  }
}

module.exports = {GridOnJs};
