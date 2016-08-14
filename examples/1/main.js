var GridOnJs = window.GridOnJs;
GridOnJs.autodiscover();
var layoutMain ={
  rows:18,
  cols:32,
  layout:[
    ["title",1,1,30,2],
    ["content",1,3,19,12],
    ["login",20,3,11,12],
    ["footer",1,15,30,2]
  ]
}


var m = 0.02;

var layoutContent = {
  cols:3,
  rows:2,
  gpLeft:0.06,
  gpRight:0.06,
  gpTop:0.06,
  gpBottom:0.06,
  layout:[
    ["box-0",0,0,1,1,m,m],
    ["box-1",1,0,1,1,m,m],
    ["box-2",2,0,1,1,m,m],
    ["box-3",0,1,1,1,m,m],
    ["box-4",1,1,1,1,m,m],
    ["box-5",2,1,1,1,m,m]
  ]
};

var layoutLogin = {
  rows:50,
  cols:50,
  layout:[
    ["login-button",2,2,46,46]
  ]
};

var layoutRoot = {
  cols:1,
  rows:1,
  layout:[
    ["main",0,0,1,1]
  ]
}

GridOnJs.get("root").transform(layoutRoot);
GridOnJs.get("main").transform(layoutMain);
GridOnJs.get("login").transform(layoutLogin);
GridOnJs.get("content").transform(layoutContent);

window.addEventListener("resize",function(){
  GridOnJs.recalulatePixels();
});
