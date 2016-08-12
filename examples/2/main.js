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

var w = 24;
var h = 22;
var mt = 2;
var ml = 2;
var contentLayout20x10 = {
  cols:80,
  rows:50,
  layout:[
    ["box-0",ml,mt,w,h],
    ["box-1",ml*2+w,mt,w,h],
    ["box-2",ml*2+w,mt*2+h,w,h],
    ["box-3",ml,h+mt*2,w,h],
    ["box-4",ml*3+w*2,mt,w,h],
    ["box-5",ml*3+w*2,mt*2+h,w,h]
  ]
};

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
  GridOnJs.get("content").transform(contentLayout20x10);
}

transform();
