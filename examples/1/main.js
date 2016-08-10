var GridOnJs = window.GridOnJs;
GridOnJs.autodiscover();
var layout32x18 = [//16x9 * 2
  ["title",1,1,30,2],
  ["content",1,3,19,12],
  ["login",20,3,11,12],
  ["footer",1,15,30,2]
];

var loginLayout10x10 = [
  ["login-button",1,1,8,8]
];

GridOnJs.get("body").transformOneByParamList(["main",0,0,10,10]);
GridOnJs.get("main").rows = 18;
GridOnJs.get("main").cols = 32;
GridOnJs.get("main").transformManyByParamLists(layout32x18);
GridOnJs.get("login").transformManyByParamLists(loginLayout10x10);
