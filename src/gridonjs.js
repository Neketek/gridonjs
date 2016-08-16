"use strict";
const ADUtils = require("./utils/autodiscover.js").Utils;
const Grid = require("./grid/grid.js").Grid;


class GridOnJs{

  static get(id){
    return Grid.gridsMap.get(id);
  }

  static autodiscover(){
    ADUtils.autodiscover();
  }

  static recalulatePixels(gridIds){
    if(gridIds !== undefined){
      let grid = null;
      for(const id of gridIds){
        grid = GridOnJs.get(id);
        if(grid===undefined){
          throw `$Grid with id:{id} does not exist`;
        }
        grid.recalulatePixels();
      }
      return;
    }
    const gridsMap = Grid.gridsMap;
    for(const kv of gridsMap){
      kv[1].recalulatePixels();
    }
  }

}

window.GridOnJs = GridOnJs;

module.exports = {GridOnJs};
