const GridOnJs = require("./gridonjs.js").GridOnJs;

GridOnJs.autodiscover();

GridOnJs.get("grid-0").transformManyByParamLists([
  ["test-0",0,0,1,1],
  ["test-1",9,0,1,1],
  ["test-2",0,9,1,1],
  ["grid-1",3,3,4,4]
]);
GridOnJs.get("grid-1").transformManyByParamLists([
  ["test-0",0,0,1,1],
  ["test-1",9,0,1,1],
  ["test-2",0,9,1,1],
  ["grid-2",3,3,4,4]
]);
GridOnJs.get("grid-2").transformManyByParamLists([
  ["test-0",0,0,1,1],
  ["test-1",9,0,1,1],
  ["test-2",0,9,1,1],
  ["grid-2",3,3,4,4]
]);

GridOnJs.autodiscover();
