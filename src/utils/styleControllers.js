
const LEFT = Symbol("LEFT");
const TOP =  Symbol("TOP");
const WIDTH = Symbol("WIDTH");
const HEIGHT =  Symbol("HEIGT");
const RECTANGLE = Symbol("RECTANGLE");
const PPSC = Symbol("PPSC"); // parent pixel style controller
const PSC = Symbol("PSC"); // pixel style conroller
const RESIZE_LISTENER = Symbol("RESIZE_LISTENER");// window on resize callback

class Rectangle{
  static checkIsNan(name,value){
    if(Number.isNaN(value)){
      throw `${name} should be a number. Current is NaN`;
    }
  }
  static checkSizeValue(name,value){
    if(value<0){
      throw `${name} should be positive or zero. Current is ${value}`;
    }
  }
  constructor(left = 0,top = 0,width = 0,height = 0){
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }
  get left(){
    return this[LEFT];
  }
  get top(){
    return this[TOP];
  }
  get height(){
    return this[HEIGHT];
  }
  get width(){
    return this[WIDTH];
  }
  set width(value){
    Rectangle.checkIsNan('width',value);
    Rectangle.checkSizeValue('width',value);
    this[WIDTH]=value;
  }
  set height(value){
    Rectangle.checkIsNan('height',value);
    Rectangle.checkSizeValue('height',value);
    this[HEIGHT]=value;
  }
  set left(value){
    Rectangle.checkIsNan('left',value);
    this[LEFT]=value;
  }
  set top(value){
    Rectangle.checkIsNan('top',value);
    this[TOP]=value;
  }

  getWidthInHeight(){
    return this.height/this.width;
  }

  getHeightInWidth(){
    return this.width/this.height;
  }

  setLocation(left,top){
    this.top = top;
    this.left = left;
  }

  setSize(width,height){
    this.width = width;
    this.height = height;
  }

  move(x,y){
    Rectangle.checkIsNan("x",x);
    Rectangle.checkIsNan("y",y);
    this.top+=y;
    this.left+=x;
  }

  toString(){
    return `LT:(${this.left},${this.top}) WH:(${this.width},${this.height})`;
  }

  update(rect){
    this.width = rect.width;
    this.height = rect.height;
    this.left = rect.left;
    this.top = rect.top;
  }
}


class PixelStyleController{

  static convertToPixels(value){
      return `${value}px`;
  }

  static convertFromPixels(value){
    if(value.length==0){
      return 0;
    }else if(value.endsWith("px")){
      return Number.parseFloat(value.substring(0,value.length-2));
    }else{
      return Number.parseFloat(value);
    }
  }
  constructor(domElement){
    this.domElement = domElement;
    this[RECTANGLE] = new Rectangle(this.left,this.top,this.width,this.height);
  }
  set width(value){
    this[RECTANGLE].width = value;
    this.domElement.style.width = PixelStyleController.convertToPixels(value);
  }
  set height(value){
    this[RECTANGLE].height = value;
    this.domElement.style.height = PixelStyleController.convertToPixels(value);
  }
  set top(value){
    this[RECTANGLE].top = value;
    this.domElement.style.top = PixelStyleController.convertToPixels(value);
  }
  set left(value){
    this[RECTANGLE].left = value;
    this.domElement.style.left = PixelStyleController.convertToPixels(value);
  }

  setLocation(left,top){
    this[RECTANGLE].setLocation(left,top);
    this.left = left;
    this.top = top;
  }

  setSize(width,height){
    this[RECTANGLE].setSize(width,height);
    this.width = width;
    this.height = height;
  }

  move(x,y){
    this[RECTANGLE].move(x,y);
    this.left+=x;
    this.top+=y;
  }

  get width(){
    return this.domElement.clientWidth;
  }
  get height(){
    return this.domElement.clientHeight;
  }
  get top(){
    let value = this.domElement.style.top;
    return PixelStyleController.convertFromPixels(value);
  }
  get left(){
    let value = this.domElement.style.left;
    return PixelStyleController.convertFromPixels(value);
  }

  get parent(){
    return this.domElement.parentElement;
  }
  toString(){
    return `W:${this.width} H:${this.height} T:${this.top} L:${this.left}`;
  }

  getHeightInWidth(){
    this[RECTANGLE].update(this);
    return this[RECTANGLE].getHeightInWidth();
  }

  getWidthInHeight(){
    this[RECTANGLE].update(this);
    return this[RECTANGLE].getWidthInHeight();
  }

}





class PercentStyleController{

  constructor(domElement){
    let psc = new PixelStyleController(domElement);
    let ppsc = new PixelStyleController(domElement.parentElement);
    let rectangle = new Rectangle();
    this[RECTANGLE] = rectangle;
    this[PSC] = psc;
    this[PPSC] = ppsc;

    rectangle.width = this.pxWidth/this.widthPercentPixels;
    rectangle.height = this.pxHeight/this.heightPercentPixels;
    rectangle.left = this.pxLeft/this.widthPercentPixels;
    rectangle.top = this.pxTop/this.heightPercentPixels;

    this.enableAutoResizeCalulation();
  }

  set width(value){
    this[RECTANGLE].width = value;
    this[PSC].width = value*this.widthPercentPixels;
  }

  set height(value){
    this[RECTANGLE].height = value;
    this[PSC].height = value*this.heightPercentPixels;
  }

  set top(value){
    this[RECTANGLE].top = value;
    this[PSC].top = value*this.heightPercentPixels;
  }

  set left(value){
    this[RECTANGLE].left = value;
    this[PSC].left = value*this.widthPercentPixels;
  }

  setLocation(left,top){
    this.left = left;
    this.top = top;
  }

  setSize(width,height){
    this.width = width;
    this.height = height;
  }

  get width(){
    return this[RECTANGLE].width;
  }

  get height(){
    return this[RECTANGLE].height;
  }

  get top(){
    return this[RECTANGLE].top;
  }

  get left(){
    return this[RECTANGLE].left;
  }

  get heightPercentPixels(){
    return this[PPSC].height/100;
  }

  get widthPercentPixels(){
    return this[PPSC].width/100;
  }

  setLocation(left,top){
    this[RECTANGLE].setLocation(left,top);
    this[PSC].setLocation(left*this.widthPercentPixels,top*this.heightPercentPixels);
  }

  setSize(width,height){
    this[RECTANGLE].setSize(width,height);
    this[PSC].setSize(width*this.widthPercentPixels,height*this.heightPercentPixels);
  }

  move(x,y){
    this[RECTANGLE].move(x,y);
    x = this[RECTANGLE].left;
    y = this[RECTANGLE].top;
    this[PSC].setLocation(x*this.widthPercentPixels,y*this.heightPercentPixels);
  }

  setPxLocation(left,top){
    this[PSC].setLocation(left,top);
    this[RECTANGLE].setLocation(left/this.widthPercentPixels,top/this.heightPercentPixels);
  }

  setPxSize(width,height){
    this[PSC].setSize(width,height);
    this[RECTANGLE].setSize(width/this.widthPercentPixels,height/this.heightPercentPixels);
  }

  pxMove(x,y){
    this[PSC].move(x,y);
    this[RECTANGLE].move(x/this.widthPercentPixels,y/this.heightPercentPixels);
  }

  get pxWidth(){
    return this[PSC].width;
  }

  get pxHeight(){
    return this[PSC].height;
  }

  get pxTop(){
    return this[PSC].top;
  }

  get pxLeft(){
    return this[PSC].left;
  }

  get parentPxLeft(){
    return this[PPSC].left;
  }

  get parentPxTop(){
    return this[PPSC].top;
  }

  get parentPxWidth(){
    return this[PPSC].width;
  }

  get parentPxHeight(){
    return this[PPSC].height;
  }

  set pxWidth(width){
    this[PSC].width = width;
    this[RECTANGLE].width = width/this.widthPercentPixels;
  }

  set pxHeight(height){
    this[PSC].height = height;
    this[RECTANGLE].height = height/this.heightPercentPixels
  }

  set pxTop(top){
    this[PSC].top = top;
    this[RECTANGLE].top = top/this.heightPercentPixels;
  }

  set pxLeft(left){
    this[PSC].left = left;
    this[RECTANGLE].left = left/this.widthPercentPixels;
  }

  recalculatePixels(){
    this.setLocation(this.left,this.top);
    this.setSize(this.width,this.height);
  }

  enableAutoResizeCalulation(){
    if(this[RESIZE_LISTENER]!==undefined){
      return;
    }
    this[RESIZE_LISTENER]=()=>{
     this.recalculatePixels();
    };
    window.addEventListener('resize',this[RESIZE_LISTENER]);
  }

  disableAutoResizeCalculation(){
    window.removeEventListener(this[RESIZE_LISTENER]);
    this[RESIZE_LISTENER]=undefined;
  }

  toString(){
    return this[RECTANGLE].toString();
  }
}

module.exports = {
  Rectangle,
  PixelStyleController,
  PercentStyleController
};
