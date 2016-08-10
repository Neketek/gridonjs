const ADUtils = require("./utils/autodiscover.js").Utils;
const GRIDONJS_ELEMENT_CLASS = require("./utils/autodiscover.js").GRIDONJS_ELEMENT_CLASS;
const GRIDONJS_CONTAINER_CLASS = require("./utils/autodiscover.js").GRIDONJS_CONTAINER_CLASS;
const Grid = require("./grid/grid.js").Grid;
const GridElement = require("./grid/gridelement.js").GridElement;

class GridOnJs{
  static get gridsMap(){
    return Grid.gridsMap;
  }

  static get(id){
    return this.gridsMap.get(id);
  }

  static autodiscover(){
    ADUtils.autodiscover();
  }
}

module.exports = {GridOnJs};
