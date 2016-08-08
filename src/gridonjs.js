const ADUtils = require("./utils/autodiscover.js").Utils;
const GRIDONJS_ELEMENT_CLASS = require("./utils/autodiscover.js").GRIDONJS_ELEMENT_CLASS;
const GRIDONJS_CONTAINER_CLASS = require("./utils/autodiscover.js").GRIDONJS_CONTAINER_CLASS;
const Grid = require("./grid/grid.js").Grid;

class GridOnJs{
  static get gridsMap(){
    return Grid.gridsMap;
  }

  static get(id){
    return this.gridsMap.get(id);
  }

  static autodiscover(){
    const grids = new ADUtils.getGridElementsFrom(document,GRIDONJS_CONTAINER_CLASS);
    ADUtils.addAllToGridsMap(grids);
    for(const grid of grids){
      const elements = ADUtils.getGridElementsFrom(grid.domElement,GRIDONJS_ELEMENT_CLASS);
      for(const element of elements){
        grid.add(element.id,element);
      }
    }
  }
}

module.exports = {GridOnJs};
