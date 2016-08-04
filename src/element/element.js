const PercentStyleController = require("../utils/styleControllers").PercentStyleController

const TRANSFORM = Symbol("TRANSFORM");
const TRANSFORMS_MAP = Symbol("TRANSFORMS_MAP");
const CONDITION = Symbol("CONDITION");
const NAME = Symbol("NAME");
const ELEMENTS_MAP = Symbol("ELEMENTS_MAP");

class Element extends PercentStyleController{
  constructor(selector){
    let element = null;
    if(selector.startsWith("#")){
      element = document.getElementById(selector.slice(1));
    }else if (selector.startsWith(".")) {
      element = document.getElementByClass(selector.slice(1));
    }else{
      element = document.getElementsByTagName(selector)[0];
    }
    if(element === undefined){
      throw `Can't find element by given selector:[${selector}]`;
    }
    super(element);
  }
}


class GroupTransform{

  constructor(options){
    this.transform = options.transform;
    this.condition = options.condition;
  }
  get transform(){
    return this[TRANSFORM];
  }
  set transform(transform){
    if(typeof transform == "function"){
      this[TRANSFORM] = transform;
      return this;
    }
    throw "Transform should be a function!";
  }
  get condition(){
    return this[TRANSFORM];
  }
  set condition(condition){
    if(typeof condition == "function"){
      this[CONDITION] = condition;
      return this;
    }
    throw "Condition should be a function!";
  }

  isGroupTransform(){
    return true;
  }

}


class ElementsGroup{

  constructor(){
    this[ELEMENTS_MAP]=new Map();
    this[TRANSFORMS_MAP]=new Map();
  }

  get transformsMap(){
    return this[TRANSFORMS_MAP];
  }

  get elementsMap(){
    return this[ELEMENTS_MAP];
  }
  addElementsMap(nameSelectorMap){
    nameSelectorMap.forEach((v,k)=>{
      this.elementsMap.set(k,new Element(v));
    });
  }
  applyTransforms(){
    var transformsMap = this.transformsMap;
    var elementsMap = this.elementsMap;
    transformsMap.forEach((transform)=>{
      if(transform.condition(this)){
        transform.transform(this);
      }
    });
  }
}

module.exports = {
  Element,
  GroupTransform,
  ElementsGroup
};
