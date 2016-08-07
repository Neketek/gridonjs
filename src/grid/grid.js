const GridElement = require("./gridelement.js").GridElement;

const GRID_LAYOUT = Symbol("GRID_LAYOUT");
const ELEM_MAP = Symbol("ELEM_MAP");
const ID = Symbol("ID");


class Grid{

  constructor(id,cols=10,rows=10){
    this[GRID_LAYOUT]={rows:rows,cols:cols};
    this[ELEM_MAP]=new Map();
    this[ID]=id;
  }

  get id(){
    return this[ID];
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

  add(id,element){
    element.layout=this[GRID_LAYOUT];
    this[ELEM_MAP].set(id,element);
  }

  get(id){
    return this[ELEM_MAP].get(id);
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
}

module.exports = {Grid};
