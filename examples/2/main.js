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
  //GridOnJs.get("content").transform(contentLayout20x10);
}

transform();

var layoutConfig = {
  grid:GridOnJs.get("content"),
  w:24,
  h:22,
  ml:1,
  mt:0.5,
  hor:false,
  rows:50,
  cols:80,
  pt:2,
  pl:2

}

new Layout(layoutConfig).update();
