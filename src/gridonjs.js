const ADUtils = require("./utils/autodiscover.js").Utils;
const GRIDONJS_ELEMENT_CLASS = require("./utils/autodiscover.js").GRIDONJS_ELEMENT_CLASS;
const GRIDONJS_CONTAINER_CLASS = require("./utils/autodiscover.js").GRIDONJS_CONTAINER_CLASS;
const Grid = require("./grid/grid.js").Grid;
const Layout = require("./grid/layouts.js").Layout;

class GridOnJs{
  static get Layout(){
    return Layout;
  }
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

window.GridOnJs = GridOnJs;

module.exports = {GridOnJs};
