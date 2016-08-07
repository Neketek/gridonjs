const GridElement = require("./grid/gridelement.js").GridElement;
const Grid = require("./grid/grid.js").Grid;
const dom = document.getElementById("test-0");


const ge = new GridElement(dom);
const grid = new Grid("TEST");


grid.add("1",ge);
const tp = [
  ["1",0,0,2,4]
];
grid.transformManyByParamLists(tp);

console.log(grid.toString());
