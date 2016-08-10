const GridElement = require("./gridelement.js").GridElement;
const PercentStyleController = require("../utils/styleControllers.js").PercentStyleController;


const GRID_LAYOUT = Symbol("GRID_LAYOUT");
const ELEM_MAP = Symbol("ELEM_MAP");
const DOM_ELEMENT = Symbol("DOM_ELEMENT");
//const PSC = Symbol("PSC");
const STATIC_GRIDS_MAP = Symbol("STATIC_GRIDS_MAP");


class Grid{

  static get gridsMap(){
    if(Grid[STATIC_GRIDS_MAP]===undefined){
      Grid[STATIC_GRIDS_MAP] = new Map();
    }
    return Grid[STATIC_GRIDS_MAP];
  }

  constructor(domElement,cols=10,rows=10){
    this[GRID_LAYOUT]={rows:rows,cols:cols};
    this[ELEM_MAP]=new Map();
    this[DOM_ELEMENT]=domElement;
    //this[PSC]=new PercentStyleController(domElement,false,false);

    Grid.gridsMap.set(domElement.id,this);
  }

  // get psc(){
  //   return this[PSC];
  // }

  get domElement(){
    return this[DOM_ELEMENT];
  }

  get id(){
    return this[DOM_ELEMENT].id;
  }

  set cols(cols){
    this[GRID_LAYOUT].cols = cols;
  }

  get cols(){
    return this[GRID_LAYOUT].cols;
  }

  set rows(rows){
    this[GRID_LAYOUT].rows = rows;
  }

  get rows(){
    return this[GRID_LAYOUT].rows;
  }

  set(id,element){
    element.layout=this[GRID_LAYOUT];
    this[ELEM_MAP].set(id,element);
  }

  get(id){
    return this[ELEM_MAP].get(id);
  }
  has(id){
    return this.get(id)!==undefined;
  }
  delete(id){
    element = this.get(id);
    if(element!==undefined){
      element.layout=undefined;
      this[ELEM_MAP].delete(id);
    }
    return element;
  }

  toString(){
    let str =
    `id:${this.id}\nrows:${this.rows}\ncols:${this.cols}\nelements:\n{`;
    const elementsMap = this[ELEM_MAP];
    for(const element of elementsMap){
      str+=`\nid:${element[0]} => ${element[1].toString()}`;
    }
    str+="\n}";
    return str;
  }

  transformOneByParamList(params){

    const elem = this.get(params[0]);
    if(elem!==undefined){

      elem.transform(params[1],params[2],params[3],params[4]);
    }
  }

  transformManyByParamLists(list){
    for(const params of list){
      this.transformOneByParamList(params);
    }
  }

}

module.exports = {Grid};
