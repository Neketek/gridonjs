var GridOnJs = window.GridOnJs;
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

var layout30x60 = {
  cols:70,
  rows:50,
  layout:[
    ["content-box",2,2,66,46]
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
  GridOnJs.get("content").transform(layout30x60);
}

transform();
