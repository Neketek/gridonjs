const GridOnJs = require("./gridonjs.js").GridOnJs;

GridOnJs.autodiscover();
GridOnJs.get("c").transformManyByParamLists([
  ["test-0",0,0,1,1],
  ["test-1",9,0,1,1],
  ["test-2",0,9,1,1],
  ["test-3",9,9,1,1]
]);
