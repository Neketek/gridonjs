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

  constructor(domElement,cols=10,rows=10,pLeft = 0,pTop = 0,pRight = 0 ,pBottom = 0,gpLeft=0,gpTop=0,gpRight=0,gpBottom=0){
    this[GRID_LAYOUT]={
      rows:rows,
      cols:cols,
      pLeft:pLeft,
      pTop:pTop,
      pRight:pRight,
      pBottom:pBottom,
      gpLeft:gpLeft,
      gpRight:gpRight,
      gpBottom:gpBottom,
      gpTop:gpTop
    };
    this[ELEM_MAP]=new Map();
    this[DOM_ELEMENT]=domElement;
    this[Symbol.iterator]=this[ELEM_MAP][Symbol.iterator];
    Grid.gridsMap.set(domElement.id,this);
  }

  forEach(callback){
    this[ELEM_MAP].forEach(callback);
  }

  get ids(){
    return this[ELEM_MAP].keys();
  }

  get transormsList(){
    return this[TRANSFORMS_LIST];
  }

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

  get pTop(){
    return this[GRID_LAYOUT].pTop;
  }

  get pLeft(){
    return this[GRID_LAYOUT].pLeft;
  }

  get pRight(){
    return this[GRID_LAYOUT].pRight;
  }

  get pBottom(){
    return this[GRID_LAYOUT].pBottom;
  }

  set pTop(value){
    this[GRID_LAYOUT].pTop = value;
  }

  set pLeft(value){
    this[GRID_LAYOUT].pLeft = value;
  }

  set pRight(value){
    this[GRID_LAYOUT].pRight = value;
  }

  set pBottom(value){
    this[GRID_LAYOUT].pBottom = value;
  }
  set rows(rows){
    this[GRID_LAYOUT].rows = rows;
  }

  get rows(){
    return this[GRID_LAYOUT].rows;
  }

  get gpRight(){
    return this[GRID_LAYOUT].gpRight;
  }

  get gpLeft(){
    return this[GRID_LAYOUT].gpLeft;
  }

  get gpTop(){
    return this[GRID_LAYOUT].gpTop;
  }

  get gpBottom(){
    return this[GRID_LAYOUT].gpBottom;
  }

  set gpRight(value){
    this[GRID_LAYOUT].gpRight = value;
  }

  set gpLeft(value){
    this[GRID_LAYOUT].gpLeft = value;
  }

  set gpTop(value){
    this[GRID_LAYOUT].gpTop = value;
  }

  set gpBottom(value){
    this[GRID_LAYOUT].gpBottom = value;
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

  getIdOfDomElement(domElement){
    const elementsMap = this[ELEM_MAP];
    for(const kv of elementsMap){
      if(kv[1].domElement===domElement){
        return kv[0];
      }
    }
    return undefined;
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

    //paddings
    const pLeft = params[5]!==undefined?params[5]:this.pLeft;
    const pTop = params[6]!==undefined?params[6]:this.pTop;
    const pRight = (params[7]!==undefined)?params[7]:params[5]?params[5]:this.pRight;
    const pBottom = (params[8]!=undefined)?params[8]:params[6]?params[6]:this.pBottom;

    if(elem!==undefined){
      elem.transform(
        this.gpLeft+params[1]+pLeft,
        this.gpTop+params[2]+pTop,
        params[3]-(pRight+pLeft),
        params[4]-(pBottom+pTop)
      );
    }

  }

  transformManyByParamLists(list){
    for(const params of list){
      this.transformOneByParamList(params);
    }
  }
  //universal transform method
  transform(object){

    if(object.rows!==undefined)this.rows = object.rows;
    if(object.cols!==undefined)this.cols = object.cols;
    //elements standard paddings
    if(object.pTop!==undefined)this.pTop = object.pTop;
    if(object.pLeft!==undefined)this.pLeft = object.pLeft;
    if(object.pBottom!==undefined)this.pBottom = object.pBottom;
    if(object.pRight!==undefined)this.pRight = object.pRight;
    //grid standard paddings
    if(object.gpTop!==undefined)this.gpTop = object.gpTop;
    if(object.gpLeft!==undefined)this.gpLeft = object.gpLeft;
    if(object.gpBottom!==undefined)this.gpBottom = object.gpBottom;
    if(object.gpRight!==undefined)this.gpRight = object.gpRight;

    if(object.layout!==undefined){
      this.transformManyByParamLists(object.layout);
    }
  }

  recalulatePixels(){
    const elementsMap = this[ELEM_MAP];
    for(const kv of elementsMap){
      kv[1].recalulatePixelsAsGridElement();
    }
  }

}

module.exports = {Grid};
