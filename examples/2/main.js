var GridOnJs = window.GridOnJs;
var Layout = window.GridOnJs.Layout;
GridOnJs.autodiscover();

var layout32x18 ={
  rows:18,
  cols:32,
  layout:[
    ["title",1,1,30,2],
    ["content",1,3,19,12],
    ["login",20,3,11,12],
    ["footer",1,15,30,2]
  ]
}

var loginLayout50x50 = {
  rows:50,
  cols:50,
  layout:[
    ["login-button",2,2,46,46]
  ]
};

var layout = {
  cols:1,
  rows:1,
  layout:[
    ["main",0,0,1,1]
  ]
}


function transform(){
  GridOnJs.get("root").transform(layout);
  GridOnJs.get("main").transform(layout32x18);
  GridOnJs.get("login").transform(loginLayout50x50);
}

transform();

var layoutConfig = {
  grid:GridOnJs.get("content"),// grid object
  w:40, //width of element
  h:22, //heigth of element
  ml:1, //margin left
  mt:1,//margin top
  hor:true,//is horizontal owerflow
  rows:50,//grid rows
  cols:80,//grid cols
  pt:1,//padding top
  pl:0 //padding left

}

new Layout(layoutConfig).update();
